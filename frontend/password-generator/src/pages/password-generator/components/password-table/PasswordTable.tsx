import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './PasswordTable.css';
import { PasswordRecord } from './PasswordRecord';
import { fetchSavedPasswords } from '../../services/PasswordService';

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

        const loadData = async () => {
            const data = await fetchSavedPasswords();
            setPasswordRecords(data.records);
        };

        loadData();
    });

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
