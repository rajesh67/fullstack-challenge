import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import SignIn from "./Signin/SignIn";
import SignUp from "./Signup/SignUp";
import FrontPage from './_components/FrontPage';
import CategoryProducts from "./CategoryPage/CategoryProducts";
import ProductDetails from "./ProductDetails/ProductDetail";

import CartPage from "./Cart/CartPage";
import CheckoutPage from './Checkout/Checkout'

import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';

import { history } from "./_helpers/history";
import {store} from "./store";



ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                
                <Route exact path="/categories/:id" component={CategoryProducts}/>
                <Route exact path="/categories/products/:id" component={ProductDetails}/>

                <Route exact path="/shopping-cart" component={CartPage}/>
                <Route exact path="/checkout" component={CheckoutPage}/>
            </div>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
