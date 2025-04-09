import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/register/Register'
import LoginPage from './components/login/Login'
import NavigationToggle from './components/NavigationToggle';

const Authorization: React.FC = () => {
    return (
        <Router>
            <NavigationToggle/>
            <Routes>
                isRegistration ? (
                    <Route path="/register" element={<RegistrationForm/>}/>
                ) : ( 
                    <Route path="/login" element={<LoginPage/>}/> 
                )
                <Route path="*" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    )
}

export default Authorization
