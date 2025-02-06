import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceSelection from './components/ServiceSelection';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Customer from './components/Customer';
import Gallery from './components/Gallery';
import { loginCustomer, getAllCustomers } from './services/api';
import './styles/App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        console.log('Customers loaded:', response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Failed to load customers");
      });
  }, []);

  // Handle Login
  const handleLogin = async (loginData) => {
    try {
      const response = await loginCustomer(loginData);
      setCustomer(response.data);
      setError(null);
      setIsLoginOpen(false); // Close login modal on successful login
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      setError("Login failed");
      throw error;
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCustomer(null);
  };

  const handleToggleServiceSelection = () => {
    setShowServiceSelection(!showServiceSelection);
  };

  const handleServiceSelect = (service) => {
    console.log('Selected service:', service);
    setSelectedService(service);
    setShowServiceSelection(false);
  };

  const handleToggleGallery = () => {
    setShowGallery(!showGallery);
    setShowServiceSelection(false);
  };

  return (
    <div className="App">
      <Header 
        onToggleServiceSelection={handleToggleServiceSelection} 
        onLogout={handleLogout} 
        customer={customer} 
        onLogin={() => setIsLoginOpen(true)}
        onSignup={() => setIsSignUpOpen(true)}
        onToggleGallery={handleToggleGallery}
      />
      <main className="main-content">
        {customer ? (
          <>
            <Customer customer={customer} />
            {showServiceSelection && (
              <ServiceSelection onServiceSelect={handleServiceSelect} />
            )}
            {selectedService && (
              <div className="selected-service">
                <h2>Selected Service</h2>
                <p>Name: {selectedService.name}</p>
                <p>Description: {selectedService.description}</p>
                <p>Price: ${selectedService.price}</p>
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </>
        ) : (
          <>
            {showServiceSelection && (
              <ServiceSelection onServiceSelect={handleServiceSelect} />
            )}
            <Login onSubmit={handleLogin} onClose={() => setIsLoginOpen(false)} isOpen={isLoginOpen} />
            <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
          </>
        )}
        {showGallery && <Gallery />}
      </main>
      <Footer />
    </div>
  );
}

export default App;