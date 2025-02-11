import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllServices, assignServiceToCustomer } from '../services/api';
import Card from './Card';
import CardContent from './CardContent';
import Calendar from './Calendar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ServiceSelection.css';
import '../styles/Card.css';
import '../styles/ServiceSelection.css';

function ServiceSelection({ onServiceSelect }) {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const serviceDescriptions = {
        bronze: [
            "Brake and gear adjustments for smooth operation.",
            "Chain lubrication and drivetrain inspection.",
            "Tire pressure check and inflation.",
            "Basic safety check of bolts and components.",
            "Light cleaning of frame and key components."
        ],
        silver: [
            "Includes all Bronze Package services.",
            "Full drivetrain cleaning and lubrication.",
            "Wheel truing to correct minor wobbles.",
            "Bottom bracket and headset inspection.",
            "Brake pad wear check and minor alignment."
        ],
        gold: [
            "Includes all Silver Package services.",
            "Complete bike disassembly and deep cleaning.",
            "Bearing lubrication and adjustments for hubs, bottom bracket, and headset.",
            "Brake and gear cable replacement (if needed).",
            "Full safety inspection with detailed performance report."
        ]
    };
    

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getAllServices();
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
                toast.error("Failed to load services. Please try again.");
            }
        };

        fetchServices();
    }, []);

    const handleSelect = async (service) => {
        // console.log('Selected service:', service);
        const storedCustomer = JSON.parse(localStorage.getItem('customer'));
        // console.log('Stored customer:', storedCustomer);

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
                
                toast.success(`Successfully selected ${service.name}!`);
            } catch (error) {
                console.error("Error assigning service to customer:", error);
                toast.error("Failed to assign service. Please try again.");
            }
        } else {
            toast.error("Please log in to select a service.");
        }
    };

    const handleAppointmentClick = () => {
        if (!selectedService) {
            toast.error("Please select a service first.");
            return;
        }
        setShowCalendar(true);
    };

    return (
        <div className="service-container">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="service-selection">
                <h1>Full-Bike Services</h1>
                {services.map((service) => (
                    <Card key={service.id} className="service-card">
                        <CardContent
                            title={service.name.toUpperCase()}
                            description={serviceDescriptions[service.name.toLowerCase()] || [service.description]}
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
