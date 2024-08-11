import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaStickyNote, FaTasks, FaCog, FaUser, FaSignOutAlt, FaLayerGroup } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="user-info">
                <FaUser className="user-icon" />
                <span>{user ? user.username : 'Guest'}</span>
            </div>
            
            <nav>
                <ul>
                    <li>
                        <Link to="/app/home">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/group">
                            <FaLayerGroup /> Group
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/notes">
                            <FaStickyNote /> Note
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/tasks">
                            <FaTasks /> Task
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
