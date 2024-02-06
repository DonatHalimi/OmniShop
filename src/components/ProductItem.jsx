import React, { useContext } from 'react';
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shop-context';
import { WishlistContext } from '../context/wishlist-context';

/* 
    ProductItem Component
    
   - Displays a product item with an image, title, price, and buttons for adding to cart and wishlist.
   - Utilizes react-icons for the heart icon.
   - Allows truncating the title if it exceeds a specified length.
   - Provides links to the product details page on image and title clicks.
   - Handles click events to add the product to the cart and wishlist.
   - Displays price and buttons in a responsive and visually appealing layout.
   - Shows success toasts on successfully adding to cart and wishlist.
   - Utilizes context for cart and wishlist functionality.
*/

const ProductItem = ({ product, isSearchResultItem }) => {
    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);
    const navigate = useNavigate();

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

    function truncateTitle(title, maxLength) {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    }

    return (
        <li className={`bg-white rounded overflow-hidden border border-gray-40 ${isSearchResultItem ? 'search-result-item' : ''}`} style={{ width: '259.19px', height: '327.5px' }}>
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

            <a className='wishlistButton'
                onClick={(e) => {
                    e.preventDefault();
                    handleAddToWishlist(product);
                }}>
                <i className='heartIcon'>
                    <CiHeart size="25px" />
                </i>
            </a>
        </li>
    )
};

export default ProductItem;