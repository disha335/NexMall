import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from 'react-icons/md';
import { MdAddShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation, NavLink } from "react-router-dom"
import { GlobalState } from '../../GlobalState';
import { useContext } from 'react';
import Dashboard from '../dashboard/Dashboard';
import Features from '../mainPages/utils/features/Features';
import api from '../../api';


const Header = () => {

    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userApi.isLogged
    const [isAdmin, setIsAdmin] = state.userApi.isAdmin
    const [cart, setCart] = state.userApi.cart
    const { pathname } = useLocation();
    const isAllPage = pathname === '/'

    const logOutUser = async() => {
        await api.get('/user/logout')
        localStorage.clear()

        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = () => {
        return (
            <>
                <li><NavLink to='/create_product' className={({ isActive }) => (isActive ? 'active-link' : '')}>Create Product</NavLink></li>
                <li><NavLink to='/category' className={({ isActive }) => (isActive ? 'active-link' : '')}>Categories</NavLink></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to='/' className='logout_btn' onClick={logOutUser}>Log Out</Link></li>
            </>
        )
    }

    const ShopCategories = () => {
        return(
            <>
                <li><NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : '')}
                > {isAdmin ? '': 'All'} </NavLink></li>
                <li><NavLink to='/women' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Women'} </NavLink></li>
                <li><NavLink to='/men' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Men'} </NavLink></li>
                <li><NavLink to='/kids' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Kids'} </NavLink></li>
                <li><NavLink to='/home' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Home'} </NavLink></li>
                <li><NavLink to='/electronics' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Electronics'} </NavLink></li>
                <li><NavLink to='/beauty' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Beauty'} </NavLink></li>
                <li><NavLink to='/sports' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? '': 'Sports'} </NavLink></li>
            </>
        )
    }

    return (
        <header>
        <div className='menu'>
                <MdOutlineMenu size={30} />
        </div>
            
        <div className='logo'>
            <h1>
                <span className='logo-container'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKXlyn9O0WfT4b7URDD0ROSJ2WwY97an4vg&s'
                    width={40} height={40} 
                    style = {{filter: 'none'}}/>
                <NavLink style={{color: 'black'}} to='/'> {isAdmin ? 'Admin': 'NexMall'} </NavLink>
                </span>
            </h1>
        </div>

        <ul>
            <li><NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : '')}> {isAdmin ? 'Products': ''} </NavLink></li>

            {isAdmin ? '': ShopCategories()}
            

            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li className='login_btn'><Link to='/login'>Login</Link></li>
            }

            <li><MdClose className='menu' size={30} /></li>
        </ul>

        {isAdmin ? '' : <div className='cart-icon'>
            <span>{cart.length}</span>
            <NavLink to='/cart' className={({ isActive }) => (isActive ? 'active-link' : '')}><MdAddShoppingCart size={30}/></NavLink>
        </div>
        }

        {isAdmin ? '' : 
            <div className='cart-icon'>
                <NavLink to='/wishlist' className={({ isActive }) => (isActive ? 'active-link' : '')}><CiHeart size={30}/></NavLink>
            </div>
        }

        {
            isAdmin? '':<div className="promo-slider">
            <div className="promo-slide">🔥 Free Shipping on Orders Above Rs. 999</div>
            <div className="promo-slide">🎉 50% Off for new users </div>
            <div className="promo-slide">🛍️ New Arrivals - Shop the Latest Trends!</div>
        </div>
        }

        {isAllPage ? <>''
        {
            isAdmin ? '' : <> <Dashboard /> <Features /> </>
        }: </>: '' }
        
    </header>
    )
}

export default Header
