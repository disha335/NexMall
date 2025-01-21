import React, { useState } from 'react';
import api from '../../../../api';

const PayForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Card number validation: Must be 16 characters long
    if (cardNumber.length !== 16) {
      setError('Card number must be 16 characters long.');
      return;
    }

    if (expMonth.length > 2) {
        setError('Enter valid month');
        return;
    }

    if (expYear.length != 4) {
        setError('Enter valid year');
        return;
    }

    if (cvc.length !=3){
        setError('Enter valid CVC ..');
        return
    }

    // Clear error if validation passes
    setError('');

    try {
      await api.post('/api/pay', { amount: 999 });
      window.location.href = '/success'
    } catch (err) {
      console.error("Error:", err.response || err.message);
      alert(err.response?.data?.msg || "Failed to process payment");
    }
  };

  const formStyles = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyles = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const headingStyles = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  const errorStyles = {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  };

  return (
    <div style={formStyles}>
      <h1 style={headingStyles}>Payment Form</h1>

      {error && <div style={errorStyles}>{error}</div>}

      <input
        type="text"
        name="number"
        placeholder="Card Number"
        required
        style={inputStyles}
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        name="exp_month"
        placeholder="Exp Month (MM)"
        required
        style={inputStyles}
        value={expMonth}
        onChange={(e) => setExpMonth(e.target.value)}
      />
      <input
        type="text"
        name="exp_year"
        placeholder="Exp Year (YYYY)"
        required
        style={inputStyles}
        value={expYear}
        onChange={(e) => setExpYear(e.target.value)}
      />
      <input
        type="text"
        name="cvc"
        placeholder="CVC"
        required
        style={inputStyles}
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
      />
      <button onClick={handlePayment} style={buttonStyles}>
        Pay
      </button>
    </div>
  );
};

export default PayForm;
