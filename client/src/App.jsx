import React from 'react'
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';

import { Routes, Route, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import PaymentSuccess from './pages/PaymentSuccess';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import Contact from './pages/Contact';
import Messages from './pages/seller/Messages';
import Subscribers from './pages/seller/Subscribers';




const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller, loading, user, setshowUserLogin, navigate } = useAppContext();

  // Route Protection Wrapper
  const ProtectedRoute = ({ children }) => {
    if (loading) return null;
    if (!user) {
      setshowUserLogin(true);
      navigate('/');
      return null;
    }
    return children;
  }

  if (isSellerPath && loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />
      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/add-address' element={<ProtectedRoute><AddAddress /></ProtectedRoute>} />
          <Route path='/my-orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path='/contact' element={<Contact />} />

          {/*  SELLER ROUTES */}
          <Route
            path='/seller'
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='messages' element={<Messages />} />
            <Route path='subscribers' element={<Subscribers />} />
          </Route>
        </Routes>

      </div>
      {!isSellerPath && <Footer />}
    </div>

  )
}

export default App