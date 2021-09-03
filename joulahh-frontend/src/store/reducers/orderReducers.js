import * as actions from "../actions/actionTypes";

const initialState = {};
export const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actions.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case actions.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actions.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true, order: {} }, action) => {       //order:{} ro too ghesmate paypal bardasht
    //loading true baraye inke hamin ke raftim tu safheye orderScreen bayad fetching data from backend dashte bashim

    switch(action.type){
        case actions.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true};
        case actions.ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, order: action.payload }
        case actions.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
