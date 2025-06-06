import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths';
import Cookies from 'js-cookie';
import { FaCopy, FaSyncAlt } from 'react-icons/fa';
import PasswordSizeRange from './components/PasswordSizeRange';
import './PasswordGenerator.css';
import { PasswordSettings } from './components/password-options/PasswordSettings';
import PasswordSizeInput from './components/PasswordSizeInput';
import PasswordIntro from './components/password-intro/PasswordIntro';
import { CharOptions } from './components/password-options/CharOptions';
import { fetchGeneratedPassword, getSafetyPercent, saveAndUploadPassword } from './services/PasswordService';
import { API_ROUTES } from '../../constants/APIRoutes';
import BubbleBackground from './components/bubble-background/BubbleBackground';
import PasswordTable from './components/password-table/PasswordTable';
import { PasswordRecord, SaveRecord } from './components/password-table/PasswordRecord';
import { CookieTokens } from '../../constants/CookieTokens';
import ProgressBar from './components/progress-bar/ProgressBar';

const PasswordGenerator: React.FC = () => {
    const tableRef = useRef<{ addRecord: (record: PasswordRecord) => void }>(null);

    const [generatedPassword, setGeneratedPassword] = useState<string>('');

    const [passwordNote, setPasswordNote] = useState<string>('');
    const [passwordSize, setPasswordSize] = useState<number>(16);
    const [safetyPercent, setSafetyPercent] = useState<number>(0);
    const [selectedFlags, setSelectedFlags] = useState<number>(
        CharOptions.Uppercase | CharOptions.Lowercase | CharOptions.Numbers | CharOptions.Symbols,
    );
    const min: number = 4;
    const max: number = 32;
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove(CookieTokens.userToken);
        navigate(RoutePaths.LOGIN);
    };

    const handlePasswordSize = (data: React.ChangeEvent<HTMLInputElement>) => {
        const size: number = Number(data.target.value);

        setPasswordSize(size);
    };

    const handleSavePassword = async () => {
        if (generatedPassword === null || generatedPassword === '') return;

        const userKey = Cookies.get(CookieTokens.userToken);

        if (userKey === undefined) return;

        const newRecord: SaveRecord = {
            email: userKey,
            password: generatedPassword,
            note: passwordNote,
        };

        await saveAndUploadPassword(API_ROUTES.addPassword, newRecord, tableRef);
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

    useEffect(() => {
        const fetchSafetyPercent = async () => {
            try {
                const result = await getSafetyPercent(API_ROUTES.passwordSafety, generatedPassword);
                setSafetyPercent(result);
            } catch (error) {
                console.error('Failed to get password safety percent', error);
            }
        };

        fetchSafetyPercent();
    }, [generatedPassword]);

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(generatedPassword);
        alert('Пароль скопирован!');
    };

    const handleRefreshPassword = async () => {
        try {
            const result = await fetchGeneratedPassword(API_ROUTES.generator, {
                length: passwordSize,
                flags: selectedFlags,
            });
            setGeneratedPassword(result.password);
        } catch (error) {
            console.error('Failed to refresh password', error);
        }
    };

    return (
        <>
            <BubbleBackground />
            <button
                type="button" className="btn offset-1 col-3 exit-button"
                onClick={handleLogout}>
                Exit
            </button><br></br>

            <PasswordIntro />
            <br></br>

            <div className="d-flex flex-row justify-content-between">
                <div className="PasswordCard">
                    <div className="PasswordForm">

                        <div className="mb-3 password-container">
                            <div className="d-flex">
                                <input
                                    className="form-control rounded-0 password-input"
                                    id="passwordInput"
                                    type="text"
                                    placeholder="Введіть ваш пароль"
                                    minLength={min}
                                    value={generatedPassword}
                                    onChange={(e) => setGeneratedPassword(e.target.value)}
                                />
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={handleCopyPassword}
                                    title="Копировать">
                                    <FaCopy />
                                </button>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={handleRefreshPassword}
                                    title="Обновить">
                                    <FaSyncAlt />
                                </button>
                            </div>

                            <ProgressBar percent={safetyPercent}/>
                        </div>

                        <label htmlFor="customRange" className="PasswordLength">
                            Password Length
                        </label>

                        <PasswordSizeRange min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize} />
                        <PasswordSizeInput min={min} max={max} current={passwordSize} setCurrentSize={handlePasswordSize} />

                        <div className="checkbox-grid">
                            <PasswordSettings flags={selectedFlags} toggleFlag={toggleFlag} />
                        </div>

                        <div className="row ms-0 me-0">
                            <div className='col-8 ps-0 pe-0'>
                                <input
                                    className="form-control"
                                    id="passwordNote"
                                    placeholder="Нотатка (необовʼязково)"
                                    onChange={e => setPasswordNote(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="button offset-1 col-3"
                                onClick={handleSavePassword}>Save</button>
                        </div>
                    </div>
                </div>

                <div className="PasswordCard">
                    <PasswordTable ref={tableRef}/>
                </div>
            </div>
            <br></br>
        </>
    );
};

export default PasswordGenerator;
