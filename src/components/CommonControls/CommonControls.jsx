import React, { useEffect, useState, useContext } from 'react';
import { InputGroup, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaPlus, FaSearch, FaTasks, FaStickyNote, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './CommonControls.scss';
import { AuthContext } from '../../contexts/AuthContext';

const CommonControls = ({
    searchTerm,
    handleSearch,
    handleSelectAll,
    handleDeleteMultiple,
    handleNewItem,
    selectedItemsCount,
    totalItemsCount,
    type,
    startDateFilter,
    handleDateFilter,
    selectedGroup,
    handleGroupFilter
}) => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/groups?account_id=${user.id}`);
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    return (
        <div className="common-controls">
            <div className='controls-left'>
                <Button color="primary" onClick={handleSelectAll}>
                    {type === 'task' ? <FaTasks /> : <FaStickyNote />} 
                    {selectedItemsCount === totalItemsCount ? ' Unselect All' : ` All ${type === 'task' ? 'Tasks' : 'Notes'}`}
                </Button>
                {selectedItemsCount > 0 && (
                    <Button color="danger" className="delete-multiple-button" onClick={handleDeleteMultiple}>
                        <FaTrash /> Delete Selected
                    </Button>
                )}
            </div>
            <div className='controls-right'>
                {type && (
                    <>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="group-filter-dropdown">
                            <DropdownToggle caret>
                                {selectedGroup ? `Group: ${selectedGroup.name}` : 'Select Group'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleGroupFilter(null)}>All Groups</DropdownItem>
                                {groups.map(group => (
                                    <DropdownItem key={group.id} onClick={() => handleGroupFilter(group)}>
                                        {group.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {type === 'task' && (
                            <Input
                                type="date"
                                value={startDateFilter}
                                onChange={handleDateFilter}
                                className="date-filter"
                            />
                        )}
                    </>
                )}
                <InputGroup className="search-bar">
                    <Input
                        placeholder={`Search ${type === 'task' ? 'tasks' : 'notes'}...`}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Button>
                        <FaSearch />
                    </Button>
                </InputGroup>
                <Button color="primary" className="new-item-button" onClick={handleNewItem}>
                    <FaPlus /> New
                </Button>
            </div>
        </div>
    );
};

export default CommonControls;
