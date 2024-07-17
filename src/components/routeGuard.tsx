import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = () => {
    return localStorage.getItem("access_token") ? <Outlet/> : <Navigate to={"/login"} replace={true}/>;
};

export const AuthorizationRoute = () => {
    return localStorage.getItem("access_token") ? <Navigate to={"/"} replace={true}/> : <Outlet/>;
};