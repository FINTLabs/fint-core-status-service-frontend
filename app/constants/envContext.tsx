import { createContext, useContext, useState } from "react";
import { useFetcher } from "@remix-run/react";

interface EnvContextType {
    selectedEnv: string;
    setEnv: (env: string) => void;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider = ({ children, initialEnv }: { children: React.ReactNode; initialEnv: string }) => {
    const [selectedEnv, setSelectedEnv] = useState(initialEnv);
    const fetcher = useFetcher();

    function setEnv(env: string) {
        setSelectedEnv(env);
        const formData = new FormData();
        formData.append("env", env);
        fetcher.submit(formData, { method: "POST" });
    }

    return (
        <EnvContext.Provider value={{ selectedEnv, setEnv }}>
            {children}
        </EnvContext.Provider>
    );
};

export const useEnv = () => {
    const context = useContext(EnvContext);
    if (!context) {
        throw new Error("useEnv must be used within an EnvProvider");
    }
    return context;
};
