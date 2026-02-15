import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Mock login function
    const login = (userData) => {
        // In a real app, you'd validate credentials here
        console.log("Logging in:", userData);
        setUser(userData);
        localStorage.setItem("leaseit_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("leaseit_user");
    };

    // Check for existing user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("leaseit_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
