import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import { loginUser } from '../services/api';


function Login({ isOpen, onClose, onSubmit }) {
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        onSubmit(loginData);
        onClose();

        // Check credentials against loginUser
        const user = loginUser.find(u => 
            u.email === loginData.email && 
            u.password === loginData.password
        );

        if (user) {
            try {
                await onSubmit(user);
                onClose();
            } catch {
                setError('Login failed. Please try again.');
            }
        } else {
            setError('Invalid email or password');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Login;