import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Authorization.css';
import { RoutePaths } from '../../../../router/RoutePaths';

interface UserData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO http://localhost:8080/passwordGenerator/auth/login

        console.log(userData);
    };

    return (
        <>
            <div className="card">
                <div className="card2">
                    <form className="form" onSubmit={handleSubmit}>
                        <p className="form-header">Welcome Back</p>
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
                        <button className="button"> Login </button>
                        <label className="hint">
                            Have no account?
                            <Link to={RoutePaths.REGISTER}> Register </Link>
                        </label>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
