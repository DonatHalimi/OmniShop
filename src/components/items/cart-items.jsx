import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsPlusLg, BsTrash3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/shop-context';

/*
    CartItem Component
    
   - Represents a single item in the shopping cart.
   - Fetches product data from the API based on the provided product ID.
   - Displays the product image, title, price, quantity, and total cost in the cart.
   - Provides functionality to add, remove one item, or delete the product from the cart.
   - Uses React context (ShopContext) for managing the shopping cart state.
   - Utilizes icons from react-icons for a visually appealing interface.
   - Implements loading animation while fetching product data.
   - Enhances user experience by linking to the product details page.
*/

const CartItem = (props) => {
    const cart = useContext(ShopContext);
    const id = props.id;
    const quantity = props.quantity;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const product = products.find((product) => product.id === id);

    const handleRemoveOneFromCart = () => {
        cart.removeOneFromCart(id);

        setTimeout(() => {
            toast.success('Produkti është larguar nga shporta!');
        });
    };

    const handleRemoveFromCart = () => {
        cart.deleteFromCart(id);

        setTimeout(() => {
            toast.success('Produkti është larguar nga shporta!');
        });
    };

    const price = product ? parseFloat(product.price) : 0;
    const totalCost = (quantity * price).toFixed(2);

    if (loading || !product) {
        return (
            <tr className="border-b border-gray-200">
                <td colSpan="6" className="py-4 text-center">
                    <div className="animate-pulse">
                        <div className="mx-auto max-w-full h-32 bg-gray-300 mb-4 mt-5"></div>
                        <div className="text-sm font-semibold p-5 bg-gray-300"></div>
                        <div className="text-gray-600 text-center p-4 bg-gray-300"></div>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr className="border-b border-gray-200">
            <td className="py-4">
                <Link to={`/product-details/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="mx-auto max-w-full h-32 object-cover select-none"
                    />
                </Link>
            </td>
            <td className="py-4 text-left">
                <Link to={`/product-details/${product.id}`}>
                    <h5 className='hover:underline' >{product.title}</h5>
                </Link>
            </td>
            <td className="py-4 text-center">${price.toFixed(2)}</td>
            <td className="py-4 text-center">{quantity}</td>
            <td className="py-4 text-center">
                <button className="bg-gray-200 text-black p-2 rounded" onClick={() => cart.addOneToCart(id)} title="Add">
                    <BsPlusLg />
                </button>
                <button className="bg-gray-200 text-black p-2 rounded ml-2" onClick={handleRemoveOneFromCart} title="Remove">
                    <AiOutlineMinus />
                </button>
                <button className='bg-gray-200 text-black p-2 rounded ml-2' onClick={handleRemoveFromCart} title="Delete">
                    <BsTrash3 />
                </button>
            </td>
            <td className="py-4 text-center">${totalCost}</td>
        </tr>
    );
};

export default CartItem;
