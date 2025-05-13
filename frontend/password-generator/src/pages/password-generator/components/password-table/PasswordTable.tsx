import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './PasswordTable.css';
import Cookies from 'js-cookie';
import { API_ROUTES } from '../../../../constants/APIRoutes';
import { PasswordRecord } from './PasswordRecord';
import { CookieTokens } from '../../../../constants/CookieTokens';

const PasswordTable = forwardRef((props, ref) => {
    const [passwordRecords, setPasswordRecords] = useState<PasswordRecord[]>([]);

    useImperativeHandle(ref, () => {
        return {
            addRecord: addPasswordRecord,
        };
    });

    const addPasswordRecord = (record: PasswordRecord) => {
        setPasswordRecords(prev => [...prev, record]);
    };

    useEffect(() => {
        const initialData: PasswordRecord[] = [
            { password: '123456', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
        ];

        setPasswordRecords(initialData);

        const fetchData = async () => {
            
            try {                
                const currentEmail = Cookies.get(CookieTokens.userToken);

                if (currentEmail === undefined) return;

                const requestedEmail = new URLSearchParams(window.location.search).get('email');

                if (requestedEmail && requestedEmail !== currentEmail) {
                    console.error('Access to other users data is forbidden');
                    return;
                }
                
                const url = `${API_ROUTES.passwordRecords}?email=${encodeURIComponent(currentEmail)}`;

                const res = await fetch(url);
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
            <h4 className="text-white h4 mb-4"><strong>Ваші збережені паролі</strong></h4>
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
});

export default PasswordTable;
