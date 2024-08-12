import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import './GroupModal.scss';

const GroupModal = ({ isOpen, toggle, group, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (group) {
            setName(group.name || '');
        }
    }, [group]);

    const handleSave = () => {
        const groupData = {
            ...group,
            name
        };

        if (group && group.id) {
            axios.put(`http://localhost:5000/groups/${group.id}`, groupData)
                .then(() => {
                    onSave();
                    setName('');
                    toggle();
                })
                .catch(error => {
                    console.error('Error updating group:', error);
                });
        } else {
            axios.post('http://localhost:5000/groups', groupData)
                .then(() => {
                    onSave();
                    setName('');
                    toggle();
                })
                .catch(error => {
                    console.error('Error creating group:', error);
                });
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="group-modal">
            <ModalHeader toggle={toggle}>{group && group.id ? 'Edit Group' : 'New Group'}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="groupName">Group Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="groupName"
                            placeholder="Enter group name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>
                    {group && group.id ? 'Update' : 'Create'}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default GroupModal;
