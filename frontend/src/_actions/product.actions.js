import { productConstants } from "../_constants/product.constants";
import { productService } from "../_services/product.service";


export const getAllProducts = () => dispatch => {
    console.log("Fetching products form database !!!");

    dispatch(request());

    productService.getAll().then(
        (products) => {
            console.log(products["results"]);
            dispatch(success(products["results"]));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, payload : products} }
    function failure(errorText) { return { type: productConstants.GETALL_FAILURE, payload : errorText } }
}


export const getProduct = (id) => dispatch => {
    console.log("Fetching product details form database !!!");

    dispatch(request());

    productService.getProduct(id).then(
        (product) => {
            console.log(product);
            dispatch(success(product));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: productConstants.PRODUCT_REQUEST } }
    function success(product) { return { type: productConstants.PRODUCT_SUCCESS, payload : product} }
    function failure(errorText) { return { type: productConstants.PRODUCT_FAILURE, payload : errorText } }
}