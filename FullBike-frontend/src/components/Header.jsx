import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <nav className="nav-container">
                <button className="nav-button" onClick={() => console.log('Who We Are')}>
                    Who We Are
                </button>
                <button className="nav-button" onClick={() => console.log('Services')}>
                    Services
                </button>
                <button className="nav-button" onClick={() => console.log('Gallery')}>
                    Gallery
                </button>
            </nav>
        </header>
    );
}

export default Header;