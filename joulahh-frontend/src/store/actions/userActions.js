import axios from "axios";
import * as actions from "./actionTypes";


export const signin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: actions.USER_SIGNIN_REQUEST,
      payload: { email: email, password: password },
    });
    try {
      const { data } = await axios.post("/api/users/signin", {
        email: email,
        password: password,
      });
      dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: actions.USER_SIGNIN_FAIL, payload: err.message });        //??? inja chera nemitoonam message error ro benevisam
    }
  };
};

// paylaod : error.response && error.respone.data.message ? error.response.data.message : error.message

// sign out tooye hamoon component handle shod

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: actions.USER_REGISTER_REQUEST,
      payload: { email: email, password: password },
    });
    try {
      const { data } = await axios.post("/api/users/register", {
        name : name,
        email: email,
        password: password,
      });
      dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data });
    } catch (error) {
      const errorMsg = error.response.data.message ? error.response.data.message : error.message
      dispatch({ type: actions.USER_REGISTER_FAIL, payload: errorMsg });        //??? inja chera nemitoonam message error ro benevisam
    }
  };
};




