import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/userDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/addCategory';
import { AddProduct } from './admin/addProduct';


const Routes = () => {
    return (
        <div>   
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/shop" exact component={Shop} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                    {/* Se for Administrador */}
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/category" exact component={AddCategory} />
                    <AdminRoute path="/create/product" exact component={AddProduct} />
                    <Route path="/product/:productId" exact component={Product} />
                </Switch> 
            </BrowserRouter>
        </div>
    )
}

export default Routes;