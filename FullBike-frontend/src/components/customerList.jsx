import PropTypes from 'prop-types';

function CustomersList({ customers }) {
    if (customers.length === 0) {
        return <p>No customers found</p>;
    }

    return (
        <ul className="customers-list">
            {customers.map(customer => (
                <li key={customer.id}>
                    {customer.name}
                </li>
            ))}
        </ul>
    );
}

CustomersList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string
    })).isRequired
};

export default CustomersList;