import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = createContext();
const AppProvider = ({ children }) => {
    const userID = new URLSearchParams(window.location.search).get('userID');
    const [UserData, setUserData] = useState();
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState();
    const getUserData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/users?userID=${userID}`
            );
            setTimeout(() => {
                setLoading(false);
                setUserData(response.data[0]);
            }, 1000);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        getUserData();
        
    }, []);
    return (
        <AppContext.Provider value={{ UserData, Loading, Error }}>
            {children}
        </AppContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
