import { FaFacebook, FaInstagram, FaStrava } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="social-icon" />
                </a>
                <a href="https://instagram.com/fullbike.pr" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon" />
                </a>
                <a href="https://www.strava.com/athletes/102907093" target="_blank" rel="noopener noreferrer">
                    <FaStrava className="social-icon" />
                </a>
            </div>
            <a href="/contact" className="contact-link">Contact Us</a>
        </footer>
    );
}

export default Footer;
