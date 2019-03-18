import { customerConstants } from "../_constants/customer.constants";

const initialState = {
    fetching : false,
    item : {},
    error : ''

}

export default function(state = initialState, action){
    console.log("Customer Reducer")
    switch(action.type){
        case customerConstants.GET_CUSTOMER_REQUEST:
            return {
                fetching : true,
            }
        case customerConstants.GET_CUSTOMER_SUCCESS:
            return {
                item : action.payload,
                ...state,
            }
        case customerConstants.GET_CUSTOMER_FAILURE:
            return {
                fetching : false,
                error : action.payload
            }
        
        case customerConstants.UPDATE_CUSTOMER_REQUEST:
            return {
                fetching : true,
            }
        case customerConstants.UPDATE_CUSTOMER_SUCCESS:
            return {
                item : action.payload
            }
        case customerConstants.UPDATE_CUSTOMER_FAILURE:
            return {
                error : action.payload
            }
        default:
            return state;
    }
}