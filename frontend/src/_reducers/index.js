import { combineReducers } from 'redux';

import AlertReducer from "./alert.reducers";
import ProductReducer from "./product.reducers";
import CategoryReducer from "./category.reducers";
import DepartmentReducer from "./department.reducers";
import UserReducer from './user.reducers';
import CartReducer from './cart.reducers';
import PaymentReducer from "./payment.reducers";

export default combineReducers({
    alerts : AlertReducer,
    products : ProductReducer,
    categories : CategoryReducer,
    departments : DepartmentReducer,
    users : UserReducer,
    carts : CartReducer,
    payment : PaymentReducer
});