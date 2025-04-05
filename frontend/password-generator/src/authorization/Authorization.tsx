import { useState } from 'react'
import './App.css'
import RegistrationForm from './Register'
import SignUpForm from './SignUp'

const Authorization: React.FC = () => {
    const [isRegistration, setIsRegistration] = useState(true);

    const toggleRegistration = (): void => {
        setIsRegistration(prev => !prev);
    }
    
    return (
        <>
            <button type="button" onClick={toggleRegistration} className="btn btn-dark">Dark</button>
            { 
                isRegistration ? 
                    <RegistrationForm/> : 
                    <SignUpForm/> 
            }
        </>
    )
}

export default Authorization
