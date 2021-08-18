import axios from "axios";
import * as actions from "./actionTypes";

export const detailsProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: actions.PRODUCT_Details_REQUEST, payload: productId });
    try {
      const data = axios.get(`/api/products/${productId}`);
      console.log('data :>> ', data);
      dispatch({ type: actions.PRODUCT_Details_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.PRODUCT_Details_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
