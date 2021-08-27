import * as actions from "../actions/actionTypes";

const initialState = localStorage.getItem('userInfo') ? { userInfo : JSON.parse(localStorage.getItem('userInfo')) } : {};
export const userSigninReducer = (state = initialState, action) => {

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
    case actions.SIGNOUT:
        console.log('oomad to reducer')
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
      return {};
    default:
      return state;
  }
};
