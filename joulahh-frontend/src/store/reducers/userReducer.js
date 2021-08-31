import * as actions from "../actions/actionTypes";

const signinInitialState = localStorage.getItem('userInfo') ? { userInfo : JSON.parse(localStorage.getItem('userInfo')) } : {};
export const userSigninReducer = (state = signinInitialState, action) => {

  switch (action.type) {
    case actions.USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case actions.USER_SIGNIN_SUCCESS:
      const updatedState = {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return updatedState;
    case actions.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case actions.SIGNOUT:          //in mostaghim az tu app.js miad
        localStorage.removeItem('userInfo');
        // localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
      return {};
    default:
      return state;
  }
};

const registerInitialState = {}
export const userRegisterReducer = (state = registerInitialState, action) => {

  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case actions.USER_REGISTER_SUCCESS:
      const updatedState = {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return updatedState;
    case actions.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
