import React from 'react';
import '../../Authorization.css';
import { useState } from 'react';
import { UserData } from '../../../../data/UserData';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../../router/RoutePaths';
import { useHandleAuthResult, sendAuthRequest } from '../../AuthService';
import { API_ROUTES } from '../../../../constants/APIRoutes';
import { ValidationService } from '../../ValidationService';

const RegistrationForm: React.FC = () => {
    const handleAuthResult = useHandleAuthResult();

    const [userData, setUserData] = useState<UserData>({
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [notification, setNotification] = useState<{
        message: string;
        type: 'error' | 'success';
        show: boolean;
    }>({ message: '', type: 'error', show: false });

    const showNotification = (message: string, type: 'error' | 'success') => {
        setNotification({ message, type, show: true });
        setTimeout(() => setNotification({ ...notification, show: false }), 5000);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (!ValidationService.trimUserName(userData.userName)) {
            showNotification('Username is required', 'error');
            return false;
        }

        if (!ValidationService.trimEmail(userData.email)) {
            showNotification('Email is required', 'error');
            return false;
        }

        if (!ValidationService.trimPassword(userData.password)) {
            showNotification('Password is required', 'error');
            return false;
        }

        if (!ValidationService.validateEmail(userData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (!ValidationService.validatePasswordLength(userData.password)) {
            showNotification('Password must be at least 8 characters', 'error');
            return false;
        }

        if (!ValidationService.validateRepeatPassword(userData.password, userData.repeatPassword)) {
            showNotification('Passwords do not match', 'error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const registerResult = await sendAuthRequest(API_ROUTES.register, {
            username: userData.userName,
            email: userData.email,
            password: userData.password,
        });

        handleAuthResult( 
            registerResult, 
            'User registered successfully', 
            RoutePaths.PASSWORD_GENERATOR,
            showNotification,
            'Registration successful!',
            'Registration error. Please try again.'
        );
    };

    return (
        <div className="card">
            {notification.show && (
            <div className={`notification ${notification.type}`}>
                {notification.message}
            </div>
        )}
            <div className="card2">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="form-header">Sign Up</p>
                    <div className="field">
                        <svg height="24" width="32" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" fill="#ffffff"/>
                        </svg>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Username"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <svg height="24" width="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#ffffff"/>
                        </svg>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="E-mail"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <svg height="24" width="32" fill="#ffffff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z"></path>
                            <path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z"></path>
                        </svg>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">

                        <svg height="24" width="32" fill="#ffffff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z"></path>
                            <path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z"></path>
                            <path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z"></path>
                            <path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z"></path>
                        </svg>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Repeat your password"
                            name="repeatPassword"
                            value={userData.repeatPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="button"> Create Account </button>
                    <label className="hint">
                        Already have an account?
                        <Link to={RoutePaths.LOGIN}> Log in </Link>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
