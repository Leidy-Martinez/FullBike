import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllServices, assignServiceToCustomer } from '../services/api';
import Card from './Card';
import CardContent from './CardContent';
import Calendar from './Calendar';
import '../styles/ServiceSelection.css';
import '../styles/Card.css';

function ServiceSelection({ onServiceSelect }) {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getAllServices();
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleSelect = async (service) => {
        console.log('Selected service:', service);
        const storedCustomer = JSON.parse(localStorage.getItem('customer'));
        console.log('Stored customer:', storedCustomer);
        if (storedCustomer && service.name) {
            try {
                const serviceName = service.name.toLowerCase();
                console.log('Service Name:', serviceName);
                const response = await assignServiceToCustomer(storedCustomer.id, serviceName);
                setSelectedService(service);
                console.log('Customer ID:', storedCustomer.id);
                if (!onServiceSelect) {
                    onServiceSelect(service);
                    console.log('Service assigned to customer:', response.data);
                }
            } catch (error) {
                console.error("Error assigning service to customer:", error);
            }
        } else {
            console.error("Customer not found or service name is undefined");
        }
    };

    const handleAppointmentClick = () => {
        setShowCalendar(true);
    };

    return (
        <div className="service-container">
            <div className="service-selection">
                {services.map((service) => (
                    <Card key={service.id} className="service-card">
                        <CardContent
                            title={service.name}
                            description={service.description}
                            price={service.price}
                            isSelected={selectedService?.id === service.id}
                            onClick={() => handleSelect(service)}
                        />
                    </Card>
                ))}
            </div>
            <button className="appointment-button custom-button" onClick={handleAppointmentClick}>
                Book Appointment
            </button>
            {showCalendar && <Calendar selectedService={selectedService} />}
        </div>
    );
}

ServiceSelection.propTypes = {
    onServiceSelect: PropTypes.func,
};

export default ServiceSelection;