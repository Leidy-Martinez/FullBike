import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllAppointments, assignAppointmentToCustomer } from '../services/api';
import Modal from "react-modal";
import '../styles/Calendar.css';

Modal.setAppElement("#root");

export default function Calendar({ selectedService }) {
    const [appointments, setAppointments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Fetch appointments from the backend
        getAllAppointments()
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    // Handle scheduling a new appointment
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setModalIsOpen(true);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleScheduleAppointment = async () => {
        if (selectedTime) {
            const newAppointment = {
                date: `${selectedDate}T${selectedTime}:00Z`,
            };
            console.log("Appointment in Local Date",newAppointment.toLocaleString());

            try {
                // Save to backend
                const storedCustomer = JSON.parse(localStorage.getItem('customer'));
                const response = await assignAppointmentToCustomer(storedCustomer.id ,newAppointment);
                setAppointments([...appointments, response.data]);
                setModalIsOpen(false);
                console.log('Appointment scheduled:', response.data);
                alert("Appointment scheduled successfully");
            } catch (error) {
                console.error("Error creating appointment:", error);
            }
        }
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={appointments}
                dateClick={handleDateClick}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Schedule Appointment"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Schedule Appointment</h2>
                <p>Selected Date: {selectedDate}</p>
                <p>Selected Service: {selectedService?.name}</p>
                <label>
                    Select Time:
                    <input type="time" value={selectedTime} onChange={handleTimeChange} />
                </label>
                <button onClick={handleScheduleAppointment}>Schedule</button>
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
}

Calendar.propTypes = {
    // customerId: PropTypes.number.isRequired,
    selectedService: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};


