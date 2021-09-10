import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import * as actions from "./store/actions/actionTypes";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

const App = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [adminDropDown, setAdminDropDown] = useState(false);

  const cartItems = useSelector((state) => state.cartReducer).cartItems;
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch({ type: actions.SIGNOUT }); //?? ajiibe chera borde boodam ino too userActions ba dispatch amal nakard?
  }; // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.

  const userDropDownHandler = () => {
    setAdminDropDown(false);
    setUserDropDown(!userDropDown);
  };
  const adminDropDownHandler = () => {
    setUserDropDown(false);
    setAdminDropDown(!adminDropDown);
  };

  return (
    <BrowserRouter>
      <div className="grid-container" >
        <header className="header">
          <div className="brand">
            <Link to="/">Joulahh</Link>
          </div>
          <div className="navLinks">
            <div className="cart-badge">
              {userInfo && (
                <Link to="/cart">
                  <i className="fa fa-shopping-basket">
                    {" "}
                    {cartItems.length > 0 && userInfo && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </i>
                </Link>
              )}
            </div>
            {userInfo ? (
              <div className="navLinks__userWrapper">
                <Link to="#" onClick={userDropDownHandler}>
                  تنظیمات کاربر<i className="fa fa-caret-down arrow"></i>
                </Link>
                <ul
                  className={
                    userDropDown
                      ? "user-dropdown-content active"
                      : "user-dropdown-content"
                  }
                >
                  <div className="dropDownExit" onClick={userDropDownHandler}>
                    <li>X</li>
                  </div>
                  <li>
                    <Link to="/profile">پروفایل</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">تاریخچه سفارشات</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={signoutHandler}>
                      {" "}
                      خروج از حساب کاربری
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/signin">ورود/ثبت نام</Link>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div>
                <Link to="#admin" onClick={adminDropDownHandler}>
                  ادمین<i className="fa fa-caret-down"></i>
                </Link>
                <ul
                  className={
                    adminDropDown
                      ? "admin-dropdown-content active"
                      : "admin-dropdown-content"
                  }
                >
                  <div className="dropDownExit" onClick={adminDropDownHandler}>
                    <li>X</li>
                  </div>
                  <li>
                    <Link to="/dashboard">داشبورد</Link>
                  </li>
                  <li>
                    <Link to="/productlist">محصولات</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">سفارشات</Link>
                  </li>
                  <li>
                    <Link to="/userlist">کاربران</Link>
                  </li>
                </ul>
              </div>
            )}
            <div className='mainPageNavLinkWrapper'>
            
                <Link to='/'>صفحه اصلی</Link>
              
              </div>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart/:id" component={CartScreen} />{" "}
            {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
          </Switch>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
