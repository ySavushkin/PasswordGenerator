export interface SaveRecord {
    email: string;
    password: string;
    note?: string;
}

export interface GetRecords {
    email: string;
    records: PasswordRecord[];
}

export interface PasswordRecord {
    password: string;
    note?: string;
}
