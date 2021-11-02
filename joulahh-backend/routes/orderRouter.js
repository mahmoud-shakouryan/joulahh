import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../util.js";

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



orderRouter.post('/pay', expressAsyncHandler(async (req, res, next) => {           //isAuth hatman anjam shavad
  try {
    res.send({'message':'router working'})
    console.log('/api/orders/pay');
  } catch (error) {
    console.log('/api/orders/pay error',error);
  }
}))

orderRouter.get('/paycallback', expressAsyncHandler(async (req, res)=>{          //baraye oonja ke kar tuye zarin pal tamoom shode va zarinpal miad tuye server tu in routi ke ma behesh elam mikonim.
  try{
    res.send({'message':'router working...'});

    console.log('/api/orders/paycallback')
  }
  catch(error){
    console.log('/api/orders/paycallback error',error);
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
