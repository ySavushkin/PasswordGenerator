import { CookieTokens } from '../../../constants/CookieTokens';
import Cookies from 'js-cookie';
import { GetRecords, PasswordRecord, SaveRecord } from '../components/password-table/PasswordRecord';
import { API_ROUTES } from '../../../constants/APIRoutes';

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

export async function fetchSavedPasswords(): Promise<GetRecords> {
    try {
        const currentEmail = Cookies.get(CookieTokens.userToken);

        if (currentEmail === undefined) {
            throw new Error('User is not logged in');
        };

        const requestedEmail = new URLSearchParams(window.location.search).get('email');

        if (requestedEmail && requestedEmail !== currentEmail) {
            throw new Error('Access denied');
        }

        const params = new URLSearchParams({
            email: currentEmail,
        });

        const url = `${API_ROUTES.passwordRecords}?${params.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()) as GetRecords;
        return data;
    } catch (error) {
        console.error('Failed to load:', error);
        throw error;
    }
};

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

export async function getSafetyPercent(
    url: string,
    password: string
): Promise<number> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving password:', error);
        throw error;
    }
}