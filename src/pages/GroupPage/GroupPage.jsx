import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, InputGroup, Input, Button } from 'reactstrap';
import { FaSort, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import GroupModal from './GroupModal/GroupModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './GroupPage.scss';

const GroupPage = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [groupStats, setGroupStats] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        if (user) {
            fetchGroupsAndStats();
        }
    }, [user]);

    const fetchGroupsAndStats = async () => {
        try {
            const groupsResponse = await axios.get(`http://localhost:5000/groups?account_id=${user.id}`);
            const tasksResponse = await axios.get(`http://localhost:5000/tasks?account_id=${user.id}`);
            const notesResponse = await axios.get(`http://localhost:5000/notes?account_id=${user.id}`);

            const groups = groupsResponse.data.map(group => ({
                ...group,
                id: Number(group.id)
            }));
            const tasks = tasksResponse.data.map(task => ({
                ...task,
                group_id: Number(task.group_id),
                status_id: Number(task.status_id)
            }));
            const notes = notesResponse.data.map(note => ({
                ...note,
                group_id: Number(note.group_id)
            }));

            setGroups(groups);
            setFilteredGroups(groups);

            // tính toán số lượng task và note cho từng group
            const stats = groups.reduce((acc, group) => {
                const taskCount = tasks.filter(
                    task => task.group_id === group.id
                ).length;
                const noteCount = notes.filter(note => note.group_id === group.id).length;

                acc[group.id] = { taskCount, noteCount };
                return acc;
            }, {});

            setGroupStats(stats);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

    const handleNewGroup = () => {
        setSelectedGroup(null);
        toggleModal();
    };

    const handleEditGroup = (group) => {
        setSelectedGroup(group);
        toggleModal();
    };

    const handleDeleteGroup = (group) => {
        setSelectedGroup(group);
        toggleDeleteModal();
    };

    const confirmDeleteGroup = () => {
        axios.delete(`http://localhost:5000/groups/${selectedGroup.id}`)
            .then(() => {
                fetchGroupsAndStats();
                toggleDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting group:', error);
            });
    };

    const handleSave = () => {
        fetchGroupsAndStats();
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter(group =>
                group.name.toLowerCase().includes(searchTerm)
            );
            setFilteredGroups(filtered);
        }
    };

    return (
        <div className="group-page">
            <div className="group-header">
                <h3>Group List</h3>
                <div className="group-controls">
                    <div className='controls-left'>
                    </div>
                    <div className='controls-right'>
                        <InputGroup className="search-bar">
                            <Input
                                placeholder="Search groups..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Button>
                                <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button color="primary" className="new-group-button" onClick={handleNewGroup}>
                            <FaPlus /> New
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="group-table" hover>
                <thead>
                    <tr>
                        <th>Group Name <FaSort /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGroups.map(group => (
                        <tr key={group.id}>
                            <td>
                                {group.name} 
                                {groupStats[group.id] && (
                                    <span className="group-stats">
                                        (Tasks: {groupStats[group.id].taskCount}, Notes: {groupStats[group.id].noteCount})
                                    </span>
                                )}
                            </td>
                            <td>
                                <Button size="sm" color="info" className="action-button" onClick={() => handleEditGroup(group)}>
                                    <FaEdit />
                                </Button>
                                <Button size="sm" color="danger" className="action-button" onClick={() => handleDeleteGroup(group)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="group-footer">
                <span>Count {filteredGroups.length}</span>
            </div>

            <GroupModal
                isOpen={modalOpen}
                toggle={toggleModal}
                group={selectedGroup}
                onSave={handleSave}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                toggle={toggleDeleteModal}
                onConfirm={confirmDeleteGroup}
                group={selectedGroup}
            />
        </div>
    );
}

export default GroupPage;
