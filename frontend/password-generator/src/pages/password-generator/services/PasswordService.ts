type PasswordRequestData = {
    flags: number;
    length: number;
};

type PasswordResponse = {
    password: string;
}

export async function fetchGeneratedPassword(
    request: PasswordRequestData
  ): Promise<PasswordRequestData> {
    try {
    //     const generatorURL = '/api/generate-password';
    //   const response = await fetch(generatorURL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(request),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error(`Server error: ${response.status}`);
    //   }
  
    //   const data = (await response.json()) as PasswordResponse;
      return request;
    } catch (error) {
      console.error('Error fetching password:', error);
      throw error;
    }
  }
