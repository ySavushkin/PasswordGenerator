import React, { useEffect, useState } from 'react';
import './PasswordTable.css';
import { API_ROUTES } from '../../../../constants/ApiRoutes';
import { PasswordRecord } from './PasswordRecord';

const PasswordTable: React.FC = () => {
    const [passwordRecords, setPasswordRecords] = useState<PasswordRecord[]>([]);

    useEffect(() => {
        const initialData: PasswordRecord[] = [
            { password: '123456', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
        ];

        setPasswordRecords(initialData);

        const fetchData = async () => {
            try {
                const res = await fetch(API_ROUTES.passwordRecords);
                const data = await res.json();
                setPasswordRecords(data);
            } catch (error) {
                console.error('Failed to load:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-3">
            <h2 className="text-white h2 mb-4">Ваші збережені паролі</h2>
            <table className="table table-dark table-striped m-auto">
                <thead>
                    <tr>
                        <th scope="col">Замітка</th>
                        <th scope="col">Пароль</th>
                    </tr>
                </thead>
                <tbody>
                    {passwordRecords.map((record, index) => (
                        <tr key={index}>
                            <td>{record.note}</td>
                            <td>{record.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PasswordTable;
