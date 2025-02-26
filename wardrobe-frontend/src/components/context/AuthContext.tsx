import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    token: string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    username: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setToken(token);
            setUsername(username);
        }
    }, []);

    const login = (token: string, username: string) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        setToken(token);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}