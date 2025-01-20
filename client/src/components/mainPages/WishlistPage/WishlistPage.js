import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './wishlist.css'
import { GlobalState } from '../../../GlobalState';

const WishlistPage = () => {
  const state = useContext(GlobalState)
  const [wishlist, setWishlist] = useState([]);
  const addCart = state.userApi.addCart;

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className='wishlist_page'>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className='empty-wishlist'>
          <h2 className='empty-wishlist'>You have no items wishlisted </h2>
          <Link className='browse_link' to='/'>Browse Products</Link>
        </div>
      ) : (
        <div className='wishlist_items'>
          {wishlist.map((product) => (
            <div key={product._id} className='wishlist_card'>
              <Link to={`/detail/${product._id}`}>
                <img src={product.images.url} alt={product.title} />
              </Link>
              <div className='wishlist_details'>
                <Link to={`/detail/${product._id}`}><h2>{product.title.toUpperCase()}</h2></Link>
                <p>Price: Rs.{product.price}</p>
                <button id='wish_btn' onClick={() => removeFromWishlist(product._id)}>Remove</button>
                <button id='cart_btn' onClick={() => {addCart(product); removeFromWishlist(product._id)}}>Move to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
