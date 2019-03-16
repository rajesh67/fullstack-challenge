import { paymentConstants } from "../_constants/payment.constants";

export const onError = (data) => dispatch => {
    console.log("Error occurred while payment");

    // dispatch(request());
    // categoryService.getAll().then(
    //     (categories) => {
    //         console.log(categories["results"]);
    //         dispatch(success(categories["results"]));
    //     },
    //     (error) => {
    //         dispatch(failure(error));
    //     }
    // );
    dispatch( { type: paymentConstants.PAYMENT_FAILURE, payload : data} );
}

export const onSuccess = (data) => dispatch => {
    console.log("Payment successfull");

    // dispatch(request());
    // categoryService.getAll().then(
    //     (categories) => {
    //         console.log(categories["results"]);
    //         dispatch(success(categories["results"]));
    //     },
    //     (error) => {
    //         dispatch(failure(error));
    //     }
    // );

    dispatch( { type: paymentConstants.PAYMENT_SUCCESS, payload : data} );
}


export const onCancel = (data) => dispatch => {
    console.log("Actions : User cancelled the operation");

    // dispatch(request());
    // categoryService.getAll().then(
    //     (categories) => {
    //         console.log(categories["results"]);
    //         dispatch(success(categories["results"]));
    //     },
    //     (error) => {
    //         dispatch(failure(error));
    //     }
    // );
    dispatch( { type: paymentConstants.PAYMENT_CANCEL, payload : data} );
}