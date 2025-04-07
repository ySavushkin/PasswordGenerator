import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './Register'
import SignUpForm from './SignUp'
import NavigationToggle from '../../components/NavigationToggle';

const Authorization: React.FC = () => {
    return (
        <Router>
            <NavigationToggle/>
            <Routes>
                isRegistration ? (
                    <Route path="/register" element={<RegistrationForm/>}/>
                ) : ( 
                    <Route path="/login" element={<SignUpForm/>}/> 
                )
                <Route path="*" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    )
}

export default Authorization
