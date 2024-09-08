import "../assets/scss/Login.scss";
import React, { useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/ui/UserContext";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        if (username === '' || password === '') {
            setError('Both fields are required');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                });
            } else {
                alert('wrong credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);  // Kết thúc quá trình tải
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="login">
            <form className="login_form" onSubmit={handleLogin}>
                <div className="form_group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && <div className="error_message">{error}</div>}
                <div className="form_group">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}