import { categoryConstants } from "../_constants/category.constants";

const initialState = {
    loading : true,
    items : [],
    error : '',
    item : {},
    products : []
}

export default function(state = initialState, action){
    switch(action.type){
        case categoryConstants.GETALL_REQUEST:
            return {
                loading : true
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                items : action.payload
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                error : action.payload
            }
        
        case categoryConstants.CATEGORY_REQUEST:
            return {
                loading : true
            };
        case categoryConstants.CATEGORY_SUCCESS:
            return {
                item : action.payload
            };
        case categoryConstants.CATEGORY_FAILURE:
            return {
                error : action.payload
            }

        case categoryConstants.CATEGORY_PRODUCTS_REQUEST:
            return {
                loading : true
            };
        case categoryConstants.CATEGORY_PRODUCTS_SUCCESS:
            return {
                items : action.payload,
                ...state
            };
        case categoryConstants.CATEGORY_PRODUCTS_FAILURE:
            return {
                error : action.payload
            }
        default:
            return state;
    }
}