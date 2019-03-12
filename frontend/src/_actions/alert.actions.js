import { alertConstants } from '../_constants/alert.contants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, payload : message };
}

function error(message) {
    return { type: alertConstants.ERROR, payload : message };
}

function clear() {
    return { type: alertConstants.CLEAR, payload : '' };
}