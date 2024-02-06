import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';

/*
  Products Component

  - Imports necessary dependencies and components.
  - Utilizes React hooks (useState, useEffect) for managing state and side effects.
  - Fetches and displays a list of products.
  - Provides sorting options for the user to order products.
  - Implements loading animations while waiting for data.
*/

export const Products = () => {
    const [originalProducts, setOriginalProducts] = useState([]); // state variable to return "By Relevance" order
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products`);
                const data = response.data;
                setOriginalProducts(data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (sortOrder !== null) {
            sortProducts();
        }
    }, [sortOrder]);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortProducts = () => {
        setLoading(true);

        setTimeout(() => {
            let sortedProducts;

            const productsArray = [...products];

            if (sortOrder === 'titleAsc') {
                sortedProducts = productsArray.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'titleDesc') {
                sortedProducts = productsArray.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOrder === 'priceAsc') {
                sortedProducts = productsArray.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'priceDesc') {
                sortedProducts = productsArray.sort((a, b) => b.price - a.price);
            } else if (sortOrder === 'relevance') {
                sortedProducts = [...originalProducts];
            }

            setProducts(sortedProducts);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold ml-20">Products</h2>
                <select
                    className="ml-4 p-2 pr-10 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline cursor-pointer"
                    style={{ marginLeft: '1060px', backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%232c3e50\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'M19 9l-7 7-7-7\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                >
                    <option value="relevance">By Relevance</option>
                    <option value="titleAsc">Title: A-Z</option>
                    <option value="titleDesc">Title: Z-A</option>
                    <option value="priceAsc">Price: Lowest to Highest</option>
                    <option value="priceDesc">Price: Highest to Lowest</option>
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="bg-white rounded overflow-hidden border border-gray-200 animate-pulse" style={{ height: '332px' }}>
                            <div className="mx-auto max-w-full bg-gray-300 mb-4 mt-5" style={{ height: '128px' }}></div>
                            <div className="text-sm font-semibold p-5 bg-gray-300"></div>
                            <div className="text-gray-600 text-center p-4 bg-gray-200"></div>
                            <div className="text-gray-600 text-center p-4 bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20" style={{ height: '1370px' }}>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </div>
    );
};
