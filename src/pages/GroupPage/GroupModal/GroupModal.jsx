import React, { useState, useEffect, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import './GroupModal.scss';

const GroupModal = ({ isOpen, toggle, group, onSave }) => {
    const [name, setName] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (group) {
            setName(group.name || '');
        }
    }, [group]);

    const handleSave = async () => {
        const groupData = {
            ...group,
            name,
            account_id: parseInt(user.id, 10)
        };

        if (group && group.id) {
            // Cập nhật nhóm
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
            try {
                // Lấy danh sách nhóm hiện có để tìm id cao nhất
                const response = await axios.get('http://localhost:5000/groups');
                const existingGroups = response.data;
                const maxId = existingGroups.length > 0 ? Math.max(...existingGroups.map(g => g.id)) : 0;

                // Tạo nhóm mới với id mới
                const newGroup = { ...groupData, id: maxId + 1 };
                
                axios.post('http://localhost:5000/groups', newGroup)
                    .then(() => {
                        onSave();
                        setName('');
                        toggle();
                    })
                    .catch(error => {
                        console.error('Error creating group:', error);
                    });
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
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
};

export default GroupModal;
