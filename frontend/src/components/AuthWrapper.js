// src/components/AuthWrapper.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/protected-route', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    console.error('Failed to authenticate:', response.statusText);
                    navigate('/');
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.error('Error while authenticating:', error);
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};


export default AuthWrapper;
