import {authHeader } from "../_helpers/auth-header";

export const productService = {
    getAll,
    getProduct
};


async function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch('http://127.0.0.1:8000/api/1.0/products/?format=json',
        requestOptions
    ).then(res => res.json());
}


async function getProduct(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(`http://127.0.0.1:8000/api/1.0/products/${id}/?format=json`,
        requestOptions
    ).then(res => res.json());
}

function handleResponse(response){
    return response.text().then(json_data => {
        const data = json_data && JSON.parse(json_data);
        console.log("Response :");
        console.log(data);
        
        if(!response.ok){
            if(response.status==401){
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });

}