// should fetch order data from backend & show it in the front
// ?? chera hala hatman bayad az backend begireim?
import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailesOrder } from "../store/actions/orderActions";

const OrderScreen = (props) => {

const orderId = props.match.params.id;
const orderDetails = useSelector(state => state.orderDetails);
const { order, loading, error } = orderDetails;

const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailesOrder(orderId));
  }, [dispatch, orderId]);      // ???? dispatch bayad bashe tu dependency ya na ?
  
  return loading ? <LoadingBox/> : error ? <MessageBox variant='danger'>{error}</MessageBox> :
  (
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
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  ,{order.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method : </strong>
                  {order.paymentMethod}
                </p>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
