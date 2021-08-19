import * as actions from '../actions/actionTypes';
const initialState = {product:{},loading:false, error:null}


export const productDetailsReducer = (state =initialState, action) => {
    switch (action.type) {
        case actions.PRODUCT_Details_REQUEST:
            return { ...state, loading : true};
        case actions.PRODUCT_Details_SUCCESS:
            console.log('oomad too reducer case product.detail.success')
            return { ...state, loading : false , product : action.payload}
        case actions.PRODUCT_Details_FAIL:
            console.log('oomad too reducer case product.detail.fail')
            return { ...state, loading:false, error: action.payload}
    
        default:
            return state;
    }
}