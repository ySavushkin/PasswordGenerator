import React from "react";

const RegistrationForm: React.FC = () => {
  return (
    <div className="bd-example">
        <h1>Sign Up</h1>
        <form>
        <br/>
        <div className="mb-3">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName"/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We never share your E-mail to anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword"/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputRepeatPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="inputRepeatPassword"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check box :)</label>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
    </div>
  );
};

export default RegistrationForm;
