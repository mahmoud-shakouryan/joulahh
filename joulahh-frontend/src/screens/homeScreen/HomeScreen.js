import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './homeScreen.css';

const HomeScreen = () => {
  useEffect(() => {
    document.title = "جولاه : صفحه اصلی";
  });
  return (
    <div className="homeScreen">
      <div className="homeScreen__left">
        <img src="./images/knit4.png" alt="knit shirt" />{" "}
      </div>
      <div className="homeScreen__right">
        <div className="greeting">
          <h5>کارگروه محصولات دستبافت جولاه</h5>
          <h1>با جولاه شیک ، به‌روز و اصیل باشید</h1>
          <button className='greeting__btn' type='button'>
              <Link to='/products'><p>مشاهده محصولات</p></Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
