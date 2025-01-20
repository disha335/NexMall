import React, { useState } from "react";
import axios from "axios";
import "./editProductModal.css";

const EditProductModal = ({ product, onClose, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        description: product.description,
        content: product.content,
        category: product.category,
        images:{
            public_id: product.images.public_id,
            url: product.images.url
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "img_url") {
            setUpdatedProduct((prev) => ({
                ...prev,
                images: {
                    ...prev.images,
                    url: value, // Update the URL in the images object
                },
            }));
        }
        else{
            setUpdatedProduct((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${product._id}`, updatedProduct);
            alert("Product updated successfully!");
            onUpdate(); // Callback to refresh the product list
            onClose();  // Close the modal
        } catch (err) {
            console.error("Error:", err.response || err.message);
            alert(err.response?.data?.msg || "Failed to update product");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit} className="edit-product-form">

                <div className="form-group">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" id="product_id" name="product_id" value={updatedProduct.product_id} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={updatedProduct.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" value={updatedProduct.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" value={updatedProduct.price} onChange={handleChange} required />
                </div>

                
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input type="text" id="content" name="content" value={updatedProduct.content} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="img_url">Image URL</label>
                    <input type="text" id="img_url" name="img_url" value={updatedProduct.images.url} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id='category' name='category' className='category' value={updatedProduct.category} onChange={handleChange} required>
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



                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
