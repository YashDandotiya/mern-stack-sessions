import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticationSuccess = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch('http://localhost:5000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        navigate('/');
    };

    return (
        <div>
            You are successfully logged in 
            <button onClick={handleLogout}>Tap to logout</button>
        </div>
    );
};

export default AuthenticationSuccess;
