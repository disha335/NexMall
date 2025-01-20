import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import ProductDetails from './productDetail/ProductDetails'
import CreateProduct from './productDetail/CreateProduct'
import Category from './category/Category'
import WishlistPage from './WishlistPage/WishlistPage'
import Payment from './utils/payments/Payment'
import PayForm from './utils/payments/PayForm'
import PaymentSuccess from './utils/payments/PaymentSuccess'

const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Product category=''/> }></Route>
          <Route path='/login' element={<Login/> }></Route>
          <Route path='/register' element={<Register/> }></Route>
          <Route path='/cart' element={<Cart/> }></Route>
          <Route path='/detail/:id' element={<ProductDetails/>} ></Route>
          <Route path='/wishlist' element={<WishlistPage/>}></Route>
          <Route path='/women' element={<Product category="women"/>}></Route>
          <Route path='/men' element={<Product category="men"/>}></Route>
          <Route path='/kids' element={<Product category="kids"/>}></Route>
          <Route path='/home' element={<Product category="home"/>}></Route>
          <Route path='/electronics' element={<Product category="electronics" />}></Route>
          <Route path='/beauty' element={<Product category="beauty" />}></Route>
          <Route path='/sports' element={<Product category="sports" />}></Route>
          <Route path='/create_product' element={<CreateProduct />}></Route>
          <Route path='/category' element={<Category />}></Route>
          <Route path='/payment/:price' element={<Payment />}></Route>
          <Route path='/pay-form' element={<PayForm/>}></Route>
          <Route path='/success' element={<PaymentSuccess/>}></Route>
        </Routes>
    </div>
  )
}

export default Pages
