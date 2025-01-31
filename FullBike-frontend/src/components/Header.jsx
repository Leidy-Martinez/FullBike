import { useState } from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import '../styles/Header.css';
import Login from './Login';

function Header({ onAddCustomer , onLogin }) {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="nav-container main">
                    <button className="nav-button" onClick={() => console.log('Who We Are')}>
                        Who We Are
                    </button>
                    <button className="nav-button" onClick={() => console.log('Services')}>
                        Services
                    </button>
                    <button className="nav-button" onClick={() => console.log('Gallery')}>
                        Gallery
                    </button>
                </div>
                <div className="nav-container auth">
                    <button className="nav-button" onClick={() => setIsLoginOpen(true)}>
                        Login
                    </button>
                    <button className="nav-button" onClick={() => setIsSignUpOpen(true)}>
                        Sign Up
                    </button>
                </div>
            </header>
            <SignUp 
                isOpen={isSignUpOpen} 
                onClose={() => setIsSignUpOpen(false)}
                onSubmit={onAddCustomer}
            />
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSubmit={onLogin}
            ></Login>
        </>
    );
}
Header.propTypes = {
    onAddCustomer: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default Header;