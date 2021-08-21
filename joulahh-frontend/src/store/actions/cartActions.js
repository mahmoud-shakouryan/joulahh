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
        },
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
};

// axios
// .get(`http://localhost:5000/api/products/${productId}`)
// .then((result) => {
//     console.log(result)
//   const { product } = result.data;
//   console.log(product)
//   dispatch({
//     type: actions.CART_ADD_ITEM,
//     payload: {
//       name: product.name,
//       image: product.image,
//       price: product.price,
//       countInStock: product.countInStock,
//       product: product._id,
//       qty: qty
//     }
//   });
// })
// .catch(error => {
//     console.log('error :>> ', error);
// })
