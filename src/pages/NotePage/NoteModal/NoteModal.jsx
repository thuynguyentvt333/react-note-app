import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const NoteModal = ({ isOpen, toggle, note, onSave, accountId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setGroupId(note.group_id || '');
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

    const handleSave = () => {
        const noteData = {
            ...note,
            title,
            content,
            group_id: groupId || null
        };

        const saveAction = note && note.id
            ? axios.put(`http://localhost:5000/notes/${note.id}`, noteData)
            : axios.post('http://localhost:5000/notes', noteData);

        saveAction
            .then(() => {
                onSave();
                toggle();
                setTitle('');
                setContent('');
                setGroupId('');
            })
            .catch(error => {
                console.error('Error saving note:', error);
            });
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
                            onChange={(e) => setGroupId(e.target.value)}
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
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default NoteModal;
