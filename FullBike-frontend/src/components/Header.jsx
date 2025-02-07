import { useState } from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import Login from './Login';
import '../styles/Header.css';

function Header({ onToggleServiceSelection, onToggleGallery, onLogin, onSignup, customer, onLogout }) {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="nav-container main">
                    <button className="nav-button" onClick={() => console.log('Who We Are')}>
                        Who We Are
                    </button>
                    <button className="nav-button" onClick={onToggleServiceSelection}>
                        Services
                    </button>
                    <button className="nav-button" onClick={onToggleGallery}>
                        Gallery
                    </button>
                </div>
                <div className="nav-container auth">
                    {!customer ? (
                        <>
                            <button className="nav-button" onClick={() => setIsLoginOpen(true)}>
                                Login
                            </button>
                            <button className="nav-button" onClick={() => setIsSignUpOpen(true)}>
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="nav-text">Welcome, {customer.name || "Customer"}</span>
                            <button className="nav-button" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </header>
            <SignUp
                isOpen={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                onSubmit={onSignup}
            />
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={onLogin}
            />
        </>
    );
}

Header.propTypes = {
    onToggleServiceSelection: PropTypes.func.isRequired,
    onToggleGallery: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
    customer: PropTypes.object,
    onLogout: PropTypes.func.isRequired
};

export default Header;