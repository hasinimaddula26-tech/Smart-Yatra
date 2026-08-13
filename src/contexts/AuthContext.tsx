import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(false); // Instantly false to avoid startup delay

    useEffect(() => {
        // Mock authentication check from localStorage
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string) => {
        const user = { id: 'mock-user-123', email, role: 'authenticated' };
        setCurrentUser(user);
        localStorage.setItem('mockUser', JSON.stringify(user));
    }

    const logout = async () => {
        setCurrentUser(null);
        localStorage.removeItem('mockUser');
    }

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
