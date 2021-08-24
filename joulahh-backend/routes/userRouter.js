import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js';
import User from '../models/userModel.js';
const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    console.log('userRouter',data.users)
    const createdUsers = await User.insertMany(data.users);        // kole araye ya objecthaye toosh???
    res.send({createdUsers : createdUsers})
}))

export default userRouter;