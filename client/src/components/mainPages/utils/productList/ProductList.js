import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import EditProductModal from './EditProductModal.js';
import { FaHeart } from 'react-icons/fa';
import api from '../../../../api.js';


const ProductList = ({ product, isAdmin }) => {
  const state = useContext(GlobalState);
  const addCart = state.userApi.addCart;
  const [isLogged, setIsLogged] = state.userApi.isLogged
  const [showEditModal, setShowEditModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
 

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isInWishlist = wishlist.some((item) => item._id === product._id);
    setIsWishlisted(isInWishlist);
  }, [product._id]);

  const handleUpdate = () => {
    console.log('Product Updated');
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        alert('Product Deleted Successfully!');
      } catch (err) {
        console.error('Error:', err.response || err.message);
        alert(err.response?.data?.msg || 'Failed to delete product');
      }
    }
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!isWishlisted) {
      // Add to wishlist
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    } else {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    }
  };

  return (
    <div className='product_card'>
      {isAdmin}

      <Link to={`/detail/${product._id}`}>
        <img src={product.images.url} alt='Product' />
      </Link>

      { isAdmin ? '': (
        <>
        {isLogged ? <div className='wishlist_icon' onClick={toggleWishlist}>
            <FaHeart color={isWishlisted ? 'red' : 'grey'} size={24} />
        </div> :<div className='wishlist_icon' onClick={()=>alert('Please log in to continue')}>
            <FaHeart color={isWishlisted ? 'red' : 'grey'} size={24} />
        </div> }
        </>)}

      <div className='product_box'>
        <Link to={`/detail/${product._id}`}>
          <h2 title={product.title}>{product.title}</h2>
        </Link>
        <Link to={`/detail/${product._id}`}>
          <span>Rs.{product.price}</span>
        </Link>
        <Link to={`/detail/${product._id}`}>
          <p>{product.description}</p>
        </Link>
      </div>
      <div className='row_btn'>
        {isAdmin ? (
          <>
            <Link id='btn_edit' onClick={() => setShowEditModal(true)}>
              Edit
            </Link>
            <Link id='btn_delete' onClick={() => deleteProduct(product._id)}>
              Delete
            </Link>
          </>
        ) : (
          <>
          {isLogged ? <Link id='btn_buy' to={`/payment/${product.price}`} >Buy Now</Link> :
          <Link id='btn_buy' onClick={()=>alert('Please log in to continue')}>Buy Now</Link>}
            
            <Link id='btn_cart' onClick={() => addCart(product)}>Add To Cart</Link>
          </>
        )}
      </div>

      {showEditModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductList;
