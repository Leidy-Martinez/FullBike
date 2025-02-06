import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import { loginCustomer } from '../services/api';

function Login({ isOpen, onClose}) {
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await loginCustomer(loginData);
            console.log('Login successful:', response.data);
            onClose();
        } catch (error) {
            console.error("Error logging in:", error);
            setError('Login failed. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Login;