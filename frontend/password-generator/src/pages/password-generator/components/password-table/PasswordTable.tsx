import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './PasswordTable.css';
import { PasswordRecord } from './PasswordRecord';
import { fetchSavedPasswords } from '../../services/PasswordService';
import Pagination from '../pagination/Pagintation';

const PasswordTable = forwardRef(function PasswordTable(_props, ref) {
    const itemsPerPage: number = 5;

    const [currentPage, setCurrentPage] = useState(1);
    const [passwordRecords, setPasswordRecords] = useState<PasswordRecord[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [displayedItems, setDisplayedItems] = useState<PasswordRecord[]>([]);

    useImperativeHandle(ref, () => {
        return {
            addRecord: addPasswordRecord,
        };
    });

    const addPasswordRecord = (record: PasswordRecord) => {
        setPasswordRecords(prev => [...prev, record]);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSavedPasswords();
                setPasswordRecords(data.records);
            } catch (error) {
                console.error('Failed to fetch passwords', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const total = Math.ceil(passwordRecords.length / itemsPerPage);
        setTotalPages(total);

        const items = passwordRecords.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
        );
        setDisplayedItems(items);
    }, [passwordRecords, currentPage]);

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
            {
                totalPages > 1 &&
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>
            };
        </div>
    );
});

export default PasswordTable;
