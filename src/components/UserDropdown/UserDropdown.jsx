import React, { useContext, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import './UserDropdown.scss';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown">
            <DropdownToggle caret className="user-icon">
                <FaUserCircle size={30} />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem href="/logout">Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserDropdown;
