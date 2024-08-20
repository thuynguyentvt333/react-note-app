import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

const NoteModal = ({ isOpen, toggle, note, onSave, accountId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setGroupId(note.group_id ? parseInt(note.group_id, 10) : '');
        } else {
            setTitle('');
            setContent('');
            setGroupId('');
        }
    }, [note]);

    useEffect(() => {
        if (isOpen && accountId) {
            axios.get(`http://localhost:5000/groups?account_id=${accountId}`)
                .then(response => {
                    setGroups(response.data);
                })
                .catch(error => {
                    console.error('Error fetching groups:', error);
                });
        }
    }, [isOpen, accountId]);

    const handleSave = async () => {
        const currentDate = moment().format('YYYY-MM-DD');
        const noteData = {
            ...note,
            title,
            content,
            group_id: groupId ? parseInt(groupId, 10) : null,
            account_id: parseInt(accountId, 10),
            created_at: note && note.created_at ? note.created_at : currentDate,
            updated_at: currentDate
        };

        if (note && note.id) {
            axios.put(`http://localhost:5000/notes/${note.id}`, noteData)
                .then(() => {
                    onSave();
                    resetForm();
                })
                .catch(error => {
                    console.error('Error updating note:', error);
                });
        } else {
            try {
                const response = await axios.get('http://localhost:5000/notes');
                const existingNotes = response.data;
                const maxId = existingNotes.length > 0 ? Math.max(...existingNotes.map(n => n.id)) : 0;
                
                const newNote = { ...noteData, id: maxId + 1 };

                axios.post('http://localhost:5000/notes', newNote)
                    .then(() => {
                        onSave();
                        resetForm();
                    })
                    .catch(error => {
                        console.error('Error creating note:', error);
                    });
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setGroupId('');
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="note-modal">
            <ModalHeader toggle={toggle}>{note && note.id ? 'Edit Note' : 'New Note'}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="noteTitle">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="noteTitle"
                            placeholder="Enter note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="noteContent">Content</Label>
                        <Input
                            type="textarea"
                            name="content"
                            id="noteContent"
                            placeholder="Enter note content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="noteGroup">Group</Label>
                        <Input
                            type="select"
                            name="group_id"
                            id="noteGroup"
                            value={groupId}
                            onChange={(e) => setGroupId(parseInt(e.target.value, 10))}
                        >
                            <option value="">No Group</option>
                            {groups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>
                    {note && note.id ? 'Update' : 'Create'}
                </Button>{' '}
                <Button color="secondary" onClick={resetForm}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NoteModal;
