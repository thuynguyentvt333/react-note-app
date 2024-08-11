import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, InputGroup, Input, Button } from 'reactstrap';
import { FaSort, FaSearch, FaPlus, FaEdit, FaTrash, FaStickyNote } from 'react-icons/fa';
import './NotePage.scss';

const NotePage = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/notes?account_id=${user.id}`)
                .then(response => {
                    setNotes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching notes:', error);
                });
        }
    }, [user]);

    return (
        <div className="note-page">
            <div className="note-header">
                <h3>Note List</h3>
                <div className="note-controls">
                    <div className='controls-left'>
                        <FaStickyNote /> All notes
                    </div>
                    <div className='controls-right'>
                        <InputGroup className="search-bar">
                            <Input placeholder="Search notes..." />
                            <Button>
                                <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button color="primary" className="new-note-button">
                            <FaPlus /> New
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="note-table" hover>
                <thead>
                    <tr>
                        <th>Select <FaSort /></th>
                        <th>Title <FaSort /></th>
                        <th>Content <FaSort /></th>
                        <th>Group <FaSort /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => (
                        <tr key={note.id}>
                            <td><input type="checkbox" /></td>
                            <td>{note.title}</td>
                            <td>{note.content}</td>
                            <td>{note.group_id ? `Group ${note.group_id}` : 'No Group'}</td>
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
            <div className="note-footer">
                <span>Count {notes.length}</span>
            </div>
        </div>
    );
}

export default NotePage;
