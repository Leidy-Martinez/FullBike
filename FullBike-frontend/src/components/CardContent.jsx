import PropTypes from 'prop-types';
import '../styles/Card.css';

function CardContent({ title, description, price, isSelected, onClick }) {
    return (
        <div
            className={"card-content"}
        >
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <p className="card-price">${price}</p>
            <button className="select-button" onClick={onClick}>
                {isSelected ? 'Selected' : 'Select'}
            </button>
        </div>
    );
}

CardContent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
};

export default CardContent;
