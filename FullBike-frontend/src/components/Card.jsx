import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({ children, className }) {
    return (
        <div className={`card ${className || ''}`}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Card;
