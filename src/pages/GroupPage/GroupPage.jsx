import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, InputGroup, Input, Button } from 'reactstrap';
import { FaSort, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './GroupPage.scss';

const GroupPage = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/groups?account_id=${user.id}`)
                .then(response => {
                    setGroups(response.data);
                })
                .catch(error => {
                    console.error('Error fetching groups:', error);
                });
        }
    }, [user]);

    return (
        <div className="group-page">
            <div className="group-header">
                <h3>Group List</h3>
                <div className="group-controls">
                    <div className='controls-left'>
                    </div>
                    <div className='controls-right'>
                        <InputGroup className="search-bar">
                            <Input placeholder="Search groups..." />
                            <Button>
                                <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button color="primary" className="new-group-button">
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
                    {groups.map(group => (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>
                                <Button size="sm" color="info" className="action-button">
                                    <FaEdit />
                                </Button>
                                <Button size="sm" color="danger" className="action-button">
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="group-footer">
                <span>Count {groups.length}</span>
            </div>
        </div>
    );
}

export default GroupPage;
