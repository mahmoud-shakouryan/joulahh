import axios from "axios";
import * as actions from "./actionTypes";

export const detailsProduct = (productId) => {
  return (dispatch) => {
    dispatch({ type: actions.PRODUCT_Details_REQUEST });
    axios
      .get(`http://localhost:5000/api/products/${productId}`)
      .then((result) => {
        if (!result.data.product) {
          return dispatch({
            type: actions.PRODUCT_Details_FAIL,
            payload: result.data.message,
          });
        }
        dispatch({
          type: actions.PRODUCT_Details_SUCCESS,
          payload: result.data.product,
        });
      })
      .catch((error) => {                 //in marboot be axiose.
        dispatch({
          type: actions.PRODUCT_Details_FAIL,
          payload: error.message
        });
      });
  };
};

// async (dispatch) => {
//   dispatch({ type : actions.PRODUCT_Details_REQUEST });
//   try {
//     const data = await axios.get(`http://localhost:5000/api/products/${productId}`);
//     console.log(data)
//       dispatch({ type: actions.PRODUCT_Details_SUCCESS, payload: data.data.product });
//   } catch (error) {
//     dispatch({
//       type: actions.PRODUCT_Details_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
