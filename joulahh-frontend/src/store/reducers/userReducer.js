import * as actions from "../actions/actionTypes";

const initialState = {};
export const userSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_SIGNIN_REQUEST:
      return { loading: true };
    case actions.USER_SIGNIN_SUCCESS:
        console.log('oomad too success')
      const updatedState = {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return updatedState;
    case actions.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
