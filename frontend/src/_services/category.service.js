import {authHeader } from "../_helpers/auth-header";

export const categoryService = {
    getAll,
    getCategoryById,
    getCategoryProductList
};


async function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch('http://127.0.0.1:8000/api/1.0/categories/?format=json',
        requestOptions
    ).then(res => res.json());
}


async function getCategoryById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/categories/${id}/?format=json`,
        requestOptions
    ).then(res => res.json());
}


async function getCategoryProductList(id, limit, offset){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    if(offset==0){
        return await fetch(`http://localhost:8000/api/1.0/product-categories/?category=${id}&format=json`,
            requestOptions
        ).then(res => res.json());    
    }else{
        return await fetch(`http://localhost:8000/api/1.0/product-categories/?category=${id}&offset=${offset}&format=json`,
            requestOptions
        ).then(res => res.json());
    }
}