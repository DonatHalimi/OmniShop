import React, { createContext, useState } from 'react';

/*
    WishlistContext Provider
    
   - Creates a context for the wishlist to share its state with nested components.
   - Utilizes React createContext to define the initial context value.
   - Implements a WishlistContextProvider component to manage and provide the wishlist-related functionality and data.
   - Defines functions to interact with the wishlist such as adding and removing products.
   - Provides the context value to its children using the WishlistContext.Provider component.
*/

export const WishlistContext = createContext({
  items: [],
  addItemToWishlist: () => { },
  removeItemFromWishlist: () => { },
});

export function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Krijojme nje funksion per shtim te produktit ne wishlist
  function addItemToWishlist(id) {
    const itemExists = wishlistItems.find(item => item.id === id);

    if (!itemExists) {
      setWishlistItems(prevItems => [
        ...prevItems,
        { id: id, quantity: 1 }
      ]);
    }
  }

  // Krijojme nje funksion per largim te produktit nga wishlist
  function removeItemFromWishlist(id) {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  }

  const contextValue = {
    items: wishlistItems,
    addItemToWishlist,
    removeItemFromWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;