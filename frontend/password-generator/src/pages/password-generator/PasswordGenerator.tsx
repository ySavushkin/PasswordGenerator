import React, { useState } from 'react';
import RangeSlider from './components/RangeSlider';
import './PasswordGenerator.css';
import { PasswordSettings } from './components/password-options/PasswordSettings';

const PasswordGenerator: React.FC = () => {

    const [passwordSize, setPasswordSize] = useState<number>(16);

    const handlePasswordSize = (data: number | React.ChangeEvent<HTMLInputElement>) => {
        if (typeof data === 'number') {
            setPasswordSize(data);
        } else {
            setPasswordSize(Number(data.target.value));
        }
    };

    return (
        <>
            <label htmlFor="customRange" className="form-label text-white">
                Password Length
            </label>

            <RangeSlider setCurrentValue={handlePasswordSize}/>

            <input
                type="number"
                className="form-control"
                id="exampleInputText"
                value={passwordSize}
                onChange={handlePasswordSize}/>

            <PasswordSettings/>
        </>
    );
};

export default PasswordGenerator;
