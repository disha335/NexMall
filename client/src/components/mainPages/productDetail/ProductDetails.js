import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

const ProductDetails = () => {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productApi.products;
    const [isLogged, setIsLogged] = state.userApi.isLogged
    const addCart = state.userApi.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(()=>{
        if(params){
            products.forEach(product => {
                if(product._id === params.id){
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products])

    if(detailProduct.length === 0) return null;
    return (
        <div className='detail'>
            <img src={detailProduct.images.url}  alt="" />

            <div className='box-detail'>
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>{detailProduct.product_id}</h6>
                </div>

                <span>Rs.{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p className="content-small">{detailProduct.content}</p>
                {isLogged? <Link className='buy_now'  to={`/payment/${detailProduct.price}`}>Buy Now</Link>:
                <Link className='buy_now' onClick={()=>alert('Please log in to continue')}>Buy Now</Link>
                }
                
                <Link className='cart' onClick={()=>addCart(detailProduct)}>Add To Cart</Link>
            </div>
        </div>
    )
}

export default ProductDetails
