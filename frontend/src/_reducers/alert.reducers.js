import { alertConstants } from "../_constants/alert.contants";

const initialState = {
    type : null,
    message : null
}

export default function (state=initialState, action){
    switch(action.type){
        case alertConstants.SUCCESS:
            console.log("Alert Success")
            return {
                type : 'success',
                message : action.payload
            };
        case alertConstants.ERROR:
            console.log("Alert Error")
            return {
                type : 'error',
                message : action.payload
            };
        case alertConstants.CLEAR:
            console.log("Alert Clear")
            return {
                type : 'info',
                message : action.payload
            };
        default:
            return state;
    }
}