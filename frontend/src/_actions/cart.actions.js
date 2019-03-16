import { cartConstants } from "../_constants/cart.constants";
import { cartService } from "../_services/cart.service";

function getCarts(){
    const carts = JSON.parse(localStorage.getItem('carts'));
    return carts;
}


export const getCartsFromStorage = () => dispatch =>{
    console.log("Getting carts from local storage");
    const carts = getCarts();
    if(carts && carts.length !==0){
        dispatch({
            type : cartConstants.GET_CART_SUCCESS,
            payload : carts,
        })
    }else{
        dispatch({
            type : cartConstants.GET_CART_FAILURE,
            payload : 'Error getting data from localstorage.'
        })
    }
}



export const addtoCart = (product) => dispatch =>{
    //Check if the product is already added in
    // one of the cart instances
    // from localstorage
    var carts = [];
    // let addedItem = state.items.find(item=> item.id === action.id)
    let existed_item = carts.length > 0  ? carts.find(cart => cart.id && cart.product && cart.product.id === product.id) : null;
    console.log("In addToCart ");
    console.log(existed_item)
    //If exists, just increment quantity value in it
    // iterator over all cart items
    if(existed_item){
        existed_item.quantity+=1; 
        //Update cart on database
        updateCart(existed_item);
        console.log("Called update cart")
    }else{
        // If doesn't exists previously , then create a new cart
        // with product associated with it and quantity as 1

        var data1 = {"attributes":"Added to cart", "added_on":new Date(), product : product}

        cartService.createCart(data1).then(
            (cart) => {
                console.log(cart);
                //Update carts in the local cache
                dispatch(success(cart));
            },
            (errors) => {
                dispatch(failure(errors));
            }
        );

        console.log("Called create cart")
    }

    function request() { return { type: cartConstants.ADD_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.ADD_CART_SUCCESS, payload : cart} }
    function failure(errorText) { return { type: cartConstants.ADD_CART_FAILURE, payload : errorText } }

}


export const createCart = (data) => dispatch =>{
    console.log("Creating new card : reducer");

    // const carts = getCarts();

    dispatch(request());

    console.log("In Create Cart : with data");
    console.log(data);

    cartService.createCart(data).then(
        (cart) => {
            console.log(cart);
            // carts.push(cart);
            //Update localstorage
            // localStorage.setItem('cart', JSON.stringify(carts));

            //Update carts in the local cache
            dispatch(success(cart));
        },
        (errors) => {
            dispatch(failure(errors));
        }
    );
    function request() { return { type: cartConstants.ADD_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.ADD_CART_SUCCESS, payload : cart} }
    function failure(errorText) { return { type: cartConstants.ADD_CART_FAILURE, payload : errorText } }
}


export const updateCart = (data) => dispatch =>{
    console.log("Creating new card : reducer");
    
    // const carts = getCarts();
    // let existed_item = carts.find(cart => cart.id && cart.product && cart.product.id === data.product.id)

    dispatch(request());

    cartService.updateCartById(data.id, data).then(
        (cart) => {
            console.log(cart);
            dispatch(success(cart));
        },
        (errors) => {
            dispatch(failure(errors));
        }
    );
    function request() { return { type: cartConstants.UPDATE_PRODUCT_REQUEST } }
    function success(cart) { return { type: cartConstants.UPDATE_PRODUCT_SUCCESS, payload : cart} }
    function failure(errorText) { return { type: cartConstants.UPDATE_PRODUCT_FAILURE, payload : errorText } }
}


export const getCartById = (id) => dispatch =>{
    console.log("Fetching cart data : reducer");

    dispatch(request());

    cartService.getCartById(id).then(
        (cart) => {
            console.log(cart);
            dispatch(success(cart));
        },
        (errors) => {
            dispatch(failure(errors));
        }
    );
    function request() { return { type: cartConstants.GET_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.GET_CART_SUCCESS, payload : cart} }
    function failure(errorText) { return { type: cartConstants.GET_CART_FAILURE, payload : errorText } }
}


export const removeCartItems = () => dispatch => {
    console.log("Removing/droping all cart items");

    dispatch({
        type : cartConstants.DROP_CART_ITEMS_SUCCESS,
        payload : [],
    })
}