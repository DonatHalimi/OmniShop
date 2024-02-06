import React, { createContext, useEffect, useState } from 'react';

/*
    ShopContext Provider
    
   - Creates a context for the shopping cart to share its state with nested components.
   - Utilizes React createContext to define the initial context value.
   - Implements a ShopContextProvider component to manage and provide the cart-related functionality and data.
   - Fetches product data from a fake store API using the useEffect hook when the component mounts.
   - Defines functions to interact with the shopping cart such as adding, removing, and deleting products.
   - Calculates the total cost of the items in the cart.
   - Provides the context value to its children using the ShopContext.Provider component.
*/

// Krijimi i nje instance te Context per kontekstin e dyqanit
export const ShopContext = createContext({
    items: [],
    getproductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
});

export function ShopContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);

    // Funksioni per te marrur te dhenat e librave
    function fetchProducts() {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }

    // Krijimi i nje useEffect per te thirrur fetchproducts kur komponenti montohet
    useEffect(() => {
        fetchProducts();
    }, []);

    // Funksioni per te marrur sasine e produktit
    function getProductQuantity(id) {
        const quantity = cartProducts.find((product) => product.id === id)?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    // Krijimi i nje funksioni per te shtuar produkt ne Cart
    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            // Produkti nuk eshte ne cart
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1,
                },
            ]);
        } else {
            // Produkti eshte ne cart
            setCartProducts((cartProducts) =>
                cartProducts.map(
                    (product) =>
                        product.id === id
                            ? { ...product, quantity: product.quantity + 1 } // if statement is true
                            : product // if statement is false
                )
            );
        }
    }

    // Krijimi i nje funksioni per te larguar nje produkt nga Cart
    function removeOneFromCart(id) {
        const product = cartProducts.find((product) => product.id === id);

        if (product && product.quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts((cartproducts) =>
                cartproducts.map((product) =>
                    product.id === id ? { ...product, quantity: product.quantity - 1 } : product
                )
            );
        }
    }

    // Krijimi i nje funksioni per kthimin e kostose totale te shportes
    function getTotalCost() {
        let totalCost = 0;
        if (cartProducts && Array.isArray(cartProducts)) {
            cartProducts.forEach((cartItem) => {
                const product = products.find((product) => product.id === cartItem.id);
                if (product) {
                    totalCost += product.price * cartItem.quantity;
                }
            });
        }
        return totalCost;
    }

    // Krijimi i nje funksioni per largimin e produkteve nga shporta
    function deleteFromCart(id) {
        setCartProducts((cartProducts) =>
            cartProducts.filter((currentProduct) => currentProduct.id !== id)
        );
    }

    // Krijimi i nje konteksti te shportes me vlerat e nevojshme
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };

    // Kthen kontekstin e shportes te mbeshtjelle me <ShopContext.Provider> per te qene i perdorshem nga komponentet femije
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;