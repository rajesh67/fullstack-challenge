import { cartConstants } from "../_constants/cart.constants";
import { authHeader } from "../_helpers/auth-header";

export const cartService = {
    getAllCarts,
    createCart,
    getCartById,
    updateCartById,
    deleteCartById
}



async function getAllCarts(){
    console.log("Fetching all carts");

    //Get Carts from localstorage

    const requestOptions = {
        method: 'GET',
        headers: {"Content-Type":"application/json"},
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/carts/?format=json`,
        requestOptions
    ).then(res => res.json());
}

async function createCart(data){
    console.log("Creating new cart");

    var headers_data = authHeader();
    headers_data["Content-Type"]="applicaton/json";
    
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify(data)
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/carts/?format=json`,
        requestOptions
    ).then(res => res.json());
}

async function getCartById(id){
    console.log("Fetching cart products");
    
    var headers_data = authHeader();
    headers_data["Content-Type"]="applicaton/json"; 

    const requestOptions = {
        method: 'GET',
        headers: headers_data
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/carts/${id}/?format=json`,
        requestOptions
    ).then(res => res.json());
}


async function updateCartById(id, data){
    console.log("Updating cart into the DB");
    var headers_data = authHeader();
    headers_data["Content-Type"]="applicaton/json";

    const requestOptions = {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify(data)
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/carts/${id}/?format=json`,
        requestOptions
    ).then(res => res.json());
}

async function deleteCartById(id){
    console.log("Fetching cart products");
    var headers_data = authHeader();
    headers_data["Content-Type"]="applicaton/json" 
    const requestOptions = {
        method: 'DELETE',
        headers: headers_data
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/carts/${id}/?format=json`,
        requestOptions
    ).then(res => res.json());
}