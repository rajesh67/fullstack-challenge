import { cartConstants } from "../_constants/cart.constants";

const initialState = {
    creating : false,
    fetching : false,
    updating : false,
    deleting : false,

    error : '',

    items : [],
    item : {},

    total : 0,
    total_items : 0,
    addedItems : []
}

export default function(state = initialState, action){
    switch(action.type){
        case cartConstants.ADD_CART_REQUEST:
            return {
                creating_new : true,
                ...state
            }
        
        case cartConstants.ADD_CART_SUCCESS:
            // localStorage.removeItem('cart');

            // localStorage.setItem('cart', JSON.stringify([...state.items, action.payload]))
            return {
                item : action.payload,
                items : [...state.items, action.payload]
            }
        case cartConstants.ADD_CART_FAILURE:
            return {
                error : action.payload,
                ...state
            }
        
        case cartConstants.GET_CART_REQUEST:
            return {
                fetching : true,
                ...state
            }
        
        case cartConstants.GET_CART_SUCCESS:
            return {
                item : action.payload,
                items : [...state.items, action.payload],
                ...state
            }
        case cartConstants.GET_CART_FAILURE:
            return {
                error : action.payload,
                ...state
            }
        

        case cartConstants.UPDATE_PRODUCT_REQUEST:
            return {
                fetching : true,
                ...state
            }
        
        case cartConstants.UPDATE_PRODUCT_SUCCESS:
            state.items.find(el => {
                if(el.product.id ===action.payload.id){
                    el = action.payload
                }
            })
            return {
                item : action.payload,
                items : [...state.items],
            }
        case cartConstants.UPDATE_PRODUCT_FAILURE:
            return {
                error : action.payload,
                ...state
            }

        case cartConstants.DROP_CART_ITEMS_SUCCESS:
            return {
                items : new Array
            }
        
        default:
            return state;
    }
}