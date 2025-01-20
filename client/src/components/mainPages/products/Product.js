import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/productList/ProductList';
import Pagination from '../utils/pagination/Pagination';
import { useLocation } from 'react-router-dom';

const Product = ({ category }) => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productApi.products;
  const [filters, setFilters] = state.productApi.filters;
  const [isAdmin] = state.userApi.isAdmin;
  const [totalCount, setTotalCount] = state.productApi.totalCount;
  const itemsPerPage = filters.limit || 9;
  const location = useLocation();

  useEffect(() => {
    const initialCategory = location.pathname === '/' ? '' : category || '';
    setFilters((prev) => ({
      ...prev,
      category: initialCategory,
      page: 1,
    }));
  }, [category, location.pathname, setFilters]);


  useEffect(() => {
      const fetchFilteredProducts = async () => {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      console.log("Filtered Products:", data.products);
      setProducts([]||data.products)
      setTotalCount(data.totalCount || 0);
    };

    if (filters.category) {
      fetchFilteredProducts();
    }
  }, [filters, setProducts, setTotalCount]);

  const handleSort = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (searchValue) => {
    setFilters((prev) => ({ ...prev, search: searchValue }));
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <h1 className='featured'>Our Products</h1>
      <div className='filters'>
        <div className='filter-price'>
          <select onChange={handleSort}>
            <option disabled selected hidden>Sort By Price</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>

        <div className='filter-created'>
          <select onChange={handleSort}>
            <option disabled selected hidden>Sort By Last updated</option>
            <option value="-createdAt">Newly Added</option>
            <option value="createdAt">Oldest</option>
          </select>
        </div>

        <div className='filter-search'>
          <input
            type='text'
            placeholder='Search products by brands, category or name ...'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className='products'>
        {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductList key={product.id} product={product} isAdmin={isAdmin} />
            ))
          ) : (
            <center>
                <p>No more products found.</p>
            </center>
          )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isAdmin? '': <>
      <section id="off-banner" class="section-ml">
            <h4>Clearance Sale</h4>
            <h2>Upto 60% off - All Accessories and electronics</h2>
            <button class="btn">Explore More</button>
      </section>

      <section id="banners" class="section-p1">
            <div class="big-banners">
              <div class="big-banners-1">
                <h4>crazy deals</h4>
                <h2>Buy 1 get 1 free</h2>
                <span>The best classic dress is on sale at coro</span>
                <button class="banner-btn">Learn More</button>
              </div>
              <div class="big-banners-2">
                <h4>Spring/Summer</h4>
                <h2>upcomming season</h2>
                <span>The best classic dress is on sale at cara</span>
                <button class="banner-btn">Collection</button>
              </div>
            </div>
            <div class="small-banners">
              <div class="small-banners-1">
                <h2>SEASONAL SALE</h2>
                <h5>Winter Collection 50% Off</h5>
              </div>
              <div class="small-banners-2">
                <h2>NEW FOOTWEAR COLLECTION</h2>
                <h5>Spring/Summer 2022</h5>
              </div>
              <div class="small-banners-3">
                <h2>T-SHIRTS</h2>
                <h4>New Trendy Prints</h4>
              </div>
            </div>
          </section>
          </> 
      }

    </>
  );
};

export default Product;
