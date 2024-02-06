import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import ProductItem from '../../components/ProductItem';

/*
  ProductsByCategory Component

  - Imports necessary dependencies and components.
  - Utilizes React hooks (useState, useEffect) for managing state and side effects.
  - Fetches and displays a list of products based on the selected category.
  - Provides sorting options for the user to order products.
  - Implements loading animations while waiting for data.
*/

export const ProductsByCategory = () => {
    const { categoryName } = useParams();

    const [originalProducts, setOriginalProducts] = useState([]); // state variable to return "By Relevance" order
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                if (!categoryName) {
                    console.error('No productId provided');
                    return;
                }

                const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
                setOriginalProducts(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error(`Error fetching products for category ${categoryName}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);

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

    const capitalizeCategory = (category) => {
        if (!category) return '';

        const words = category.split(' ');

        const capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return capitalizedWords.join(' ');
    };

    return (
        <>
            <Navbar />

            <div className="container mx-auto my-10" style={{ marginTop: '180px' }}>
                <h2 className="text-2xl font-semibold ml-20 text-left" style={{ position: 'relative', top: '35px', width: '550px' }}>{`Products in "${capitalizeCategory(categoryName)}" Category`}</h2>
                <div>
                    <select
                        className="mb-4 p-2 pr-10 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline cursor-pointer"
                        style={{ marginLeft: '1235px', backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%232c3e50\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'M19 9l-7 7-7-7\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
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
                    <ul className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <li key={index} className="bg-white rounded overflow-hidden border border-gray-40 animate-pulse">
                                <div className="mx-auto max-w-full h-32 bg-gray-300 mb-4 mt-5"></div>
                                <div className="text-sm font-semibold p-5 bg-gray-300"></div>
                                <div className="text-gray-600 text-center p-4 bg-gray-300"></div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </ul>
                )}
            </div >

            <div style={{ marginTop: '350px' }}></div>

            <Footer />
        </>
    );
};