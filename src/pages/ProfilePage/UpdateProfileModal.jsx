import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import './UpdateProfileModal.scss';

const UpdateProfileModal = ({ isOpen, toggle, account, setAccount, refreshAccountInfo }) => {
    const [updatedAccount, setUpdatedAccount] = useState({
        username: account.username,
        email: account.email,
        gender: account.gender,
        avatar: account.avatar,
        password: account.password,
    });
    const [avatarPreview, setAvatarPreview] = useState(account.avatar || '');

    useEffect(() => {
        setUpdatedAccount((prevAccount) => ({
            ...prevAccount,
            password: account.password,
        }));
    }, [account]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAccount({
            ...updatedAccount,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setUpdatedAccount({
                    ...updatedAccount,
                    avatar: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/accounts/${account.id}`, updatedAccount);
            refreshAccountInfo();
            toggle();
        } catch (error) {
            console.error('Failed to update account info', error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="update-profile-modal">
            <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={updatedAccount.username}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={updatedAccount.email}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input
                            type="text"
                            name="gender"
                            id="gender"
                            value={updatedAccount.gender}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={handleFileChange}
                        />
                        {avatarPreview && (
                            <div className="avatar-preview">
                                <img src={avatarPreview} alt="Avatar Preview" />
                            </div>
                        )}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default UpdateProfileModal;
