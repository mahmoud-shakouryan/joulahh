import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { register } from "../store/actions/userActions";

const RegisterScreen = (props) => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const userRegister = useSelector(state=>state.userRegisterReducer);
const { userInfo, loading, error } = userRegister;


const dispatch = useDispatch();
const submitHandler = (e) => {
    e.preventDefault();        //no auto refresh
    if(password !== confirmPassword){
     alert('password and cofirm password does not match')
    }
    else{
        dispatch(register(name, email, password));
    }
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
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox>loading</LoadingBox>}
        {error && <MessageBox variant='danger' >{error}</MessageBox> }
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="confirmPassword">Passwoud</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password Again"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
            <label/>
            <button className='primary' type='submit'>Register</button>
        </div>
        <div>
            <label/>
            <div>
                Already Have An Account? {' '} 
                <Link to='/signin'>Sign In</Link>

            </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
     