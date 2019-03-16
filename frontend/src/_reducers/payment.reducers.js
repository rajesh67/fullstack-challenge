import { paymentConstants } from "../_constants/payment.constants";

const initialState = {
    data : {},
    status : 'REQUESTED',
    
    requestedTotal : 0,
}

export default function(state = initialState, action){
    switch(action.type){
        case paymentConstants.PAYMENT_CANCEL:
            return {
                data : action.payload,
                status : 'CANCELLED',
            };
        case paymentConstants.PAYMENT_SUCCESS:
            return {
                data :action.payload,
                status : 'SUCCESS'
            };
        case paymentConstants.PAYMENT_FAILURE:
            return {
                data : action.payload,
                status : 'FAILURE'
            };
        default:
            return state;
    }
}