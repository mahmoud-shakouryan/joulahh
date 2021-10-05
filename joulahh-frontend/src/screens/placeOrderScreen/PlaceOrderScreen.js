import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { createOrder } from "../../store/actions/orderActions";
import * as actions from "../../store/actions/actionTypes";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import "./placeOrderScreen.css";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cartReducer);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { shippingAddress } = useSelector((state) => state.cartReducer);

  const toPrice = (num) => Number(num.toFixed(2)); //5.122323 >> "5.12" >> 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice); //mohasebe maliat az kole gheymate kalaha
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); //kare khasi nakardim faghat chon baraye order ma orderItems mikhaim na cartItems vali mohtaviateshoon yekie, esmeshoon ro taghir dadim.
  };

  useEffect(() => {
    // if (!cart.paymentMethod) {
    //   return props.history.push("/payment");
    // }
    if (success) {
      dispatch({ type: actions.ORDER_CREATE_RESET }); //faghat state'e orderCreate ro khali kardim
      return props.history.push(`/order/${order._id}`);
    }
  }, [dispatch, props.history, cart.paymentMethod, success, order]);

  useEffect(() => {
    if (!shippingAddress.address) {
      props.history.push("/shipping");
    }
  }, [props.history, shippingAddress]);

  return (
    <div className="placeOrder-container">
      <div className="placeOrder-checkoutSteps">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="recipt-wrapper">
        <div className="recipt-summary">
          <ul>
            <li>
              <div>
                <p>: مشخصات</p>
                <p>
                  <strong>نام :</strong>
                  <span> {cart.shippingAddress.fullName} </span>
                  <br />
                  <strong>آدرس :</strong>
                  <span>
                    {" "}
                    {cart.shippingAddress.country} , {cart.shippingAddress.city}{" "}
                    , {cart.shippingAddress.postalCode} ,{" "}
                    {cart.shippingAddress.address}
                  </span>
                </p>
              </div>
            </li>
            {/* <li>
              <div >
                <h2>Payment</h2>
                <p>
                  <strong>Method : </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li> */}
            <li className="orderItemsWrapper">
              <p className="title">اقلام سفارشی</p>
              <ul className="img-details-wrapper">
                {cart.cartItems.map((cartItem) => (
                  <li className="imgDetailsLi" key={cartItem.product}>
                    <div className="wrapperDiv">
                      <div className="imgWrapper">
                        <img src={cartItem.image} alt={cartItem.name} />
                      </div>

                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>

                      <div className="priceWrapper">
                        {cartItem.qty} x {cartItem.price} ={" "}
                        {cartItem.qty * cartItem.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className="price-summary">
          <ul>
            <li>
              <p id="title">رسید قیمت </p>
            </li>
            <li className="recipt">
              <div>
                <div>
                  <strong>قیمت کل</strong>
                </div>
                <div>{cart.totalPrice.toFixed(2)}</div>
              </div>
              <div>
                <div>دستمزد</div>
                <div>{cart.taxPrice.toFixed(2)}</div>
              </div>
              <div>
                <div>اقلام</div>
                <div>{cart.itemsPrice.toFixed(2)}</div>
              </div>
              <div>
                <div>ارسال پستی</div>
                <div>{cart.shippingPrice.toFixed(2)}</div>
              </div>
            </li>
            <li className='buttonWrapper'>
              <button
                type="button"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
              >
                ثبت سفارش
              </button>
            </li>
            {loading && <LoadingBox />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
