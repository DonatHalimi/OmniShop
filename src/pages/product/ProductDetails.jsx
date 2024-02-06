import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RiArrowRightSFill, RiHome2Fill } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ShopContext } from '../../context/shop-context';
import { WishlistContext } from '../../context/wishlist-context';

/*
  ProductDetails Component

  - Imports necessary dependencies and components.
  - Utilizes React hooks (useState, useEffect, useContext) for managing state and side effects.
  - Fetches and displays detailed information about a specific product.
  - Provides options to add the product to the cart or wishlist.
  - Implements loading animations while waiting for data.
  - Uses react-router-dom for navigation.
*/

export const ProductDetails = () => {
    const { categoryName, productId } = useParams();
    console.log('Category Name:', categoryName);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!productId) {
                    console.error('No productId provided');
                    return;
                }

                const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error(`Error fetching product details for ID ${productId}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);

    const handleAddToCart = (product) => {
        cart.addOneToCart(product.id);

        toast.success("Produkti është shtuar në shportë!", {
            onClick: () => {
                navigate("/cart");
            },
            style: {
                cursor: 'pointer',
            },
        });
    };

    const handleAddToWishlist = (product) => {
        wishlist.addItemToWishlist(product.id);

        toast.success("Produkti është shtuar në wishlist!", {
            onClick: () => {
                navigate("/wishlist");
            },
            style: {
                cursor: 'pointer',
            },
        });
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

            <section className="text-gray-700 body-font overflow-hidden bg-white" style={{ marginTop: '150px' }}>
                {/* Navigation Icons */}
                <div className="lg:w-2/3 w-full mx-auto flex items-center relative top-16 left-14 ml-10 mt-4 lg:ml-96 lg:mr-40 select-none">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
                        <RiHome2Fill className="text-lg" />
                    </Link>

                    <RiArrowRightSFill className="mx-2 text-gray-500" />

                    <Link to={`/products/${product && product.category}`} className="flex items-center text-gray-500 hover:text-gray-700">
                        {product ? capitalizeCategory(product.category) : 'Loading...'}
                    </Link>

                    <RiArrowRightSFill className="mx-2 text-gray-500" />

                    {/* Display product name as the last icon */}
                    <span className="flex items-center text-gray-700">
                        {product ? product.title : 'Loading...'}
                    </span>
                </div>

                <div className="lg:w-2/3 w-full mx-auto mt-20 p-2 md:p-10 border border-gray-250 border-b-2 rounded-lg max-w-5xl">
                    {/* If not loading, then display the product's details */}
                    {!loading ? (
                        <div className="lg:flex">
                            <img
                                alt={product.title}
                                className="w-64 h-64 object-contain rounded aspect-w-3 aspect-h-2 select-none lg:mr-8"
                                src={product.image}
                            />
                            <div className="lg:w-2/3">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest select-none">PRODUCT DETAILS</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <span className="text-gray-600 ml-3"></span>
                                    </span>
                                </div>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">{product.price.toFixed(2)} €</span>
                                </div>
                                <div className="flex mt-4">
                                    <a className="cart-btn relative right-2 top-2 pl-3 pr-3 pb-2 pt-2 bottom-5 bg-gray-50 border border-gray-200 text-gray-700 text-center py-2 cursor-pointer rounded-md transition duration-600 ease-in-out hover:bg-gray-700 hover:text-white select-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}>
                                        Add to Cart
                                    </a>

                                    <a className="wishlist-btn relative left-4 top-2 pl-3 pr-3 pb-2 pt-2 bottom-5 bg-gray-50 border border-gray-200 text-gray-700 text-center py-2 cursor-pointer rounded-md transition duration-600 ease-in-out hover:bg-gray-700 hover:text-white select-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToWishlist(product);
                                        }}>
                                        Add to Wishlist
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Loading Animation
                        <div className="lg:flex animate-pulse">
                            <div className="lg:w-1/3 w-full object-cover object-center rounded">
                                <div className="mx-auto max-w-full h-96 bg-gray-300 mb-4 mt-5"></div>
                            </div>
                            <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    <div className="bg-gray-300 h-6 w-2/3"></div>
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    <div className="bg-gray-300 h-8 w-1/2"></div>
                                </h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <span className="text-gray-600 ml-3">
                                            <div className="bg-gray-300 h-4 w-20"></div>
                                        </span>
                                    </span>
                                </div>
                                <p className="leading-relaxed">
                                    <div className="bg-gray-300 h-4 w-full"></div>
                                    <div className="bg-gray-300 h-4 w-3/4"></div>
                                    <div className="bg-gray-300 h-4 w-2/3"></div>
                                    <div className="bg-gray-300 h-4 w-1/2"></div>
                                    <div className="bg-gray-300 h-4 w-1/4"></div>
                                </p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        <div className="bg-gray-300 h-8 w-16"></div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            <div style={{ marginTop: "400px" }}></div>

            <Footer />
        </>
    );
};