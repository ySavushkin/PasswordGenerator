import { PasswordRecord, SaveRecord } from '../components/password-table/PasswordRecord';

type PasswordRequestData = {
    flags: number;
    length: number;
};

type PasswordResponse = {
    password: string;
}

export async function fetchGeneratedPassword(
    url: string,
    request: PasswordRequestData,
): Promise<PasswordResponse> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = (await response.json()) as PasswordResponse;
        return data;
    } catch (error) {
        console.error('Error fetching password:', error);
        throw error;
    }
}

export async function saveAndUploadPassword(
    url: string,
    request: SaveRecord,
    tableRef: React.RefObject<{ addRecord: (record: PasswordRecord) => void; } | null>,
): Promise<void> {
    try {
        const newRecord = request;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord),
        });

        if (!response.ok) {
            throw new Error('Failed to save the password');
        }

        if (tableRef.current) {
            tableRef.current.addRecord(newRecord);
        }
    } catch (error) {
        console.error('Error saving password:', error);
    }
}
