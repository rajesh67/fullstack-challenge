import { usersConstants } from "../_constants/users.constants";
import { alertConstants } from "../_constants/alert.contants";
import { alertActions } from "../_actions/alert.actions";

import { userService } from "../_services/user.service";

export const registerUser = (data) => dispatch => {
    console.log("Registering products form database !!!");

    dispatch(request());

    userService.registerUser(data).then(
        (user) => {
            //set user cookies
            localStorage.setItem('user', JSON.stringify(user))

            console.log(user);
            dispatch(alertActions.success("User registered successfully"));
            dispatch(success(user));
        },
        (errors) => {
            dispatch(alertActions.error(errors))
            dispatch(failure(errors));
            
        }
    );
    function request() { return { type: usersConstants.REGISTER_REQUEST } }
    function success(user) { return { type: usersConstants.REGISTER_SUCCESS, payload : user} }
    function failure(errorText) { return { type: usersConstants.REGISTER_FAILURE, payload : errorText } }

    // function alertSuccess() { return { type : alertConstants.SUCCESS, payload : 'User registered successfully!!!'} }
    // function alertFailure(error) { return { type : alertConstants.SUCCESS, payload : error} }
}


export const synchronizeUserState = () => dispatch =>{
    console.log("Synchronizing user's login state");
    const user = localStorage.getItem('user');
    if( user ){
        return {
            type : usersConstants.LOGIN_SUCCESS,
            payload : JSON.parse(user)
        }
    }
    return {
        type : usersConstants.REGISTER_FAILURE,
        payload : "No user session found"
    }
}

export const loginUser = (data) => dispatch => {
    console.log("Logging in to the database !!!");

    dispatch(request());

    userService.loginUser(data).then(
        (user) => {
            //set user cookies
            // localStorage.setItem('user', JSON.stringify(user))
            
            console.log(user);
            dispatch(alertActions.success("User logged in successfully"));
            dispatch(success(user));
        },
        (errors) => {
            dispatch(alertActions.error(errors))
            dispatch(failure(errors));
            
        }
    );
    function request() { return { type: usersConstants.LOGIN_REQUEST } }
    function success(user) { return { type: usersConstants.LOGIN_SUCCESS, payload : user} }
    function failure(errorText) { return { type: usersConstants.LOGIN_FAILURE, payload : errorText } }
}

export const updateUser = (data) => dispatch =>{
    console.log("Updating user in the DB");
}