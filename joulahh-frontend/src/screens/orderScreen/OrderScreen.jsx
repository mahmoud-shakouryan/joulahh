// should fetch order data from backend & show it in the front
// ?? chera hala hatman bayad az backend begirim?
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { orderDetails } from "../../store/actions/orderActions";
import "./orderScreen.css";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDetails(orderId));
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
          <div className="orderScreenDetails">
            <div className="orderScreenShipping">
              <ul>
                <li className="shippingDetails">
                  <strong> : مشخصات سفارش</strong>
                  <div>
                    <span className="code">
                      <p> : کد سفارش </p>
                      <p>{order._id}</p>
                    </span>
                    <span>
                      <p>: نام </p>
                      <p>{order.shippingAddress.fullName}</p>
                    </span>
                    <span>
                      <p>: آدرس</p>
                      <p>
                        {order.shippingAddress.province}{" "}
                        {order.shippingAddress.city}{" "}
                        {order.shippingAddress.address}{" "}
                      </p>
                    </span>
                    <span>
                      <p> : کدپستی</p>
                      <p>{order.shippingAddress.postalCode}</p>
                    </span>
                  </div>
                  {order.isDelivered ? (
                    <div className="msg">
                      <MessageBox varian="success">
                        تحویل داده شده {order.deliveredAt}
                      </MessageBox>
                    </div>
                  ) : (
                    <div className="msg">
                      <MessageBox variant="danger">تحویل داده نشده</MessageBox>
                    </div>
                  )}
                </li>
                <li className="paymentDetails">
                  <p> : وضعیت پرداخت </p>
                  <p>{order.paymentMethod}</p>
                  {order.isPaid ? (
                    <div className="msg">
                      <MessageBox varian="success">
                        paid at {order.deliveredAt}
                      </MessageBox>
                    </div>
                  ) : (
                    <div className="msg">
                      <MessageBox variant="danger">پرداخت نشده</MessageBox>
                    </div>
                  )}
                </li>
                <li className="ordersImgList">
                  <p> : سفارشات</p>
                  <ul className="ordersImgList__ul">
                    {order.orderItems.map((orderItem) => (
                      <li
                        className="ordersImgList__ul__li"
                        key={orderItem.product}
                      >
                        <div className="imgWrapper">
                          <img src={orderItem.image} alt={orderItem.name} />
                        </div>
                        <div>
                          <Link to={`/product/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </div>
                        <div>
                          {orderItem.qty} x {orderItem.price} =
                          {orderItem.qty * orderItem.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="orderSummaryWrapper">
              <div className="orderSummaryWrapper__div">
                <p> : ریزپرداختی‌ها</p>
                <ul className="orderSummary">
                  <li>
                    <div className="wrapper">
                      <div>سبد خرید</div>
                      <div>
                        <span>ت</span>
                        {order.itemsPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="wrapper">
                      <div>ارسال</div>
                      <div>
                        <span>ت</span>
                        {order.shippingPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="wrapper">
                      <div>مالیات</div>
                      <div>
                        <span>ت</span>
                        {order.taxPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="wrapper">
                      <div>
                        <strong>قیمت کل</strong>
                      </div>
                      <div>
                        <span>ت</span>
                        {order.totalPrice.toFixed(2)}
                      </div>
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
