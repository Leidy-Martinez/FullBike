import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors'
});

// Customer API
export const createCustomer = async (customerData) => {
    return api.post('/customers', customerData);
};

export const loginCustomer = async (loginData) => {
    return api.post('/customers/login', loginData);
};

export const getAllCustomers = async () => {
    return api.get('/customers');
};

export const getCustomerById = async (id) => {
    return api.get(`/customers/${id}`);
};

export const updateCustomer = async (id, customerData) => {
    return api.patch(`/customers/${id}`, customerData);
};

export const deleteCustomer = async (id) => {
    return api.delete(`/customers/${id}`);
};

export const assignServiceToCustomer = async (id, serviceName) => {
    return api.post(`/customers/${id}/service`, { name: serviceName });
};


// Service API
export const getAllServices = async () => {
    return api.get('/services');
};

export const getServiceById = async (id) => {
    return api.get(`/services/${id}`);
};

export const createService = async (serviceData) => {
    return api.post('/services', serviceData);
};

export const updateService = async (name, serviceData) => {
    return api.patch(`/services/${name}`, serviceData);
};

export const deleteService = async (id) => {
    return api.delete(`/services/${id}`);
};

// Mechanic API
export const createMechanic = async (mechanicData) => {
    return api.post('/mechanics', mechanicData);
};

export const bulkCreateMechanics = async (mechanicsData) => {
    return api.post('/mechanics/bulk', mechanicsData);
};

export const getAllMechanics = async () => {
    return api.get('/mechanics');
};

export const getMechanicById = async (id) => {
    return api.get(`/mechanics/${id}`);
};

export const updateMechanic = async (id, mechanicData) => {
    return api.patch(`/mechanics/${id}`, mechanicData);
};

export const deleteMechanic = async (id) => {
    return api.delete(`/mechanics/${id}`);
};

export const getMechanicAppointments = async (id) => {
    return api.get(`/mechanics/${id}/appointments`);
};

// Appointment API
export const createAppointment = async (appointmentData) => {
    return api.post('/appointments', appointmentData);
};

export const getAllAppointments = async () => {
    return api.get('/appointments');
};

export const getAppointmentById = async (id) => {
    return api.get(`/appointments/${id}`);
};

export const assignAppointmentToCustomer = async (id, appointmentData) => {
    return api.post(`/appointments/${id}/schedule`, appointmentData);
};

export const updateAppointment = async (id, appointmentData) => {
    return api.patch(`/appointments/${id}`, appointmentData);
};

export const deleteAppointment = async (id) => {
    return api.delete(`/appointments/${id}`);
};

export default api;