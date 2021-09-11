import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { register } from "../store/actions/userActions";


const RegisterScreen = (props) => {
  console.log('registerScreen.js rendering',props.location.search)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegisterReducer);
  const { userInfo, loading, error } = userRegister;
  const [passErr, setPassErr] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //no auto refresh
    if (password !== confirmPassword) {
      alert('felan')
    } else {
      dispatch(register(name, email, password));
     
    }
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    //register ke ok shod chon dobare in component render mishe pas dobare ueEffect va indafe chon userInfo darim mire to if...
    if (userInfo) {
      props.history.push(redirect);
     }
  }, [redirect, userInfo, props.history]);

  return (
    <div className="form-wrapper">
      {error  && (
        <div className="msgBoxWrapper">
          <MessageBox variant="danger">{error}</MessageBox>
        </div>
      )}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>ایجاد حساب کاربری</h1>
        </div>
        <div>
          <label htmlFor="name"> : نام   </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email"> : ایمیل</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"> : رمز عبور</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> :تکرار رمز عبور </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password Again"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button type="submit">{loading ? <LoadingBox /> : "ثبت‌نام"}</button>
        </div>
        <div className="change">
          <div>
            قبلا ثبت‌نام کرده‌اید؟
            <Link to={`/signin?redirect=${redirect}`}>وارد شوید</Link>
          
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
