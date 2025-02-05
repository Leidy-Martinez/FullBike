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
                    {customer.email}
                    {customer.phoneNumber}
                    {customer.password}
                </li>
            ))}
        </ul>
    );
}

CustomersList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
    })).isRequired
};

export default CustomersList;
