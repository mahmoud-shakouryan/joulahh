import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/actionTypes";
import "./header.css";

const Header = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [adminDropDown, setAdminDropDown] = useState(false);

  const cartItems = useSelector((state) => state.cartReducer).cartItems;
  const { userInfo } = useSelector((state) => state.userSigninReducer);
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

  const cartBadge = (
    <div className="cart-badge">
      {userInfo && (
        <Link to="/cart">
          <i className="fa fa-shopping-basket">
            {cartItems.length > 0 && userInfo && (
              <span className="badge">{cartItems.length}</span>
            )}
          </i>
        </Link>
      )}
    </div>
  );

  return (
    <div className="header">
      <div className="hamMobileOnly">
        <i className="fa fa-bars"></i>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
      <div className="badgeMobileOnly">{cartBadge}</div>
      <div className="brand">
        <Link to="/">Joulahh</Link>
      </div>
      <div className="navLinks">
        {cartBadge}
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
                <li>X</li>                                         {/*hamaro li kon*/}
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
            <Link to="/signin">
              <p>ورود/ ثبت‌نام</p>
            </Link>
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
        <div className="mainPageNavLinkWrapper">
          <Link to="/">
            <p className="mainPageP">صفحه اصلی</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
