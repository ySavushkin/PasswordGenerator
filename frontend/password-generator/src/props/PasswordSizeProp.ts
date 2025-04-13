export interface PasswordSizeProp {
    min: number;
    max: number;
    current: number;
    setCurrentSize: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
