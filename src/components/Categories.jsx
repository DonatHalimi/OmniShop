import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* 
    Categories Component
    
   - Fetches and displays product categories from the 'https://fakestoreapi.com/products/categories' API.
   - Capitalizes the first letter of each category.
   - Renders a loading state while fetching data.
   - Maps each category to a Link component, allowing navigation to a corresponding products page.
*/


export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const data = await response.json();
                setCategories(data.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()));
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto pl-20 my-10">
            <h2 className="text-2xl font-semibold mb-4 text-left">Categories</h2>
            {loading ? (
                <div className="grid grid-cols-6 gap-5 mb-20" style={{ height: '58px' }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="border rounded p-4 text-center bg-gray-300 animate-pulse cursor-not-allowed"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-5 mb-20">
                    {categories.map((category, index) => (
                        <Link to={`/products/${category.toLowerCase()}`} className="text-gray-700 capitalize cursor-pointer" key={index}>
                            <div className="border rounded p-4 text-center">
                                {category}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;