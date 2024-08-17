import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const breadcrumbPaths = location.pathname.split('/').filter(path => path && path !== 'app');
    const breadcrumb = breadcrumbPaths.map((path, index) => {
        const routeTo = `/${breadcrumbPaths.slice(0, index + 1).join('/')}`;
        return (
            <span key={routeTo}>
                <a href={routeTo}>{path.replace(/-/g, ' ')}</a>
                {index < breadcrumbPaths.length - 1 && ' / '}
            </span>
        );
    });

    return (
        <header className="header">
            <div className="nav-icons">
                <FaArrowLeft onClick={() => navigate(-1)} aria-label="Go Back" className='icon-arrow' />
                <FaArrowRight onClick={() => navigate(1)} aria-label="Go Forward" className='icon-arrow' />
            </div>
            <div className="breadcrumb">
                <a href="/">Home</a>
                {breadcrumbPaths.length > 0 && ' / '}
                {breadcrumb}
            </div>
        </header>
    );
};

export default Header;
