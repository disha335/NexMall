import React, { useState } from 'react'
import axios from 'axios';
import './createProduct.css'

const CreateProduct = () => {

    const initialProdState = {
        product_id: '',
        title: '',
        price: '',
        description: '',
        content: '',
        category: '',
        images: {
            public_id: 'testing/12',
            url: ''
        }
    }
    const [product, setProduct] = useState(initialProdState);

    const onChangeInput = e => {
        const { name, value } = e.target;

        // Special case for updating the `images.url` field
        if (name === 'img_url') {
            setProduct((prevState) => ({
                ...prevState,
                images: {
                    ...prevState.images,
                    url: value,
                },
            }));
        } else {
            setProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const createProduct = async e => {
        e.preventDefault();
        try{
            await axios.post('/api/products', {...product})
            alert('Product added successfully');
            setProduct(initialProdState);
        }
        catch(err){
            const errMsg = err.response.data.msg || "An error occured"
            alert(errMsg);
        }
      }

    return (
        <div className='create-product-container'>
        <h3>Create Product</h3>
        <form onSubmit={createProduct} className="create-product-form" >
            <div className='form-group'>
                <label htmlFor='product_id'>Product ID</label>
                <input type='text' id='product_id' name='product_id' placeholder='Enter product ID' value={product.id} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' name='title' placeholder='Enter Product title' value={product.title} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' name='description' placeholder='Enter desciption' value={product.description} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='price'>Price</label>
                <input type='text' id='price' name='price' placeholder='Enter product price' value={product.price} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='content'>Content</label>
                <input type='text' id='content' name='content' placeholder='Enter Product Content' value={product.content} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='img_url'>Image URL</label>
                <input type='text' id='img_url' name='img_url' placeholder='Enter image URL' value={product.images.url} onChange={onChangeInput} required/>
            </div>

            <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select id='category' name='category' className='category' value={product.category} onChange={onChangeInput} required>
                    <option value="" disabled>Select category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="home">Home</option>
                    <option value="electronics">Electronics</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                </select>
            </div>
            
            <button type='submit' className='submit-btn'>Create Product</button>
        </form>
        </div>
    );
}

export default CreateProduct
