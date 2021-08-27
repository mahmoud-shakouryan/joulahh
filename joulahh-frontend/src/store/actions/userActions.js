import axios from 'axios';
import * as actions from './actionTypes';


export const signin = (email, password) => {
  return async (dispatch) => {
      dispatch({type: actions.USER_SIGNIN_REQUEST, payload : {email : email , password : password}})
      try {
          const {data} = await axios.post('/api/users/signin', {email:email,password:password})
          dispatch({type : actions.USER_SIGNIN_SUCCESS, payload : data})
      } catch (err) {
        dispatch({ type: actions.USER_SIGNIN_FAIL, payload: err.message });
      }
  };
};
