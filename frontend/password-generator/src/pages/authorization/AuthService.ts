import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CookieTokens } from '../../constants/CookieTokens';

type AuthRequestData = {
    email: string;
    password: string;
    username?: string;
};

export type AuthResponse = {
    success: boolean;
    message: string;
};

export async function sendAuthRequest(
    url: string,
    data: AuthRequestData,
): Promise<AuthResponse> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        return {
            success: result.success,
            message: result.message || (response.ok ? 'Success' : 'Request failed'),
        };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occurred' };
    }
}

export function useHandleAuthResult() {
    const navigate = useNavigate();

    const handleAuthResult = (
        result: AuthResponse,
        successMessage: string,
        navigateTo: string,
        showNotification: (message: string, type: 'error' | 'success') => void,
        authSuccessMessage: string,
        authFailedMessage: string,
        token: string
    ): void => {
        if (result.success && result.message === successMessage) {
            if (token) {
                Cookies.set(CookieTokens.userToken, token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict'
                });
            }

            showNotification(authSuccessMessage, 'success');
            setTimeout(() => navigate(navigateTo), 1500);
        } else {
            showNotification(authFailedMessage, 'error');
        }
    };

    return handleAuthResult;
}
