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
