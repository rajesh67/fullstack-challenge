import { usersConstants } from "../_constants/users.constants";
import {authHeader } from "../_helpers/auth-header";

export const userService = {
    registerUser,
    loginUser,
    logout
};


async function registerUser(data){
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify(data),
        
    };

    return await fetch('http://127.0.0.1:8000/api/1.0/register/',
        requestOptions
    ).then(res => res.json());
}

async function loginUser(data){
    const requestOptions = {
        method : 'POST',
        headers : { "Content-Type":"application/json"},
        body : JSON.stringify(data)
    }

    return await fetch('http://127.0.0.1:8000/api/1.0/login/',
        requestOptions
    ).then(res => res.json());
}

function logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


async function updateUser(data){
    var headers = authHeader();
    headers["Content-Type"]="application/json";

    const requestOptions = {
        method= 'PUT',
        headers : headers,
        body : JSON.stringify(data)
    }

    return await fetch('http://127.0.0.1:8000/api/1.0/users/{}')
}