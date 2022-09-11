import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';





function PrivateRoute({children}) {

    const token = localStorage.getItem("auth_token");
    

    if (!token) {
        return <Navigate to="/login"/>;
    } else {
        return children;
    }
}




export default PrivateRoute;