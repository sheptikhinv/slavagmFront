import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login/login.tsx";
import Error from "./pages/error/error.tsx";
import {AuthorizationRoute, ProtectedRoute} from "./components/routeGuard.tsx";
import Admin from "./pages/admin/admin.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
        errorElement: <Error/>
    },
    {
        element: <AuthorizationRoute/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            }
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/admin",
                element: <Admin/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
