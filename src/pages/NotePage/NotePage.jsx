import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, InputGroup, Input, Button } from 'reactstrap';
import { FaSort, FaSearch, FaPlus, FaEdit, FaTrash, FaStickyNote } from 'react-icons/fa';
import NoteModal from './NoteModal/NoteModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './NotePage.scss';

const NotePage = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteMultiple, setDeleteMultiple] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = () => {
        axios.get(`http://localhost:5000/notes?account_id=${user.id}`)
            .then(response => {
                setNotes(response.data);
                setFilteredNotes(response.data);
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
            });
    };

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

    const handleNewNote = () => {
        setSelectedNote(null);
        toggleModal();
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        toggleModal();
    };

    const handleDeleteNote = (note) => {
        setSelectedNote(note);
        setDeleteMultiple(false);
        toggleDeleteModal();
    };

    const confirmDeleteNote = () => {
        if (deleteMultiple) {
            axios.all(selectedNotes.map(noteId => axios.delete(`http://localhost:5000/notes/${noteId}`)))
                .then(() => {
                    fetchNotes();
                    toggleDeleteModal();
                    setSelectedNotes([]);
                })
                .catch(error => {
                    console.error('Error deleting notes:', error);
                });
        } else {
            axios.delete(`http://localhost:5000/notes/${selectedNote.id}`)
                .then(() => {
                    fetchNotes();
                    toggleDeleteModal();
                })
                .catch(error => {
                    console.error('Error deleting note:', error);
                });
        }
    };

    const handleSave = () => {
        fetchNotes();
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter(note =>
                note.title.toLowerCase().includes(searchTerm)
            );
            setFilteredNotes(filtered);
        }
    };

    const handleSelectNote = (noteId) => {
        if (selectedNotes.includes(noteId)) {
            setSelectedNotes(selectedNotes.filter(id => id !== noteId));
        } else {
            setSelectedNotes([...selectedNotes, noteId]);
        }
    };

    const handleSelectAllNotes = () => {
        if (selectedNotes.length === filteredNotes.length) {
            setSelectedNotes([]);
        } else {
            setSelectedNotes(filteredNotes.map(note => note.id));
        }
    };

    const handleDeleteMultipleNotes = () => {
        setDeleteMultiple(true);
        toggleDeleteModal();
    };

    return (
        <div className="note-page">
            <div className="note-header">
                <h3>Note List</h3>
                <div className="note-controls">
                    <div className='controls-left'>
                        <Button color="primary" onClick={handleSelectAllNotes}>
                            <FaStickyNote /> {selectedNotes.length === filteredNotes.length ? 'Unselect All' : 'All Notes'}
                        </Button>
                        {selectedNotes.length > 0 && (
                            <Button color="danger" className="delete-multiple-button" onClick={handleDeleteMultipleNotes}>
                                <FaTrash /> Delete Selected
                            </Button>
                        )}
                    </div>
                    <div className='controls-right'>
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
                        <Button color="primary" className="new-note-button" onClick={handleNewNote}>
                            <FaPlus /> New
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="note-table" hover>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAllNotes} checked={selectedNotes.length === filteredNotes.length} /></th>
                        <th>Title <FaSort /></th>
                        <th>Content <FaSort /></th>
                        <th>Group <FaSort /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNotes.map(note => (
                        <tr key={note.id}>
                            <td><input type="checkbox" checked={selectedNotes.includes(note.id)} onChange={() => handleSelectNote(note.id)} /></td>
                            <td>{note.title}</td>
                            <td>{note.content}</td>
                            <td>{note.group_id ? `Group ${note.group_id}` : 'No Group'}</td>
                            <td>
                                <Button size="sm" color="info" className="action-button" onClick={() => handleEditNote(note)}>
                                    <FaEdit />
                                </Button>
                                <Button size="sm" color="danger" className="action-button" onClick={() => handleDeleteNote(note)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="note-footer">
                <span>Count {filteredNotes.length}</span>
            </div>

            <NoteModal
                isOpen={modalOpen}
                toggle={toggleModal}
                note={selectedNote}
                onSave={handleSave}
                accountId={user?.id}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                toggle={toggleDeleteModal}
                onConfirm={confirmDeleteNote}
                note={selectedNote}
                multiple={deleteMultiple}
            />
        </div>
    );
}

export default NotePage;
