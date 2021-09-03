// should fetch order data from backend & show it in the front
// ?? chera hala hatman bayad az backend begireim?
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailesOrder } from "../store/actions/orderActions";
import {PayPalButton} from 'react-paypal-button-v2'; //paypal

const OrderScreen = (props) => {
  console.log('OrderScreen.js')
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false); //paypal
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const successPaymentHandler = () => {
    // dispatch pay order
  }



  const dispatch = useDispatch();
  useEffect(() => {
    console.log('OrderScreen useEffect')
    const addPayPalScript = async () => {//paypal
      console.log('oomad tu addPayPalScript')
      const { data } = await axios.get("/api/config/paypal"); // clientId tooye data'eeye ke barmiarder
      console.log('data',data)
      const script = document.createElement("script"); // dorost kardane ye script va gharar dadane src'e oon script be paypal sdk
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        //onload happens vaghti ke oon adddress'e https... to src ( ke ye script hast ) tu browser download shod.
        setSdkReady(true);
      };
      document.body.appendChild(script); // ba in khat in scritp mishe akharin child'e bodye htmlemoon.
    };
    if (!order._id) {
      console.log('oomad tu 1')
      dispatch(detailesOrder(orderId));
    } else {
      console.log('oomad tu 2')
      if (!order.isPaid) {
        console.log('oomad tu 3')
        if (!window.paypal) {
          console.log('oomad tu 4', window.paypal)
          addPayPalScript();
        } else {
          console.log('oomad tu 5')
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady]); 

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="recipt-summary">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name : </strong>
                  {order.shippingAddress.fullName}
                  <br />
                  <strong>Address : </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox varian="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method : </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox varian="success">
                    paid at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((orderItem) => (
                    <li key={orderItem.product}>
                      <div className="imgWrapper">
                        <img src={orderItem.image} alt={orderItem.name} />
                      </div>
                      <div className="link">
                        <Link to={`/product/${orderItem.product}`}>
                          {orderItem.name}
                        </Link>
                      </div>
                      <div className="priceWrapper">
                        {orderItem.qty} * ${orderItem.price} = $
                        {orderItem.qty * orderItem.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="price-summary">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>${order.totalPrice.toFixed(2)}</div>
                </div>
              </li>
              {            // in {felan} >>> paypal 
                !order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox/>
                    ) : (
                      <PayPalButton amount = {order.totalPrice} onSuccess={successPaymentHandler}/>
                    )}
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
