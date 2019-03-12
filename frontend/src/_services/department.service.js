import {authHeader } from "../_helpers/auth-header";

export const departmentService = {
    getAll
};


async function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch('http://127.0.0.1:8000/api/1.0/departments/?format=json',
        requestOptions
    ).then(res => res.json());
}