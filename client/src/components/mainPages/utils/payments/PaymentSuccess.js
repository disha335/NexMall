import React from 'react';

const PaymentSuccess = () => {
  const containerStyles = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  };

  const headingStyles = {
    fontSize: '2rem',
    color: '#28a745', // Green color for success
    fontWeight: 'bold',
    marginBottom: '15px',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  };

  const paragraphStyles = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  };

  const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '20px',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Your Payment is Successful!</h1>
      <p style={paragraphStyles}>Your order will be shipped shortly.</p>
      <p style={paragraphStyles}>Thank you for your purchase.</p>
      <button style={buttonStyles} onClick={() => window.location.href = '/'}>
        Go to Homepage
      </button>
    </div>
  );
};

export default PaymentSuccess;
