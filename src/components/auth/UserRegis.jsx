import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function UserRegis() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER',  // Setting the default role to 'USER'
        city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log formData to confirm it's being submitted correctly
        console.log("Submitting form data:", formData);
    
        try {
            // Submit the form data
            const response = await UserService.userreg(formData);
            console.log('User registered successfully:', response);
    
            // Display success message
            alert('User registered successfully');
            
            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'USER', // Resetting the role to 'USER'
                city: ''
            });
    
            // Uncomment if you want to navigate to another page after registration
            navigate('/');  // Redirect to login page after registration
    
        } catch (error) {
            console.log("Form data at error:", formData);
            console.error('Error registering user:', error);
    
            // Check if the error is due to a 403 status
            if (error.response && error.response.status === 403) {
                alert('Access Denied: You might not have the necessary permissions.');
            } else if (error.response && error.response.status === 400) {
                alert('Bad Request: Check your input fields.');
            } else {
                // Default error message for other scenarios
                alert('Email duplicated!');
            }
        }
    };
    

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value='USER' onChange={handleInputChange} placeholder="Enter your role" required disabled/>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default UserRegis;
