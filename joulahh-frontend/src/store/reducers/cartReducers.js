import * as actions from "../actions/actionTypes";

 const initialState = { cartItems :  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).cartItems : [] }


export const cartReducer = (state = initialState , action) => {
    console.log('state',state)
  switch (action.type) {
    case actions.CART_ADD_ITEM:
      const item = action.payload; // item >>oon objecti az data haye mokhtalef ke hamin alan az server gerftim
      const existItem = state.cartItems.find(cartItem => cartItem.product === item.product); //fahmidane inke kalaee ke hamin alan add dardim be cart , ghablan too cart boode ya na .
      if (existItem) {
        const updatedState = { ...state, cartItems : state.cartItems.map(prevCartItem =>  prevCartItem.product === existItem.product ? item : prevCartItem) }
        localStorage.setItem('cartItems',JSON.stringify(updatedState))
        return updatedState;
      } else {
        // moghe'ee ke ye mahsoole kamelan jadid ro add to cart mikonim
        const updatedState = { ...state, cartItems : [ ...state.cartItems, item]}
        localStorage.setItem('cartItems',JSON.stringify(updatedState))
        return updatedState;
      }
      case actions.CART_REMOVE_ITEM:
        const updatedFilteredState = {...state, cartItems : state.cartItems.filter(cartItem => cartItem.product !== action.payload)};
        localStorage.setItem('cartItems',JSON.stringify(updatedFilteredState));
        return updatedFilteredState;

    default:
      return state;
  }
};

// state = { cartItems : [ { name : felan, image : felan, price : felan, countInStock : felan, product : felan, qty : felan} , { hamoona } , { hamoona } , ...]}
// item = { name : felan, image : felan, price : felan, countInStock : felan, product : felan, qty : felan}
