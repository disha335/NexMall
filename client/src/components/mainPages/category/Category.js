import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import './category.css'
import api from '../../../api';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const state = useContext(GlobalState);
    // console.log(state.token[0])
    const token = state.token[0]

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await api.get('/api/category');
                setCategories(res.data); 
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        getCategories();
    }, []); 

    const addCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            alert("Category name cannot be empty!");
            return;
        }
    
        try {
            const res = await api.post("/api/category",{ name: newCategory }, 
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            setCategories([...categories, res.data]);
            alert("Category added successfully !")
            setNewCategory(""); 
            fetchCategories()
        } catch (err) {
            console.error("Error:", err.response || err.message);
            alert(err.response?.data?.msg || "Failed to add category");
        }
    };

    const fetchCategories = async () => {
        const { data } = await api.get('/api/category');
        setCategories(data);
    };


    const editCtgry = async(id, updatedName) => {
        if(!updatedName){
            alert('Category cannot be empty ..')
            return
        }
        try{
            await api.put(`/api/category/${id}`, {name: updatedName}, {
                headers:{
                    "Authorization": `${token}`,
                }
            });
            alert("Category updated successfully!")
            fetchCategories()
        }catch(err){
            console.error("Error:", err.response || err.message);
            alert(err.response.data.msg || "Failed to add category");
        }
    }

    const deleteCtgry = async(id) => {
        if (window.confirm("Are you sure you want to delete this category?")){
            try{
                await api.delete(`/api/category/${id}`,{
                    headers:{
                        Authorization: `${token}`,
                    }
                })
                alert("Category Deleted successfully !!")
                fetchCategories()
            } catch(err){
                console.error("Error:", err.response || err.message);
                alert(err.response.data.msg || "Failed to add category");
            }
        }
    }
    

    return (
        <div className='categories-container'>
            <h3 className='sec-title'>All Categories:</h3>
            <ul className="categories-list">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index} className='category-item'>
                            <span className="category-name">{category.name}</span>
                            <div className="category-actions">
                                <button className="edit-btn"
                                onClick={()=>{
                                    const updatedName = prompt("Enter updated category name:", category.name);
                                    if(updatedName !== null){
                                        editCtgry(category._id, updatedName)
                                    }
                                }}>Edit</button>
                                <button className="delete-btn" onClick={()=>deleteCtgry(category._id)}>Delete</button>
                            </div>
                         </li> 
                    ))
                ) : (
                    <p className="no-categories-message">No categories available.</p>
                )}
            </ul>

            <h4 className="form-title">Add a new category ..</h4>
            <form onSubmit={addCategory} className="add-category-form">
            <div className="input-group">
                <input type="text" placeholder="Enter category name" className="category-input" onChange={(e) => setNewCategory(e.target.value)} required />
                <button type="submit" className="add-category-btn">Add</button>
            </div>
            </form>
        </div>
    );
};

export default Category;
