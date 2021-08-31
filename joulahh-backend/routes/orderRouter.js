import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../util.js';

const orderRouter = express.Router();



orderRouter.post('/',isAuth ,expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems.length === 0 ){
        res.status(400).send({message : 'Cart Is Empty'})
    }
    else{
        const order = new Order({
            orderItems : req.body.orderItems,
            shippingAddress : req.body.shippingAddress,
            paymentMethod : req.body.paymentMethod,
            itemsPrice : req.body.itemsPrice,
            shippingPrice : req.body.shippingPrice,
            taxPrice : req.body.taxPrice,
            totalPrice : req.body.totalPrice,
            user : req.user._id,             //in ghesmat ba komake isAuth va file'e util.
        });
        const createdOrder = await order.save();
        res.status(201).send({message : 'new order created', order : createdOrder})
    }
}))


export default orderRouter;