import Register from '../pages/authorization/components/register/Register';
import LoginPage from '../pages/authorization/components/login/Login';
import { RouterConfig } from './RouterConfig';
import { Navigate } from 'react-router-dom';
import PasswordGenerator from '../pages/password-generator/PasswordGenerator';
import { RoutePaths } from './RoutePaths';

const appRoutes: RouterConfig[] = [
    { path: RoutePaths.REGISTER, element: <Register />, title: 'Register' },
    { path: RoutePaths.LOGIN, element: <LoginPage />, title: 'Log In' },
    { path: RoutePaths.PASSWORD_GENERATOR, element: <PasswordGenerator />, title: 'Password Generator' },
    { path: RoutePaths.CATCH_ALL, element: <Navigate to={RoutePaths.REGISTER} replace/>, title: 'Authorization'},
];

export default appRoutes;
