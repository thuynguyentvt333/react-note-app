import React, { useEffect, useState, useContext } from 'react';
import { InputGroup, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaPlus, FaSearch, FaStickyNote, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './NoteControls.scss';
import { AuthContext } from '../../../contexts/AuthContext';

const NoteControls = ({
    notes,
    setFilteredNotes,
    handleSelectAll,
    handleDeleteMultiple,
    handleNewItem,
    selectedItemsCount,
    totalItemsCount
}) => {
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        filterNotes();
    }, [searchTerm, selectedGroup, notes]);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/groups?account_id=${user.id}`);
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const filterNotes = () => {
        let filtered = notes;

        if (searchTerm) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedGroup) {
            if (selectedGroup.id === 'no-group') {
                filtered = filtered.filter(note => !note.group_id);
            } else {
                filtered = filtered.filter(note => parseInt(note.group_id, 10) === parseInt(selectedGroup.id, 10));
            }
        }

        setFilteredNotes(filtered);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleGroupFilter = (group) => {
        setSelectedGroup(group);
    };

    return (
        <div className="note-controls">
            <div className='controls-left'>
                <Button color="primary" onClick={handleSelectAll}>
                    <FaStickyNote /> {selectedItemsCount === totalItemsCount ? ' Unselect All' : ' All Notes'}
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

                <InputGroup className="search-bar">
                    <Input
                        placeholder="Search notes..."
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

export default NoteControls;
