import { useEffect, useState } from 'react'
import api from '../../api';

const ProductApi = () => {

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        sort: '-createdAt',
        limit: 9,
        search: ''
    });
    const [totalCount, setTotalCount] = useState(0)
    
    const getProducts = async() => {
        try{
            const query = new URLSearchParams(filters).toString();
            const res = await api.get(`/api/products?${query}`);
            setProducts(res.data.products)
            setTotalCount(res.data.totalCount)
        }catch(err){
            console.error(err.response.data.msg);
        }
    }

    useEffect(()=>{
        getProducts()
    }, [filters])
    return {
        products: [products, setProducts],
        filters: [filters, setFilters],
        totalCount: [totalCount, setTotalCount]
    }
}

export default ProductApi
