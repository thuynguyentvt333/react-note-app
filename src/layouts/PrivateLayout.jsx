import React from 'react';
import './PrivateLayout.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PrivateLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PrivateLayout;