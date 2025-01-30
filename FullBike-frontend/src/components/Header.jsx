import { useState } from 'react';
import SignUp from './SignUp';
import '../styles/Header.css';

function Header({ onAddCustomer }) {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
                    <button className="nav-button" onClick={() => console.log('Login')}>
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
        </>
    );
}

export default Header;