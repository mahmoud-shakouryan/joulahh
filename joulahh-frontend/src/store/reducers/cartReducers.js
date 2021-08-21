import * as actions from "../actions/actionTypes";
const initialState = { cartItems: [] };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD_ITEM:
      const item = action.payload; // item >>oon objecti az data haye mokhtalef ke hamin alan az server gerftim
      const existItem = state.cartItems.find(cartItem => cartItem.product === item.product); //fahmidane inke kalaee ke hamin alan add dardim be cart , ghablan too cart boode ya na .
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((prevCartItem) =>
            prevCartItem.product === existItem.product ? item : prevCartItem
          ),
        };
      } else {
        // moghe'ee ke ye mahsoole kamelan jadid ro add to cart mikonim
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};

// state = { cartItems : [ { name : felan, image : felan, price : felan, countInStock : felan, product : felan, qty : felan} , { hamoona } , { hamoona } , ...]}
// item = { name : felan, image : felan, price : felan, countInStock : felan, product : felan, qty : felan}
