import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceSelection from './components/ServiceSelection';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Customer from './components/Customer';
import Gallery from './components/Gallery';
import Calendar from './components/Calendar';
import { getAllCustomers } from './services/api';
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCustomer, setShowCustomer] = useState(true);

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customer'));
    if (storedCustomer) {
      setCustomer(storedCustomer);
    }
  }, []);

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

  // Handle Logout
  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem('customer'); // Remove customer object from local storage
    setShowCustomer(false);
    setShowServiceSelection(false);
    setShowGallery(false);
    setShowCalendar(false);
  };

  const handleToggleServiceSelection = () => {
    setShowServiceSelection(!showServiceSelection);
    setShowGallery(false); // Ensure gallery is hidden when toggling service selection
    setShowCustomer(false); // Hide customer component
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    console.log('Selected service:', service);
    setShowServiceSelection(false);
  };

  const handleToggleGallery = () => {
    setShowGallery(!showGallery);
    setShowServiceSelection(false); // Ensure service selection is hidden when toggling gallery
    setShowCustomer(false); // Hide customer component
  };

  const handleCustomerLogged = (customer) => {
    setCustomer(customer);
    setIsLoginOpen(false);
    setShowCustomer(true); // Show customer component after login
    console.log('Login customer passed to app:', customer);
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
        {customer && showCustomer && (
          <Customer customerId={customer.id} />
        )}
        {customer && (
          <>
            {showServiceSelection && (
              <ServiceSelection onServiceSelect={handleServiceSelect} />
            )}
            {/* {selectedService && (
              <div className="selected-service">
                <h2>Selected Service</h2>
                <p>Name: {selectedService.name}</p>
                <p>Description: {selectedService.description}</p>
                <p>Price: ${selectedService.price}</p>
              </div>
            )} */}
            {showCalendar && <Calendar customerId={customer.id} selectedService={selectedService} />}
            {error && <div className="error-message">{error}</div>}
          </>
        )}
        {!customer && (
          <>
            {showServiceSelection && (
              <ServiceSelection onServiceSelect={handleServiceSelect} />
            )}
            <Login onLogin={handleCustomerLogged} onClose={() => setIsLoginOpen(false)} isOpen={isLoginOpen} />
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