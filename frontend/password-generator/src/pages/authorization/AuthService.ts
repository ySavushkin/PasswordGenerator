import { useNavigate } from 'react-router-dom';

type AuthRequestData = {
    email: string;
    password: string;
    username?: string;
};

type AuthResponse = {
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

       
        const result = await response.json().catch(() => response.text());
        
        return {
            success: response.ok,
            message: typeof result === 'object' ? result.message || result.error : result,
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
    ): void => {
        if (result.success && result.message === successMessage) {
            alert(successMessage);
            navigate(navigateTo);
        } else {
            alert(result.message);
        }
    };

    return handleAuthResult;
}
