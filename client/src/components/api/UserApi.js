import { useEffect, useState } from 'react'
import api from '../../api';

const UserApi = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try{
                    const res = await api.get('/user/information', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                }
                catch(err){
                    console.log(err.response.data.msg);
                }
            }
            getUser()
        }
    }, [token]);

    const addCart = (product) => {
        if (!isLogged) {
            return alert("Please log in to continue");
        }
    
        const check = cart.every(item =>item._id !== product._id);

        if (check) {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
            alert("Product added to cart ")
        } else {
            alert("This product has already been added to cart");
        }
    };

    const addToWishlist = (product) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.find((item) => item._id === product._id)) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${product.title} has been added to your wishlist!`);
        } else {
            alert(`${product.title} is already in your wishlist.`);
        }
      };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        addToWishlist: addToWishlist
    }
    
}

export default UserApi
