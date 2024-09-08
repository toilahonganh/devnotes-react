import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from './UserContext';
import "../../assets/scss/Header.scss";


export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
            credentials: 'include',
            method: 'GET'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch('${process.env.REACT_APP_API_BASE_URL}/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to='/' className="logo">Notes</Link>
            <nav>
                {username && (
                    <div className="logged">
                        <Link to="/create" className="link">Create new post</Link>
                        <a onClick={logout} className="link">Logout ({username})</a>
                    </div>
                )}
                {!username && (
                    <div className="not-logged">
                        <Link to="/login" className="link">Login</Link>
                        <Link to="/register" className="link">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

