import { departmentConstants } from "../_constants/department.constants";
import { departmentService } from "../_services/department.service";

export const getAllDepartments = () => dispatch => {
    console.log("Fetching departments from database !!!");

    dispatch(request());

    departmentService.getAll().then(
        (departments) => {
            console.log(departments["results"]);
            dispatch(success(departments["results"]));
        },
        (error) => {
            dispatch(failure(error));
        }
    );
    function request() { return { type: departmentConstants.GETALL_REQUEST } }
    function success(products) { return { type: departmentConstants.GETALL_SUCCESS, payload : products} }
    function failure(errorText) { return { type: departmentConstants.GETALL_FAILURE, payload : errorText } }
}
