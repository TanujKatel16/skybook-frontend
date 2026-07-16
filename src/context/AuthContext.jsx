import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

        useEffect(() => {

        const fetchCurrentUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUser(user);
            }
            catch (error) {
                console.log("No user logged in");
            }
        };

        fetchCurrentUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};

export default AuthContext;