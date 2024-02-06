import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SearchResultsPage } from './components/SearchResultsPage';
import { ToTop } from './components/ToTop';
import ShopContextProvider from './context/shop-context';
import WishlistContextProvider from './context/wishlist-context';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import Wishlist from './pages/Wishlist';
import { ProductDetails } from './pages/product/ProductDetails';
import { ProductsByCategory } from './pages/product/ProductsByCategory';

function App() {
  return (
    <>
      <ToTop />
      <ToastContainer />
      <ShopContextProvider>
        <WishlistContextProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/product-details/:productId" element={<ProductDetails />} />
              <Route path="/products/:categoryName" element={<ProductsByCategory />} />
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/wishlist' element={<Wishlist />}></Route>
              <Route path="/search-results" element={<SearchResultsPage />} />

              <Route path="/about-us" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </Router>
        </WishlistContextProvider >
      </ShopContextProvider>
    </>
  );
}

export default App;