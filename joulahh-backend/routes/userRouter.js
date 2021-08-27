import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import data from '../data.js';
import User from '../models/userModel.js';
const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    console.log('userRouter',data.users)
    const createdUsers = await User.insertMany(data.users);        // kole araye ya objecthaye toosh???
    res.send({createdUsers : createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
    console.log('oomad too /signin')
    console.log(req.body.email)
    const user = await User.findOne({email : req.body.email})
    console.log('user.isAdmin >>>',user.isAdmin)
    console.log('user >>>',user)
    if(user){
        console.log('back user',user.isAdmin)
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email,isAdimn:user.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'})    // oon || 'somethingsuper..' baraye ine ke chon onn variable too github nist age ye nafar dige clone kard error nade.
        if(bcrypt.compareSync(req.body.password,user.password)){
          return  res.send({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:token
            })
        }
    }
    res.status(401).send({message : 'Invalid email or password'});
}))

export default userRouter;