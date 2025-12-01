import React, { createContext, useState, useContext, ReactNode } from "react";

type MasterPasswordContextType = {
    masterPassword: string | null;
    setMasterPassword: (value: string | null) => void;
};

const MasterPasswordContext = createContext<MasterPasswordContextType>({
    masterPassword: null,
    setMasterPassword: () => {},
});

export const MasterPasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [masterPassword, setMasterPassword] = useState<string | null>(null);

    return (
        <MasterPasswordContext.Provider value={{ masterPassword, setMasterPassword }}>
            {children}
        </MasterPasswordContext.Provider>
    );
};

export const useMasterPassword = () => useContext(MasterPasswordContext);
