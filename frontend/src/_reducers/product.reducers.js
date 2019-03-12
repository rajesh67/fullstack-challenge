import { productConstants } from "../_constants/product.constants";

const initialState = {
    loading : false,
    items : [],
    errorText : ''
}

export default function(state=initialState, action){
    switch(action.type){
        case productConstants.GETALL_REQUEST:
            console.log("REQUEST")
            return {
                loading : true,
                ...state
            };
        case productConstants.GETALL_SUCCESS:
            console.log("SUCCESS")
            return {
                items : action.payload
            };
        case productConstants.GETALL_FAILURE:
            console.log("FAILURE")
            return {
                errorText : action.payload,
                ...state
            }
        
        case productConstants.PRODUCT_REQUEST:
            console.log("PRODUCT DETAILS REQUEST")
            return {
                loading : true,
                ...state,
            };
        case productConstants.PRODUCT_SUCCESS:
            console.log("PRODUCT DETAILS SUCCESS")
            return {
                item : action.payload,
                ...state,
            };
        case productConstants.PRODUCT_FAILURE:
            console.log("PRODUCT DETIALS FAILURE")
            return {
                errorText : action.payload,
                ...state,
            }
        default:
            console.log("NO ACTION CATURED")
            return state;
    }
}