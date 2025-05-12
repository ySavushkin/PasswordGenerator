export class ValidationService {
    static validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    static trimUserName = (userName: string): string => {
        return userName.trim();
    }

    static trimEmail = (email: string): string => {
        return email.trim();
    }

    static validatePasswordLength = (password: string): boolean => {
        return password.length >= 8;
    };

    static trimPassword = (password: string): string => {
        return password.trim();
    }

    static validateRepeatPassword = (password: string, repeatPassword: string): boolean => {
        return password === repeatPassword;
    }
}