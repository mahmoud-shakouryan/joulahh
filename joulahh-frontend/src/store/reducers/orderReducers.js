import * as actions from '../actions/actionTypes';

const initialState = {};
export const orderCreateReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ORDER_CREATE_REQUEST:
            return { loading: true };
        case actions.ORDER_CREATE_SUCCESS:
            return { loading : false, success: true, order: action.payload };
        case actions.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case actions.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}


