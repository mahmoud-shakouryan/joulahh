import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Payment from '../models/paymentModel.js'
import { isAuth } from "../util.js";
import axios from 'axios';

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart Is Empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, //in ghesmat ba komake isAuth va file'e util.
      });
      const createdOrder = await order.save(); // on object'e orderi ke to db dorost mikone ro bad az anjamesh mizarim tooye createdOrder, bekhatere hamin toosh masalan _id hast.
      res
        .status(201)
        .send({ message: "new order created", order: createdOrder });
    }
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);


// to in route dar vaghe ma tooye server hastim va mikhaim az server request post dashte bashim be zarinPal.
// va hamrahe in request bayad ye payloadi bashe ke zarinPal mikhad.
orderRouter.post('/pay', expressAsyncHandler(async (req, res) => {           //isAuth hatman anjam shavad
  console.log('umad tuye orderRouter /pay >>> req.body>>>>',req.body)
  try {                                                                            
    const params = {
      MerchantID:'6cded376-3063-11e9-a98e-005056a205be',
      Amount:req.body.totalPrice,
      CallbackURL:'http://localhost:5000/api/orders/paycallback',   //bad az deploy bayad domain inja bashe
      Description: `${req.body.orderItems.name} خرید`
    }
    const response = await axios.post('https://www.zarinpal.com/pg/rest/webgate/paymentrequest.json', params);
    console.log(response);
    if(response.data.status === 100){
       const newPayment = new Payment({
         user: req.user.id,       //bayad login karde bashe
         amount: req.body.amount,
         resNumber: response.data.Authority,                    //Authority >>> hamoon linkie ke zarinPal be ma mike
       });

    }
    else{
      res.redirect('/order');                     //???? be koja redirect
    }
  } catch (error) {
    console.log('orderRouter /pay route error >>>',error);
  }
}))

orderRouter.get('/paycallback', expressAsyncHandler(async (req, res)=>{          //baraye oonja ke kar tuye zarin pal tamoom shode va zarinpal miad tuye server tu in routi ke ma behesh elam mikonim.
  try{
    res.send({'message':'router working...'});

    console.log('/api/orders/paycallback')
  }
  catch(error){
    console.log('/api/orders/paycallback route error',error);
  }
}))


orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });               //in kojas in { message: 'order Not Found' } tu front mikhaim namayesh bedim
    }
  })
);






export default orderRouter;
