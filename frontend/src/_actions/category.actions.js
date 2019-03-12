import { categoryConstants } from "../_constants/category.constants";
import { categoryService } from "../_services/category.service";

export const getAllCategories = () => dispatch => {
    console.log("Fetching categories from database !!!");

    dispatch(request());

    categoryService.getAll().then(
        (categories) => {
            console.log(categories["results"]);
            dispatch(success(categories["results"]));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(products) { return { type: categoryConstants.GETALL_SUCCESS, payload : products} }
    function failure(errorText) { return { type: categoryConstants.GETALL_FAILURE, payload : errorText } }
}


export const getCategoryById = (id) => dispatch => {
    console.log("Fetching category data from database !!!");

    dispatch(request());

    categoryService.getCategoryById(id).then(
        (category) => {
            console.log(category);
            dispatch(success(category));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: categoryConstants.CATEGORY_REQUEST } }
    function success(category) { return { type: categoryConstants.CATEGORY_SUCCESS, payload : category} }
    function failure(errorText) { return { type: categoryConstants.CATEGORY_FAILURE, payload : errorText } }
}

export const getCategoryProducts = (id, limit, offset) => dispatch => {
    console.log("Fetching category products list from database !!!");

    dispatch(request());

    categoryService.getCategoryProductList(id,limit, offset).then(
        (products) => {
            console.log(products["results"]);
            dispatch(success(products["results"]));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: categoryConstants.CATEGORY_PRODUCTS_REQUEST } }
    function success(products) { return { type: categoryConstants.CATEGORY_PRODUCTS_SUCCESS, payload : products} }
    function failure(errorText) { return { type: categoryConstants.CATEGORY_PRODUCTS_FAILURE, payload : errorText } }
}
