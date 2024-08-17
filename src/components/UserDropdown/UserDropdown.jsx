import React, { useContext, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import './UserDropdown.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown">
            <DropdownToggle caret className="user-icon">
                <FaUserCircle size={30} />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem href="/app/profile">Profile</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserDropdown;
