import { authHeader } from "../_helpers/auth-header";

async function findCustomerByUserID(id){
    const requestOptions = {
        method : "GET",
        headers : authHeader(),
    }

    await fetch(`http://127.0.0.1:8000/api/1.0/customers/?user=${id}`, requestOptions).then(res => res.json());
}

async function updateByCustomerID(id, data){
    var headers_data = authHeader();
    headers_data["Content-Type"]="application/json"

    const requestOptions = {
        method : "PUT",
        headers : headers_data,
        body : JSON.stringify(data)
    }

    await fetch(`http://127.0.0.1:8000/api/1.0/customers/${id}/`, requestOptions).then(res => res.json());
}