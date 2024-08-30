import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import UserService from '../service/UserService';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
    // const isAuthenticated = UserService.isAuthenticated();
    // const isAdmin = UserService.isAdmin();
    
    const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);


    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            logout();
            
        }
    };


    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Project</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;