import PropTypes from 'prop-types';


function Customer({ customer }) {
    if (!customer) {
        return null;
    }

    return (
        <div className="customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
        </div>
    );
}

Customer.propTypes = {
    customer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
};

export default Customer;