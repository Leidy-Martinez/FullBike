import PropTypes from 'prop-types';
import '../styles/Login.css';
import { loginCustomer } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ isOpen, onClose, onLogin }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await loginCustomer(loginData);
            const customer = response.data.customer;
            localStorage.setItem('customer', JSON.stringify(customer)); // Save customer object in local storage
            onLogin(customer); // Pass customer object to the parent component
            console.log('Login successful:', customer);
            toast.success('Login successful! Redirecting...');
            setTimeout(() => {
                onClose();
                window.location.reload(); // Automatically refresh the page
            }, 2000);
        } catch {
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <ToastContainer position="top-right" autoClose={3000} />
            
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
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default Login;