import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userApi.cart;

  const handleDelete = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
  };

  const getTotal = () => {
    const subtotal = cart.reduce((total, product) => total + product.price, 0);
    // return subtotal < 999 ? (subtotal + 99).toFixed(2) : subtotal.toFixed(2);
    return parseInt(subtotal);
  };

  const getShippingMessage = () => {
    const subtotal = cart.reduce((total, product) => total + product.price, 0);
    return subtotal < 999 ? "Shipping charges of Rs.99 included at checkout" : "Free Shipping!";
  };
  
  return (
    <div className='cart-container'>
      <h1>Your Cart</h1>
      { cart.length === 0 ?(
        <div className='empty-cart'>
          <h2 className='empty-cart'>Your cart is empty</h2>
          <Link className='browse_link' to='/'>Browse Products</Link>
        </div>
        ) : (
          <>
          <div className='cart-items'>
            {cart.map((product) => (
              <div key={product._id} className='cart-item'>
                <img src={product.images.url} alt={product.title} />
                <div className='cart-details'>
                  <h2>{product.title}</h2>
                  <h6>Product ID: {product.product_id}</h6>
                  <p>{product.description}</p>
                  <span>Rs.{product.price}</span>
                  <button className='delete-btn' onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Total Amount: Rs.{getTotal()}</h2>
            <p className='shipping-message'>{getShippingMessage()}</p>
            <Link className='checkout-btn' to={`/payment/${getTotal()}`}>Proceed to Checkout</Link>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Cart
