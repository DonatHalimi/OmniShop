import React, { useContext } from 'react';
import { GoTrash } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/shop-context';
import { WishlistContext } from '../../context/wishlist-context';

/*
    WishlistItem Component
    
   - Represents a single item in the wishlist.
   - Displays product details including image, title, and price.
   - Provides functionality to add the product to the cart and remove it from the wishlist.
   - Utilizes React context (ShopContext, WishlistContext) for managing cart and wishlist states.
   - Uses React Router (Link) to navigate to the product details page.
   - Implements truncation for long titles to ensure a neat display.
   - Stylishly presents the wishlist item with a responsive layout.
   - Utilizes icons from react-icons for a visually appealing interface.
*/

const WishlistItem = (props) => {
    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);
    const { products } = props;
    const navigate = useNavigate();
    const id = props.id;

    // Ensure that products is an array before finding the product
    const product = Array.isArray(products) && products.find((product) => product.id === id);

    // Check if the product and its details have been loaded
    if (!products || products.length === 0 || !product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        cart.addOneToCart(product.id);

        toast.success('Produkti është shtuar në cart!', {
            onClick() {
                navigate("/cart");
            },
            style: {
                cursor: 'pointer'
            }
        }, 50);
    };

    const handleRemoveFromWishlist = () => {
        wishlist.removeItemFromWishlist(product.id);

        toast.success('Produkti është larguar nga wishlist!');
    };

    function truncateTitle(title, maxLength) {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    }

    return (
        <div className="container mx-auto my-8">
            <div className="flex items-center" style={{ marginBottom: '-65px' }}>
                <ul className='grid grid-cols-1 sm:grid-cols-1 gap-6 mx-20' style={{ maxWidth: '800px', }}>
                    <li className='bg-white rounded overflow-hidden border border-gray-40 w-64' style={{ marginRight: '700px' }}>
                        <Link to={`/product-details/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="mx-auto max-w-full h-32 object-cover mb-4 mt-5 select-none"
                            />
                        </Link>
                        <Link to={`/product-details/${product.id}`}>
                            <h3 className="text-sm font-semibold p-5 hover:underline">{truncateTitle(product.title, 20)}</h3>
                        </Link>
                        <p className="text-gray-600 sticky text-left p-5" style={{ bottom: '60px' }}>{product.price.toFixed(2)} €</p>
                        <a className="cart-btn sticky left-4 top-4 pl-3 pr-3 pb-2 pt-2 bottom-5 bg-gray-50 border border-gray-200 text-gray-700 text-center py-2 cursor-pointer rounded-md transition duration-600 ease-in-out hover:bg-gray-700 hover:text-white select-none"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                            }}>
                            Add to Cart
                        </a>
                        <a className="wishlistDelete"
                            onClick={handleRemoveFromWishlist}>
                            <i className='trashIcon'>
                                <GoTrash size="20px" />
                            </i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WishlistItem;
