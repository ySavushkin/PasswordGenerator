import React, { useState } from 'react';
import PasswordSizeRange from './components/PasswordSizeRange';
import './PasswordGenerator.css';
import { PasswordSettings } from './components/password-options/PasswordSettings';
import PasswordSizeInput from './components/PasswordSizeInput';

const PasswordGenerator: React.FC = () => {

    const [passwordSize, setPasswordSize] = useState<number>(16);
    const min: number = 4;
    const max: number = 32;

    const handlePasswordSize = (data: React.ChangeEvent<HTMLInputElement>) => {
        let size: number = Number(data.target.value);

        setPasswordSize(size);
    };

    return (
        <>
            <div className="mb-5 password-container">
                <input
                    className="form-control rounded-0 password-input"
                    id="passwordInput"
                />
                <div className="progress rounded-0 password-progress">
                    <div id="passwordStrengthBar" className="progress-bar mb-0 mt-0" role="progressbar" style={{ width: `${50}%` }} aria-valuenow={0}
                        aria-valuemin={0} aria-valuemax={100}></div>
                </div>
            </div>

            <div className="PasswordCard">
                <div className="PasswordForm">
                <label htmlFor="customRange" className="PasswordLength">
                    Password Length
                </label>

                <PasswordSizeRange min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>

                <PasswordSizeInput min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>

                <PasswordSettings/>
                </div>
            </div>
            <br></br>
        </>
    );
};

export default PasswordGenerator;
