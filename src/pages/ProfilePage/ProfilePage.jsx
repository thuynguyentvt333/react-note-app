import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import UpdateProfileModal from './UpdateProfileModal';
import ImageModal from './ImageModal';
import './ProfilePage.scss';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [account, setAccount] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const fetchAccountInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/accounts/${user.id}`);
            setAccount(response.data);
        } catch (error) {
            console.error('Failed to fetch account info', error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchAccountInfo();
        }
    }, [user]);

    const toggleUpdateModal = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen);
    };

    const toggleImageModal = () => {
        setIsImageModalOpen(!isImageModalOpen);
    };

    if (!account) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <h4>Profile Information</h4>
            <div className="profile-card">
                <div className="profile-image" onClick={toggleImageModal} style={{ cursor: 'pointer' }}>
                    <img
                        src={account.avatar || '/default-avatar.png'}
                        alt="User Avatar"
                    />
                </div>
                <div className="profile-details">
                    <div className="detail-item">
                        <span className="label">Username:</span>
                        <span className="value">{account.username}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Email:</span>
                        <span className="value">{account.email}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Gender:</span>
                        <span className="value">{account.gender || 'Not specified'}</span>
                    </div>
                    <button className="update-button" onClick={toggleUpdateModal}>Update Profile</button>
                </div>
            </div>
            <UpdateProfileModal
                isOpen={isUpdateModalOpen}
                toggle={toggleUpdateModal}
                account={account}
                setAccount={setAccount}
                refreshAccountInfo={fetchAccountInfo}
            />
            <ImageModal
                isOpen={isImageModalOpen}
                toggle={toggleImageModal}
                imageSrc={account.avatar || '/'}
            />
        </div>
    );
};

export default ProfilePage;
