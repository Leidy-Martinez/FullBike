import { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';


function App() {
  const [mockData, setMockData] = useState([]);

  // Fetch customers from the backend
  useEffect(() => {
    api.get('/customers')
      .then((response) => {
        console.log('Customers loaded:', response.data);
        setMockData(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);
  
  // Handle adding a new Customer/signup
  const addNewCustomer = async (customerData) => {
    try {
        const response = await api.post('/customers', customerData);
        setMockData(prev => [...prev, response.data]);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  };

  //Handle Login
  const handleLogin = async (loginData) => {
    try {
        const response = await api.post('/login', loginData);
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  };

  return (
    <div className="app-container">
      <Header onAddCustomer={addNewCustomer} onLogin={handleLogin} /> 
      <section className='main-content'>
        
      </section>
      <Footer />
    </div>
  );
}

export default App;

