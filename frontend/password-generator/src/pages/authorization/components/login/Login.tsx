import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../../Authorization.css';

interface UserData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(userData);
    }

    return (
        <>
            <div className="card">
                <div className="card2">
                    <form className="form" onSubmit={handleSubmit}>
                        <p className="form-header">Welcome Back</p>
                        <div className="field">
                            <svg height="24" width="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#ffffff"/>
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
                            <svg height="24" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#ffffff" stroke-width="2" ></path>
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
                            <Link to="/auth/register"> Register </Link>
                        </label>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
