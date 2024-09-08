import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarIcon from "../../assets/images/icons/bar.jpg";
import SearchIcon from "../../assets/images/icons/search.jpg";
import Plus from "../../assets/images/icons/plus.jpg";
import Setting from "../../assets/images/icons/setting.jpg";
import Logout from "../../assets/images/icons/logout.jpg";
import "../../assets/scss/HeaderLeft.scss";
import { UserContext } from './UserContext';

export default function Header2() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [types, setTypes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate(); // For programmatic navigation

    useEffect(() => {
        // Fetch profile information
        fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
            credentials: 'include',
            method: 'GET'
        })
            .then(response => response.json())
            .then(userInfo => setUserInfo(userInfo));

        // Fetch post types with counts
        fetch(`${process.env.REACT_APP_API_BASE_URL}/type`, {
            credentials: 'include',
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setTypes(data))
            .catch(error => console.error('Error fetching post types:', error));
    }, [setUserInfo]);

    const logout = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST',
        })
            .then(() => setUserInfo(null))
            .catch(error => console.error('Error logging out:', error));
    };

    const username = userInfo?.username;

    // Helper function to get the color class based on type
    const getColorClass = (type) => {
        switch (type) {
            case 'javascript':
                return 'javascript';
            case 'html':
                return 'html';
            case 'css':
                return 'css';
            case 'others':
                return 'others';
            default:
                return '';
        }
    };

    // Navigate to posts filtered by type
    const handleTypeClick = (type) => {
        navigate(`/posts/type/${type}`);
    };

    // Handle search
    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/search?title=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div className="menu-container">
            {/* Menu Above */}
            <div className="menu-above">
                <div className="menu-above__top">
                    <Link to="/">
                        <p>CODE NOTES</p>
                    </Link>
                    <img src={BarIcon} className="icon" alt="Bar Icon" />
                </div>
                <div className="menu-above__search">
                    <img src={SearchIcon} className="icon icon_search" alt="Search" />
                    <input
                        placeholder="Search"
                        className="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch} className="btn-search">Search</button>
                </div>
            </div>

            {/* Menu Middle */}
            <div className="menu-middle">
                <div className="menu-middle__tasks">
                    <p className="task-title">TASKS</p>
                    <Link to="/create" className="task1">
                        <div className="task">
                            <img src={Plus} alt="Add Task" />
                            <p className="task-name">Add new task</p>
                        </div>
                    </Link>
                </div>
                <div className="menu-middle__lists">
                    <p className="list-title">GROUP BY</p>
                    {types.map((type, index) => (
                        <div
                            className={`list ${getColorClass(type._id)}`}
                            key={index}
                            onClick={() => handleTypeClick(type._id)}
                        >
                            <p className={`color ${getColorClass(type._id)}`} />
                            <p className="list-name">{type._id}</p>
                            <p className="list-count">{type.count}</p>
                        </div>
                    ))}
                </div>

                {/* Menu Under */}
                <div className="menu-under">
                    <div className="menu-under__settings">
                        <img src={Setting} alt="Settings" />
                        <p>Settings</p>
                    </div>

                    <div className="menu-under__logout">
                        <Link to="/login" className="link" onClick={logout}>
                            <img src={Logout} alt="Logout" />
                            <p>Logout {username}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
