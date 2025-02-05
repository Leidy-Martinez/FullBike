import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ children, onClick, className }) {
    return (
        <button className={`custom-button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};
