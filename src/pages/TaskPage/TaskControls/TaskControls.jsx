import React, { useEffect, useState, useContext } from 'react';
import { InputGroup, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaPlus, FaSearch, FaTasks, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './TaskControls.scss';
import { AuthContext } from '../../../contexts/AuthContext';
import moment from 'moment';

const TaskControls = ({
    tasks,
    setFilteredTasks,
    handleSelectAll,
    handleDeleteMultiple,
    handleNewItem,
    selectedItemsCount,
    totalItemsCount
}) => {
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [groups, setGroups] = useState([]);
    const [priorities] = useState([
        { id: 1, name: 'High' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Low' }
    ]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const togglePriorityDropdown = () => setPriorityDropdownOpen(!priorityDropdownOpen);

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [searchTerm, startDateFilter, endDateFilter, selectedGroup, selectedPriority, tasks]);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/groups?account_id=${user.id}`);
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const filterTasks = () => {
        let filtered = tasks;

        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm)
            );
        }

        if (startDateFilter) {
            filtered = filtered.filter(task =>
                moment(task.start_date).isSameOrAfter(moment(startDateFilter), 'day')
            );
        }

        if (endDateFilter) {
            filtered = filtered.filter(task =>
                moment(task.end_date).isSameOrBefore(moment(endDateFilter), 'day')
            );
        }

        if (selectedGroup) {
            if (selectedGroup.id === 'no-group') {
                filtered = filtered.filter(task => task.group_id === null);
            } else {
                filtered = filtered.filter(task => parseInt(task.group_id, 10) === parseInt(selectedGroup.id, 10));
            }
        }

        if (selectedPriority) {
            filtered = filtered.filter(task => parseInt(task.priority_id, 10) === parseInt(selectedPriority.id, 10));
        }

        setFilteredTasks(filtered);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleDateFilter = (type, value) => {
        if (type === 'start') {
            setStartDateFilter(value);
        } else if (type === 'end') {
            setEndDateFilter(value);
        }
    };

    const handleGroupFilter = (group) => {
        setSelectedGroup(group);
    };

    const handlePriorityFilter = (priority) => {
        setSelectedPriority(priority);
    };

    return (
        <div className="task-controls">
            <div className='controls-left'>
                <Button color="primary" onClick={handleSelectAll}>
                    <FaTasks /> {selectedItemsCount === totalItemsCount ? ' Unselect All' : ` All Tasks`}
                </Button>
                {selectedItemsCount > 0 && (
                    <Button color="danger" className="delete-multiple-button" onClick={handleDeleteMultiple}>
                        <FaTrash /> Delete Selected
                    </Button>
                )}
            </div>
            <div className='controls-right'>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="group-filter-dropdown">
                    <DropdownToggle caret>
                        {selectedGroup ? `Group: ${selectedGroup.name}` : 'Select Group'}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleGroupFilter(null)}>All Groups</DropdownItem>
                        <DropdownItem onClick={() => handleGroupFilter({ id: 'no-group', name: 'No Group' })}>No Group</DropdownItem>
                        {groups.map(group => (
                            <DropdownItem key={group.id} onClick={() => handleGroupFilter(group)}>
                                {group.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <Dropdown isOpen={priorityDropdownOpen} toggle={togglePriorityDropdown} className="priority-filter-dropdown">
                    <DropdownToggle caret>
                        {selectedPriority ? `Priority: ${selectedPriority.name}` : 'Select Priority'}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handlePriorityFilter(null)}>All Priorities</DropdownItem>
                        {priorities.map(priority => (
                            <DropdownItem key={priority.id} onClick={() => handlePriorityFilter(priority)}>
                                {priority.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <Input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => handleDateFilter('start', e.target.value)}
                    className="date-filter"
                    placeholder="Start Date"
                />
                <Input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => handleDateFilter('end', e.target.value)}
                    className="date-filter"
                    placeholder="End Date"
                />

                <InputGroup className="search-bar">
                    <Input
                        placeholder="Search tasks..."
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

export default TaskControls;
