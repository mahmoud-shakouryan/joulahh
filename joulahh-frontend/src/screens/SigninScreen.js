import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signin } from "../store/actions/userActions";

const SigninScreen = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const userSignin = useSelector(state=>state.userSigninReducer);
const { userInfo, loading, error } = userSignin;


const dispatch = useDispatch();
const submitHandler = (e) => {
    e.preventDefault();        //no auto refresh
    dispatch(signin(email, password));
}


const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
useEffect(()=>{
    if(userInfo){
        props.history.push(redirect);
    }
},[redirect, userInfo, props.history])
  
return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox>loading</LoadingBox>}
        {error && <MessageBox variant='danger' >{error}</MessageBox> }
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Passwoud</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
            <label/>
            <button className='primary' type='submit'>Sign In</button>
        </div>
        <div>
            <label/>
            <div>
                New Customer? {' '} 
                <Link to='/register'>Create Your Account</Link>

            </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
