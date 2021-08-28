import axios from "axios";
import * as actions from "./actionTypes";


export const addToCart = (productId, qty) => {
    
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      const { product } = result.data;
      dispatch({
        type: actions.CART_ADD_ITEM,
        payload: {
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          product: product._id,
          qty: qty,
        }
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
};

export const removeFromCart = productId => {
  return (dispatch) => {
    dispatch({type:actions.CART_REMOVE_ITEM,payload:productId});
  }
}

export const saveShippingAddress = (data) =>{        // ye object migire dige chera sholughesh mikoni?
  return dispatch => {       // in dispatch ro redux-thuk mide
    dispatch({type : actions.CART_SAVE_SHIPPING_ADDRESS, payload: data})
    //
  }
}