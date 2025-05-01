import React, { useEffect, useState } from 'react';
import PasswordSizeRange from './components/PasswordSizeRange';
import './PasswordGenerator.css';
import { PasswordSettings } from './components/password-options/PasswordSettings';
import PasswordSizeInput from './components/PasswordSizeInput';
import PasswordIntro from './components/PasswordIntro';
import { CharOptions } from './components/password-options/CharOptions';
import { fetchGeneratedPassword } from './services/PasswordService';
import { API_ROUTES } from '../../constants/ApiRoutes';

const PasswordGenerator: React.FC = () => {
    const [generatedPassword, setGeneratedPassword] = useState<string>('');

    const [passwordSize, setPasswordSize] = useState<number>(16);
    const [selectedFlags, setSelectedFlags] = useState<number>(
        CharOptions.Uppercase | CharOptions.Lowercase | CharOptions.Numbers | CharOptions.Symbols,
    );
    const min: number = 4;
    const max: number = 32;

    const handlePasswordSize = (data: React.ChangeEvent<HTMLInputElement>) => {
        const size: number = Number(data.target.value);

        setPasswordSize(size);
    };

    const toggleFlag = (flag: CharOptions) => {
        setSelectedFlags(prev => {
            if ((prev ^ flag) === CharOptions.None)
                return prev;

            return prev ^ flag;
        });
    };

    useEffect(() => {
        const fetchPassword = async () => {
            try {
                const result = await fetchGeneratedPassword(API_ROUTES.generator, {
                    length: passwordSize,
                    flags: selectedFlags,
                });
                setGeneratedPassword(result.password);
            } catch (error) {
                console.error('Failed to fetch password', error);
            }
        };

        fetchPassword();
    }, [passwordSize, selectedFlags]);

    return (
        <>
            <PasswordIntro/>
            <br></br>
            <div className="PasswordCard">
                <div className="PasswordForm">

                    <div className="mb-5 password-container">
                        <input
                            className="form-control rounded-0 password-input"
                            id="passwordInput"
                            value={generatedPassword}
                            onChange={(e) => setGeneratedPassword(e.target.value)}
                        />
                        <div className="progress rounded-0 password-progress">
                            <div id="passwordStrengthBar" className="progress-bar mb-0 mt-0" role="progressbar" style={{ width: `${50}%` }} aria-valuenow={0}
                                aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                    </div>

                    <label htmlFor="customRange" className="PasswordLength">
                    Password Length
                    </label>

                    <PasswordSizeRange min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>
                    <PasswordSizeInput min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize}/>

                    <div className="checkbox-grid">
                        <PasswordSettings flags={selectedFlags} toggleFlag={toggleFlag}/>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    );
};

export default PasswordGenerator;
