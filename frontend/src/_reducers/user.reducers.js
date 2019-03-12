import { usersConstants } from "../_constants/users.constants";

const initialState = {
    loading : false,
    items : [],
    errorText : '',
    item : {}
}

export default function(state=initialState, action){
    switch(action.type){
        case usersConstants.REGISTER_REQUEST:
            console.log("Register REQUEST")
            return {
                registering : true,
            };
        case usersConstants.REGISTER_SUCCESS:
            console.log("Register SUCCESS")
            return {
                item : action.payload
            };
        case usersConstants.REGISTER_FAILURE:
            console.log("Register FAILURE")
            return {
                errorText : action.payload,
            }
        
        case usersConstants.LOGIN_REQUEST:
            console.log("LOGIN REQUEST")
            return {
                loggingIn : true,
            };
        case usersConstants.LOGIN_SUCCESS:
            console.log("LOGIN SUCCESS")
            return {
                item : action.payload
            };
        case usersConstants.LOGIN_FAILURE:
            console.log("LOGIN FAILURE")
            return {
                errorText : action.payload,
            }
        
        default:
            console.log("NO ACTION CATURED")
            return state;
    }
}