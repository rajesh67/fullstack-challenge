import { categoryConstants } from "../_constants/category.constants";

const initialState = {
    loading : true,
    items : [],
    error : '',
    item : {},
    products : [],
    count : 0,
}

export default function(state = initialState, action){
    switch(action.type){
        case categoryConstants.GETALL_REQUEST:
            return {
                loading : true,
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                items : action.payload,
                count : action.count,
                ...state
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                error : action.payload,
                ...state
            }
        
        case categoryConstants.CATEGORY_REQUEST:
            return {
                loading : true,
            };
        case categoryConstants.CATEGORY_SUCCESS:
            return {
                item : action.payload,
                ...state,
            };
        case categoryConstants.CATEGORY_FAILURE:
            return {
                error : action.payload,
                ...state
            }

        case categoryConstants.CATEGORY_PRODUCTS_REQUEST:
            return {
                loading : true,
                ...state
            };
        case categoryConstants.CATEGORY_PRODUCTS_SUCCESS:
            return {
                products : action.payload,
                ...state
            };
        case categoryConstants.CATEGORY_PRODUCTS_FAILURE:
            return {
                error : action.payload,
                ...state,
            }
        default:
            return state;
    }
}