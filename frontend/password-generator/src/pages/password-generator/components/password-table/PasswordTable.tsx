import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './PasswordTable.css';
import { PasswordRecord } from './PasswordRecord';
import { fetchSavedPasswords } from '../../services/PasswordService';
import Pagination from '../pagination/Pagintation';

const PasswordTable = forwardRef((_props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage: number = 5;

    const [passwordRecords, setPasswordRecords] = useState<PasswordRecord[]>([]);

    const totalPages: number = Math.ceil(passwordRecords.length / itemsPerPage);

    const displayedItems = passwordRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            { password: 'TUN TUN TUN SAHUR', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'SHPIONIRO GOLUBIRO', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'BANANINI SHIMPANZINI', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'BROMBARDIRO CROCADILO', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'BALERINO CAPUCINO', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'BR BR PATAPIM', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'TRALALELO TRALALA', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'YA ZAEBALSYA NAHOOY', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
            { password: 'LIRILI LARILA', note: 'Email account' },
            { password: 'qwerty', note: 'Work login' },
        ];

        setPasswordRecords(initialData);

        const loadData = async () => {
            const data = await fetchSavedPasswords();
            setPasswordRecords(data.records);
        };

        loadData();
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
                    {displayedItems.map((record, index) => (
                        <tr key={index}>
                            <td>{record.note}</td>
                            <td>{record.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>
        </div>
    );
});

export default PasswordTable;
