import { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch customers from database
  useEffect(() => {
    api.get('/customers')
      .then((response) => {
        console.log('Customers loaded:', response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Failed to load customers");
      });
  }, []);
  
  // Add new customer to database
  const addNewCustomer = async (customerData) => {
    try {
      const response = await api.post('/customers', customerData);
      setCustomers(prev => [...prev, response.data]);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("Add customer error:", error);
      setError("Failed to add customer");
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
    <div className="App">
      <Header onAddCustomer={addNewCustomer} onLogin={handleLogin} />
      <section className='main-content'>
        {error && <p className="error">{error}</p>}
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default App;

