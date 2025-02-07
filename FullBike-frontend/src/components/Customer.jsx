import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCustomerById } from '../services/api';
import '../styles/Customer.css';

function Customer({ customerId }) {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getCustomerById(customerId);
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customer:", error);
                setError("Failed to load customer data");
            }
        };

        fetchCustomer();
    }, [customerId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!customer) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="customer-info">
            <h2>{customer.name} Profile</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
        </div>
    );
}

Customer.propTypes = {
    customerId: PropTypes.number.isRequired,
};

export default Customer;