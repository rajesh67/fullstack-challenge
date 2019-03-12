import { departmentConstants } from "../_constants/department.constants";

const initialState = {
    loading : true,
    items : [],
    error : ''
}

export default function(state = initialState, action){
    switch(action.type){
        case departmentConstants.GETALL_REQUEST:
            return {
                loading : true
            };
        case departmentConstants.GETALL_SUCCESS:
            return {
                items : action.payload,
                ...state
            };
        case departmentConstants.GETALL_FAILURE:
            return {
                error : action.payload
            }
        default:
            return state;
    }
}