export interface SaveRecord {
    email: string;
    masterPassword: string;
    password: string;
    note?: string;
}

export interface GetRecords {
    records: PasswordRecord[];
}

export interface PasswordRecord {
    password: string;
    note?: string;
}
