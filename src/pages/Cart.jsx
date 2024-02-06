import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from '../components/Navbar';
import CartItem from '../components/items/cart-items';
import { ShopContext } from '../context/shop-context';
import NoProductsInCart from '../images/NoProductsInCart.png';

/*
  Cart Component

  - Utilizes React hooks (useContext, useEffect) for managing state and side effects.
  - Displays the products in the shopping cart, allowing users to view and manage them.
  - Provides a link to return to the main page if the cart is empty.
*/

export function Cart() {
    // Merr kontekstin e dyqanit nga komponenti ShopContext
    const cart = useContext(ShopContext);

    // Krijojme funksionin per me llogarit numrin total te produkteve ne shporte
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    // useEffect per me scroll to top sa here qe hapet faqja Cart
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />

            <div className="cart-section mt-8 mb-8">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                {productsCount > 0 ? (
                                    <table className="cardTable w-full border-collapse border border-gray-300">
                                        <thead className="cart-table-head bg-gray-200 select-none">
                                            <tr className="table-head-row">
                                                <th className="product-image p-2">Product Image</th>
                                                <th className="product-name p-2">Name</th>
                                                <th className="product-price p-2">Price</th>
                                                <th className="product-quantity p-2">Quantity</th>
                                                <th className="product-total p-2">Operations</th>
                                                <th className="product-total p-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.items.map((currentProduct) => (
                                                <CartItem key={currentProduct.id} id={currentProduct.id} quantity={currentProduct.quantity}></CartItem>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : null}
                            </div>
                        </div>

                        <div className="noProductsInCartContainer col-lg-4 col-md-12">
                            {productsCount === 0 ? (
                                <div className="noProductsInCart card mt-4 p-4 bg-white border border-gray-150 rounded-md rounded text-center select-none">
                                    <img src={NoProductsInCart} className='text-center' />
                                    <p className='text-center'>Ju nuk keni ndonjë produkt në shportë.</p>
                                    <Link to="/" className='block text-center text-gray-800 mt-4 mb-4'>Kthehu në faqen kryesore</Link>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '500px' }}></div>

            <Footer />
        </>
    );
}