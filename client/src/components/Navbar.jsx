import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const { user, setUser, isSeller, setIsSeller, setshowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, getCartAmount, axios, loading } = useAppContext();


  const logout = async () => {
    try {
      if (user) {
        await axios.get('/api/user/logout')
      }
      if (isSeller) {
        await axios.get('/api/seller/logout')
      }
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUser(null)
      setIsSeller(false)
      setShowProfileMenu(false)
      navigate('/')
    }
  };

  useEffect(() => {

    if (searchQuery.length > 0) {
      navigate("/products");
    }

  }, [searchQuery])


  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">



      {/* LOGO */}
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-1.5 md:gap-2.5">
        <img className="h-10 md:h-14 shadow-sm" src={assets.logo} alt="logo" />
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-3xl font-black tracking-tighter text-gray-900 flex items-center">
            G<span className="text-primary">rocerra</span>
          </span>
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-0.5">Fresh Market</span>
        </div>
      </NavLink>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full group focus-within:border-primary transition">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="py-1.5 bg-transparent outline-none text-sm w-48"
            type="text"
            placeholder="Search products"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <img src={assets.search_icon} alt="search" className="h-4 w-4" />
        </div>

        {/* CART */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <button className="absolute -top-2 -right-3 text-xs bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* LOGIN / PROFILE */}
        {loading ? (
          <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-full invisible md:visible"></div>
        ) : (!user && !isSeller) ? (
          <button
            onClick={() => setshowUserLogin(true)}
            className="px-6 py-2 bg-primary text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-10"
              />
              {isSeller && <p className="text-xs text-primary font-medium">Seller</p>}
            </div>

            {showProfileMenu && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md text-sm w-32 z-50">
                {user && (
                  <li
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/my-orders");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    My Orders
                  </li>
                )}
                {isSeller && (
                  <li
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/seller");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Dashboard
                  </li>
                )}
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU ICON */}
      <div className="flex md:hidden items-center gap-4">
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <button className="absolute -top-2 -right-3 text-xs bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>


      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {loading ? (
            <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-full mt-2"></div>
          ) : (!user && !isSeller) ? (
            <button
              onClick={() => {
                setOpen(false);
                setshowUserLogin(true);
              }}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <>
              {isSeller && (
                <NavLink to="/seller" onClick={() => setOpen(false)}>Seller Dashboard</NavLink>
              )}
              {user && (
                <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>
              )}
              <button
                onClick={logout}
                className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
