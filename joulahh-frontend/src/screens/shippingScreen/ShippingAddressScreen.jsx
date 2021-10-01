import React, { useEffect, useState } from "react";
import { saveShippingAddress } from "../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import "./shippingScreen.css";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

const ShippingAddressScreen = (props) => {
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo } = userSignin;
  // if(!userInfo) {
  //     props.history.push('/signin')
  // }
  const cart = useSelector((state) => state.cartReducer);
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(
    shippingAddress.fullName ? shippingAddress.fullName : ""
  );
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName: fullName,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    );
    props.history.push("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
  }, [props.history, userInfo]);

  return (
    <div className='shippingContainer'>
      <div className="checkoutStepsWrapper"><CheckoutSteps step1 step2></CheckoutSteps></div>
      <form className="form shippingForm" onSubmit={submitHandler}>
        <div>
          <h1>اطلاعات پستی</h1>
        </div>
        <div>
          <label htmlFor="fullName">: نام کامل  </label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">آدرس</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">استان</label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">شهر</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">کد پستی</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        
        <div>
          <button type="submit">
            ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
