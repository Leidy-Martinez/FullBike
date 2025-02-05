import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CardContent from './CardContent';
import '../styles/ServiceSelection.css';
import '../styles/Card.css';

const services = [
    {
        id: 1,
        name: 'Bronze',
        description: 'Basic bike maintenance',
        price: 20,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Silver',
        description: 'Standard bike service',
        price: 40,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Gold',
        description: 'Premium bike overhaul',
        price: 60,
        image: 'https://via.placeholder.com/150',
    },
];

export default function ServiceSelection({ onServiceSelect }) {
    const [selectedService, setSelectedService] = useState(null);

    const handleSelect = (service) => {
        setSelectedService(service);
        onServiceSelect(service);
    };

    return (
        <div className="main-content service-selection"> 
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
    );
}

ServiceSelection.propTypes = {
    onServiceSelect: PropTypes.func.isRequired,
};

