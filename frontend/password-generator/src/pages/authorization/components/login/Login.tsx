import React from "react";
import './Login.css';
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="bd-example">
            <h1>Welcome Back</h1>
            <br/>
            <form onSubmit={handleSubmit}>          
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">E-mail</label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We never share your E-mail to anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <label className="mt-2">
                Have no account?
                <Link to="/auth/register" className="btn btn-link underline px-0">
                    Register
                </Link>
            </label>
        </div>
    );
};

export default LoginPage;
