import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllAppointments, createAppointment } from '../services/api';
import Modal from "react-modal";
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
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
            console.log(newAppointment);

            try {
                // Save to backend
                const response = await createAppointment(newAppointment);
                setAppointments([...appointments, response.data]);
                setModalIsOpen(false);
            } catch (error) {
                console.error("Error creating appointment:", error);
            }
        }
    };

    Calendar.propTypes = {
        selectedService: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
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


