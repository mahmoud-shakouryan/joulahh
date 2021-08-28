import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import data from '../data.js';
import User from '../models/userModel.js';
const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    const createdUsers = await User.insertMany(data.users);        // kole araye ya objecthaye toosh???
    res.send({createdUsers : createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({email : req.body.email})
    if(user){
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'})    // oon || 'somethingsuper..' baraye ine ke chon onn variable too github nist age ye nafar dige clone kard error nade.
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
    res.status(401).json({message : 'invalid password or email'});
}));

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({name:req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8)});
    // alan in bala user shode ye mongoose object ke az kelase User , instance gereftim.
    const createdUser = await user.save();   // in promise return mikone yani result pas mide yadet bashe pas mishe masalan be _id access dasht ba inke hamin alan too db dorost karde.
    const token = jwt.sign({_id:createdUser._id,name:createdUser.name,email:createdUser.email,isAdmin:createdUser.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'}) 
    res.send({
        _id:createdUser.id,
        name:createdUser.name,
        email:createdUser.email,
        isAdmin:createdUser.isAdmin,
        token:token
    })

}))

export default userRouter;