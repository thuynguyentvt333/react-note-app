import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, Button } from 'reactstrap';
import { FaSort, FaEdit, FaTrash } from 'react-icons/fa';
import NoteModal from './NoteModal/NoteModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NoteDetailModal from './NoteDetailModal';
import './NotePage.scss';
import NoteControls from './NoteControls/NoteControls';
import PaginationControls from '../../components/PaginationControls/PaginationControls';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants'; 

const NotePage = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [paginatedNotes, setPaginatedNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [deleteMultiple, setDeleteMultiple] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

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
    const toggleDetailModal = () => setDetailModalOpen(!detailModalOpen);

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

    const handleSelectNote = (noteId) => {
        if (selectedNotes.includes(noteId)) {
            setSelectedNotes(selectedNotes.filter(id => id !== noteId));
        } else {
            setSelectedNotes([...selectedNotes, noteId]);
        }
    };

    const handleSelectAllNotes = () => {
        if (selectedNotes.length === paginatedNotes.length) {
            setSelectedNotes([]);
        } else {
            setSelectedNotes(paginatedNotes.map(note => note.id));
        }
    };

    const handleDeleteMultipleNotes = () => {
        setDeleteMultiple(true);
        setDeleteModalOpen(true);
    };

    const handleViewNoteDetails = (note) => {
        setSelectedNote(note);
        toggleDetailModal();
    };

    return (
        <div className="note-page">
            <NoteControls
                notes={notes}
                setFilteredNotes={setFilteredNotes}
                handleSelectAll={handleSelectAllNotes}
                handleDeleteMultiple={handleDeleteMultipleNotes}
                handleNewItem={() => {
                    setSelectedNote(null);
                    setModalOpen(true);
                }}
                selectedItemsCount={selectedNotes.length}
                totalItemsCount={filteredNotes.length}
            />
            <Table className="note-table" hover>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAllNotes} checked={selectedNotes.length === paginatedNotes.length} /></th>
                        <th>Title <FaSort /></th>
                        <th>Content <FaSort /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedNotes.map(note => (
                        <tr key={note.id} style={{ cursor: 'pointer' }}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={selectedNotes.includes(note.id)} 
                                    onChange={(e) => { 
                                        e.stopPropagation();
                                        handleSelectNote(note.id); 
                                    }} 
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </td>
                            <td onClick={() => handleViewNoteDetails(note)}>{note.title}</td>
                            <td onClick={() => handleViewNoteDetails(note)}>{note.content}</td>
                            <td>
                                <Button size="sm" color="info" className="action-button" onClick={(e) => { e.stopPropagation(); handleEditNote(note); }}>
                                    <FaEdit />
                                </Button>
                                <Button size="sm" color="danger" className="action-button" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note); }}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PaginationControls
                data={filteredNotes}
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPaginatedData={setPaginatedNotes}
            />
            <div className="note-footer">
                <span>Count {filteredNotes.length}</span>
            </div>

            <NoteModal
                isOpen={modalOpen}
                toggle={toggleModal}
                note={selectedNote}
                onSave={fetchNotes}
                accountId={user?.id}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                toggle={toggleDeleteModal}
                onConfirm={confirmDeleteNote}
                note={selectedNote}
                multiple={deleteMultiple}
            />

            <NoteDetailModal
                isOpen={detailModalOpen}
                toggle={toggleDetailModal}
                note={selectedNote}
            />
        </div>
    );
};

export default NotePage;
