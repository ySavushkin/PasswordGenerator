import { useNavigate, useLocation } from 'react-router-dom';

function NavigationToggle() {
    const navigate = useNavigate();
    const location = useLocation();

    const isRegistration: boolean = location.pathname === '/register';

    const handleToggle = (): void => {
        navigate(isRegistration ? '/login' : '/register');
    };

    return (
        <button onClick={handleToggle} className="btn btn-dark">
        {isRegistration ? 'Have account? Log In' : 'Have no account? Register'}
        </button>
    );
};

export default NavigationToggle;