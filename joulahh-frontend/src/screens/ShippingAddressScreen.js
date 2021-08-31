import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../store/actions/cartActions";
import { useDispatch, useSelector} from 'react-redux';


const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSigninReducer);
    const { userInfo } = userSignin;
    // if(!userInfo) {
    //     props.history.push('/signin')
    // }
    const cart = useSelector(state => state.cartReducer);
    const {shippingAddress} = cart;
    console.log('shippingAddress',shippingAddress)
    const [fullName, setFullName] = useState(shippingAddress.fullName ? shippingAddress.fullName : '');
    const [address, setAddress] = useState(shippingAddress.address ? shippingAddress.address : '');
    const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ? shippingAddress.postalCode : '');
    const [country, setCountry] = useState(shippingAddress.country ? shippingAddress.country : '');
     const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
         dispatch(saveShippingAddress({fullName : fullName,address : address, city : city, postalCode : postalCode, country : country }));
        props.history.push('/payment');
    }
    useEffect(()=>{
      if(!userInfo) {
        props.history.push('/signin')
    }
    },[props.history, userInfo])
    
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
            <label/>
            <button className='primary' type='submit'>Continue</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
