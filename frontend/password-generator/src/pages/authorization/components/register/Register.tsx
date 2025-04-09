import React from "react";
import './Register.css';
import { useState } from "react";

interface UserData {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const RegistrationForm: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
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

        if (checkPassword()) {
            console.log("ERROR");
            return;
        }

        console.log(userData);
    }

    const checkPassword = (): boolean => {
        return userData.password !== userData.repeatPassword
    }

    return (
        <div className="bd-example">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <br/>
            <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="userName"
                        value={userData.userName}
                        onChange={handleChange}/>
                </div>
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
                <div className="mb-3">
                    <label htmlFor="inputRepeatPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="repeatPassword"
                        value={userData.repeatPassword}
                        onChange={handleChange}/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
