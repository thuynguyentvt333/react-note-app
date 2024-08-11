import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaStickyNote, FaTasks, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <FaInfoCircle /> About
                        </Link>
                    </li>
                    <li>
                        <Link to="/notes">
                            <FaStickyNote /> Note
                        </Link>
                    </li>
                    <li>
                        <Link to="/tasks">
                            <FaTasks /> Task
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <FaCog /> Setting
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
