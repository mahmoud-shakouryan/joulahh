import * as actions from "./actionTypes";
import axios from "axios";

export const createOrder = (order) => {
  // order >> { orderItems : [] }
  return async (dispatch, getState) => {
    dispatch({ type: actions.ORDER_CREATE_REQUEST, payload: order }); // ????? inja chera bayad order ro bedim?
    try {
      // const { userSigninReducer : { userInfo }} = getState(); >>> bejaye 2khate paeen avavl userSigninReducer destructure shode baad az userSigninReducer , userInfo destructure shode.
      const store = getState(); //returns (reads) all redux store.
      const userInfo = store.userSigninReducer.userInfo;
      const { data } = await axios.post("/api/orders", order, {
        // axios >> front :))) yadet bashe, va oon url >>>> ***********API**************
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: actions.CART_EMPTY });
    } catch (error) {
      dispatch({
        type: actions.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const  detailesOrder = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSigninReducer: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: actions.ORDER_DETAILS_FAIL, payload: message });
    }
  };
};


// baraye page'e order history
export const listOrderMine = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actions.ORDER_MINE_LIST_REQUEST});
    const { userSignin: { userInfo }} = getState();
    try{
          const { data } = await axios.get('/api/orders/mine', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          });
          dispatch({ type: actions.ORDER_MINE_LIST_SUCCESS, payload: data });
    }
    catch(err){
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: actions.ORDER_MINE_LIST_FAIL, payload: message });
    }
  }
}