import React, { useState } from "react";
import { Link } from "react-router-dom";

const SigninScreen = () => {

const [email, setEmail] = useState('initialState');
const [password, setPassword] = useState('');

const submitHandler = (e) => {
    e.preventDefautl();        //no auto refresh
    //to do action
}



  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
            onChange={(e) => setEmail(e.target.value)}
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
