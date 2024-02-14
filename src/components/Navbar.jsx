import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from "../images/Logo.png";

/* 
    Navbar Component
    
   - Displays a responsive navigation bar with a logo, search bar, and navigation links.
   - Allows users to search for products with auto-suggestions from the API.
   - Provides navigation links to Home, Cart, Wishlist, About, and Contact pages.
   - Highlights the active link based on the current page.
   - Navigates to the SearchResultsPage on pressing Enter in the search bar.
   - Shows an error toast if the search query is empty when attempting to search.
   - Closes the search dropdown on clicking outside or pressing the Escape key.
   - Displays product suggestions in a dropdown while typing in the search bar.
   - Handles click events on product suggestions to navigate to the product details page.
*/

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchQuery.trim() === '') {
                setFilteredProducts([]);
                return;
            }

            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                const filtered = data.filter(product =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setFilteredProducts(filtered);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const handleProductClick = (productId) => {
        navigate(`/product-details/${productId}`);
        closeDropdown();
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim() === '') {
                // Show toast notification for empty search query
                toast.error('Please enter a search query.');
            } else {
                // Redirect to SearchResultsPage with the search query
                navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
                closeDropdown();
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown-list')) {
                closeDropdown();
            }
        };

        const handleKeyDown = (event) => {
            if (isDropdownOpen && event.key === 'Escape') {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDropdownOpen]);

    const handleSearchButtonClick = () => {
        if (searchQuery.trim() === '') {
            toast.error('Please enter a search query.');
        } else {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
            closeDropdown();
        }
    };

    return (
        <nav className="flex justify-between px-20 py-10 items-center bg-white fixed top-0 w-full z-10">
            <div className='flex justify-center'>
                <Link to="/">
                    <img src={Logo} className="logo-image select-none" alt="Logo" />
                </Link>
            </div>
            <div className="relative">
                <input
                    className="search-input-box outline-none bg-transparent border border-gray-100 w-96 ml-40 p-2 mt-2 pl-3 select-none"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onKeyDown={(e) => handleEnterPress(e)}
                />
                <button
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={handleSearchButtonClick}
                >
                    <IoSearch style={{ fontSize: '24px', marginTop: '8px', paddingRight: '5px' }} />
                </button>

                {isDropdownOpen && filteredProducts.length > 0 && (
                    <ul className="mt-2 bg-white absolute left-20 border border-gray-300 rounded-md p-3 pl-3 pr-6 cursor-pointer ml-20 w-96 dropdown-list custom-scrollbar">
                        {filteredProducts.map((product, index) => (
                            <li key={product.id} onClick={() => handleProductClick(product.id)} className={`flex items-center cursor-pointer ${index !== 0 ? 'mt-6' : ''}`}>
                                <img src={product.image} alt={product.title} className="w-8 h-8 mr-2" />
                                <span>{product.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <ul className="flex items-center space-x-6">
                <Link to={'/'} className={`navbar-link font-semibold text-gray-700 ${location.pathname === '/' && 'navbar-link-active'}`}>
                    <li>Home</li>
                </Link>
                <Link to={'/cart'} className={`navbar-link font-semibold text-gray-700 ${location.pathname === '/cart' && 'navbar-link-active'}`}>
                    <li>Cart</li>
                </Link>
                <Link to={'/wishlist'} className={`navbar-link font-semibold text-gray-700 ${location.pathname === '/wishlist' && 'navbar-link-active'}`}>
                    <li>Wishlist</li>
                </Link>
                <Link to={'/about-us'} className={`navbar-link font-semibold text-gray-700 ${location.pathname === '/about-us' && 'navbar-link-active'}`}>
                    <li>About</li>
                </Link>
                <Link to={'/contact'} className={`navbar-link font-semibold text-gray-700 ${location.pathname === '/contact' && 'navbar-link-active'}`}>
                    <li>Contact</li>
                </Link>
            </ul>
        </nav>
    );
};