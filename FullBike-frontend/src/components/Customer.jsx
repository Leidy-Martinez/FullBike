import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCustomerById, updateCustomer, getAllAppointments} from '../services/api';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Customer.css';

function Customer({ customerId }) {
    const [customer, setCustomer] = useState(null);
    const [customerAppointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ 
        name: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getCustomerById(customerId);
                setCustomer(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                });
            } catch (error) {
                console.error("Error fetching customer:", error);
                setError("Failed to load customer data");
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await getAllAppointments();
                const customerAppointments = response.data.filter(appointment => appointment.customerId === customerId);
                setAppointments(customerAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError("Failed to load appointments");
                toast.error("Failed to load appointments");
            }
        };

        fetchCustomer();
        fetchAppointments();
    }, [customerId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await updateCustomer(customerId, formData);
            setCustomer(response.data);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error("Error updating customer:", error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!customer) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="customer-info">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2>{isEditing? "Edit Profile" : `${customer.name}'s Profile`}</h2>
            {isEditing ? (
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
                    
                    <h3> Uncoming Appointments</h3>
                    <div>
                        {customerAppointments.map(appointment => (
                            <div key={appointment.id}>
                                <p><strong>Service:</strong> {appointment.Service.name}</p>
                                <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
                    
        </div>
    );
}

Customer.propTypes = {
    customerId: PropTypes.number.isRequired,
};

export default Customer;