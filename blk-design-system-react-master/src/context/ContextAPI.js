import React, { createContext, useState, useEffect } from 'react';

export const loginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedEmail = localStorage.getItem('email');
        if (savedIsLoggedIn) {
            setIsLoggedIn(savedIsLoggedIn);
            setEmail(savedEmail);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('email', email);
    }, [isLoggedIn, email]);

    const logout = () => {
        setIsLoggedIn(false);
        setEmail('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
    };

    return (
        <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail, logout }}>
            {children}
        </loginContext.Provider>
    );
};
