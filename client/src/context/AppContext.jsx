import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log("Axios baseURL:", axios.defaults.baseURL);

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const Currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartItems)
      } else {
        setUser(null)
        setCartItems({})
      }

    } catch (error) {
      setUser(null)
      setCartItems({})
    } finally {
      setLoading(false)
    }
  }





  //Fetch ALL Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list?t=' + new Date().getTime())
      if (data.success) {
        if (data.success) {
          setProducts(data.products);
        }
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  const addToCart = (itemId) => {
    const cart = structuredClone(cartItems);
    cart[itemId] = (cart[itemId] || 0) + 1;
    setCartItems(cart);
    toast.success("Item added to cart");
  };

  const updateCartItems = (itemId, quantity) => {
    const cart = structuredClone(cartItems);
    cart[itemId] = quantity;
    setCartItems(cart);
  };

  const removeFromCart = (itemId) => {
    const cart = structuredClone(cartItems);
    if (cart[itemId]) {
      cart[itemId]--;
      if (cart[itemId] === 0) delete cart[itemId];
    }
    setCartItems(cart);
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const p = products.find(x => x._id === id);
      if (p) total += p.offerPrice * cartItems[id];
    }
    return total;
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([fetchSeller(), fetchProducts(), fetchUser()]);
      setLoading(false);
    }
    initData();
  }, [])
  useEffect(() => {

    const updateCart = async () => {
      try {

        const { data } = await axios.post('/api/cart/update', { cartItems })
        if (!data.success) {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)

      }
    }
    if (user) {
      updateCart()
    }

  }, [cartItems])

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setshowUserLogin,
        products,
        Currency,
        addToCart,
        updateCartItems,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        loading,
        setLoading,
        axios,
        fetchProducts,
        fetchUser,
        setCartItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
