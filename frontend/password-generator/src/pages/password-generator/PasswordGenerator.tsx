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
            <label htmlFor="customRange" className="form-label text-white">
                Password Length
            </label>

            <PasswordSizeRange min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>

            <PasswordSizeInput min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>

            <PasswordSettings/>
        </>
    );
};

export default PasswordGenerator;
