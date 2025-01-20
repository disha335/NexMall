import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import './pay.css';

const Payment = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (params) {
      setPrice(params.price);
    }
  }, [params, products]);

  const getTotal = () => {
    const pr = parseInt(price);
    return pr < 999 ? pr + 99 : pr;
  };

  return (
    <div className="payment-container">
      <h1>Net Pay: {getTotal()}</h1>
      <p>Complete your payment to complete the order ..</p>
      <Link to='/pay-form' className="pay-btn">Pay Now</Link>
    </div>
  );
};

export default Payment;
