import PropTypes from 'prop-types';
import '../styles/Card.css';

function CardContent({ title, description, price, isSelected, onClick }) {
    return (
        <div className={`card-content ${isSelected ? 'selected' : ''}`}>
            <h3 className="card-title">{title}</h3>
            {Array.isArray(description) ? (
                <ul className="card-description">
                    {description.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            ) : (
                <p className="card-description">{description}</p>
            )}
            <p className="card-price">${price}</p>
            <button className="select-button" onClick={onClick}>
                {isSelected ? 'Selected' : 'Select'}
            </button>
        </div>
    );
}

CardContent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    price: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
};

export default CardContent;
