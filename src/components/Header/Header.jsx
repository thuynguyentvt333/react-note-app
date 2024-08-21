import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import UserDropdown from '../UserDropdown/UserDropdown';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const breadcrumbPaths = location.pathname.split('/').filter(path => path && path !== 'app');
    const breadcrumb = breadcrumbPaths.map((path, index) => {
        const routeTo = `/${breadcrumbPaths.slice(0, index + 1).join('/')}`;
        return (
            <span key={routeTo}>
                <Link to={routeTo}>{path.replace(/-/g, ' ')}</Link>
                {index < breadcrumbPaths.length - 1 && ' / '}
            </span>
        );
    });

    return (
        <header className="header">
            <div className='header-left'>
                <div className="nav-icons">
                    <FaArrowLeft onClick={() => navigate(-1)} aria-label="Go Back" className='icon-arrow' />
                    <FaArrowRight onClick={() => navigate(1)} aria-label="Go Forward" className='icon-arrow' />
                </div>
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    {breadcrumbPaths.length > 0 && ' / '}
                    {breadcrumb}
                </div>
            </div>
            <UserDropdown />
        </header>
    );
};

export default Header;
