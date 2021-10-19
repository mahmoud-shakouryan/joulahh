// should fetch order data from backend & show it in the front
// ?? chera hala hatman bayad az backend begireim?
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { detailesOrder } from "../../store/actions/orderActions";
import "./orderScreen.css";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailesOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="orderScreenWrapper">
      {loading ? (
        <div className="orderScreenLoadingBox">
          <LoadingBox />
        </div>
      ) : error ? (
        <div className="orderScreenMsgBox">
          <MessageBox variant="danger">{error}</MessageBox>
        </div>
      ) : (
        <div className="orderScreen">
          <p>
            <span>{order._id}</span>
            <span>کد سفارش</span>
          </p>
          <div className="orderScreenDetails">
            <div className='orderScreenShipping'>
              <ul>
                <li>
                  <p> : مشخصات سفارش</p>
                  <p>
                    <span>
                      <strong>: نام </strong>
                      <span>{order.shippingAddress.fullName}</span>
                    </span>
                    <span>
                      <strong>: آدرس</strong>
                      <span>{order.shippingAddress.address}{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode}{" "}
                      {order.shippingAddress.country}{" "}</span>
                    </span>
                  </p>
                  {order.isDelivered ? (
                    <div className='msg'><MessageBox varian="success">
                    تحویل داده شده {order.deliveredAt}
                  </MessageBox></div>
                  ) : (
                    <div className='msg'><MessageBox variant="danger">تحویل داده نشده</MessageBox></div>
                  )}
                </li>
                <li>
                  <p> : وضعیت پرداخت </p>
                  <p>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <div className="msg"><MessageBox varian="success">
                    paid at {order.deliveredAt}
                  </MessageBox></div>
                  ) : (
                    <div className="msg"><MessageBox variant="danger">پرداخت نشده</MessageBox></div>
                  )}
                </li>
                <li className='ordersImgList'>
                  <p>سفارشات</p>
                  <ul>
                    {order.orderItems.map((orderItem) => (
                      <li key={orderItem.product}>
                        <div className="imgWrapper">
                          <img src={orderItem.image} alt={orderItem.name} />
                        </div>
                        <div>
                          <Link to={`/product/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </div>
                        <div>
                          {orderItem.qty} * ${orderItem.price} = $
                          {orderItem.qty * orderItem.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div>
                      <div>Items</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div>Shipping</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div>Tax</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div>
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
      )}
    </div>
  );
};

export default OrderScreen;
