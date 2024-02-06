import React, { useContext, useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import WishlistItem from '../components/items/wishlist-items';
import { WishlistContext } from '../context/wishlist-context';

const Wishlist = () => {
    const { items, removeItemFromWishlist } = useContext(WishlistContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleRemoveItemFromWishlist = (id) => {
        removeItemFromWishlist(id);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-10 mb-10" style={{ marginLeft: '100px' }}>
                <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-semibold ml-40 mt-40" style={{ position: 'relative', top: '30px' }}>Your Wishlist</h2>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20" >
                        {
                            Array.from({ length: 20 }).map((_, index) => (
                                <div key={index} className="bg-white rounded overflow-hidden border border-gray-200 animate-pulse" style={{ height: '332px' }}>
                                    <div className="mx-auto max-w-full bg-gray-300 mb-4 mt-5" style={{ height: '128px' }}></div>
                                    <div className="text-sm font-semibold p-5 bg-gray-300"></div>
                                    <div className="text-gray-600 text-center p-4 bg-gray-200"></div>
                                    <div className="text-gray-600 text-center p-4 bg-gray-200"></div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5 mx-20">
                        {items.map((item) => (
                            <WishlistItem id={item.id} products={products} onRemoveFromWishlist={() => handleRemoveItemFromWishlist(item.id)} key={item.id} />
                        ))}
                    </div>
                )
                }

                {items.length === 0 ? (
                    <div className="text-center mt-10">
                        <p>Your wishlist is empty.</p>
                    </div>
                ) : null}

                <div style={{ marginTop: '400px' }}></div>

            </div>

            <Footer />
        </>
    );
}

export default Wishlist;
