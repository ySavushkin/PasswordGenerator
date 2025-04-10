import Register from "../pages/authorization/components/register/Register";
import LoginPage from "../pages/authorization/components/login/Login";
import { RouterConfig } from "./RouterConfig";
import { Navigate } from "react-router-dom";
import PasswordGenerator from "../pages/password-generator/PasswordGenerator";

const appRoutes: RouterConfig[] = [
    { path: "auth/register", element: <Register />, title: "Register" },
    { path: "auth/login", element: <LoginPage />, title: "Log In" },
    { path: "password-generator", element: <PasswordGenerator />, title: "Password Generator" },
    { path: "*", element: <Navigate to="/auth/register" replace/>, title: "Authorization"}
];

export default appRoutes;