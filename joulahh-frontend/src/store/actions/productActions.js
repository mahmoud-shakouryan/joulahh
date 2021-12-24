import axios from "axios";
import * as actions from "./actionTypes";

export const listProducts = () => {
  return async (dispatch) => {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get("http://api.joulahh.ir/api/products");
      dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: err.message });
    }
  };
};
