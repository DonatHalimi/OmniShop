import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import ProductItem from './ProductItem';

/* 
    SearchResultsPage Component
    
   - Displays a page showing search results based on the query parameter from the URL.
   - Fetches and filters products from the 'https://fakestoreapi.com/products' API.
   - Allows sorting results by title (ascending/descending), price (ascending/descending), or relevance.
   - Provides a button to go back to the previous page.
   - Utilizes the ProductItem component to render individual product items.
   - Handles loading state with a loading animation.
   - Shows the total number of products found for the search query.
   - Allows sorting products by relevance, title, or price.
   - Implements responsive design for various screen sizes.
   - Utilizes toast notifications for success messages.
*/

export const SearchResultsPage = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [originalResults, setOriginalResults] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        setSearchQuery(query || '');
        setLoading(true);

        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                // Filter products based on the search query locally
                const filtered = data.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase())
                );

                setOriginalResults(filtered);
                setSearchResults(filtered);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

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

            const searchResultsArray = [...searchResults]

            if (sortOrder === 'titleAsc') {
                sortedProducts = searchResultsArray.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'titleDesc') {
                sortedProducts = searchResultsArray.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOrder === 'priceAsc') {
                sortedProducts = searchResultsArray.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'priceDesc') {
                sortedProducts = searchResultsArray.sort((a, b) => b.price - a.price);
            } else if (sortOrder === 'relevance') {
                sortedProducts = [...originalResults];
            }

            setSearchResults(sortedProducts);
            setLoading(false);
        }, 500);
    };

    const goBack = () => {
        navigate(-1);
    };

    const numberOfProducts = searchResults.length;

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-10 mt-20">
                <div className="flex items-center mb-2 ml-20 mt-40">
                    <button onClick={goBack} className="flex items-center bg-gray-100 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded-full circle-button cursor-pointer">
                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 11H7.414l3.293-3.293a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H20a1 1 0 0 0 0-2z" />
                        </svg>
                    </button>
                </div>
                <h2 className="searchResult text-3xl font-semibold mb-5 ml-20">
                    {numberOfProducts} products found for "{searchQuery}"
                </h2>
                {numberOfProducts > 0 && (
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
                )}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20 mt-20">
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
                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20 list-none">
                        {searchResults.map((product) => (
                            <ProductItem key={product.id} product={product} isSearchResultItem />
                        ))
                        }
                    </div>
                )}
            </div >

            <div style={{ marginTop: '500px' }}></div>

            <Footer />
        </>
    );
};