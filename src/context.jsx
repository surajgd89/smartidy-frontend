import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = createContext();
const AppProvider = ({ children }) => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const getUserData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/users?userId=${userId}`
            );
            setTimeout(() => {
                setLoading(false);
                setUserData(response.data[0]);
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setError(error.message);
            }, 1000);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <AppContext.Provider value={{ userData, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
