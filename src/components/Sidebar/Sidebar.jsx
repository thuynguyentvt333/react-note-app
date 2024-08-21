import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaStickyNote, FaTasks, FaSignOutAlt, FaLayerGroup, FaBars } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-title">
                <FaBars /> Menu
            </div>
            <nav>
                <ul>
                    <li className={location.pathname === '/app' ? 'active' : ''}>
                        <Link to="/app">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li className={location.pathname === '/app/group' ? 'active' : ''}>
                        <Link to="/app/group">
                            <FaLayerGroup /> Group
                        </Link>
                    </li>
                    <li className={location.pathname === '/app/notes' ? 'active' : ''}>
                        <Link to="/app/notes">
                            <FaStickyNote /> Note
                        </Link>
                    </li>
                    <li className={location.pathname === '/app/tasks' ? 'active' : ''}>
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
