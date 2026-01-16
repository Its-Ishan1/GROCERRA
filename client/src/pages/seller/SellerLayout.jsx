import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import { toast } from "react-hot-toast";


const SellerLayout = () => {
    const { axios, navigate, setIsSeller } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
        { name: "Messages", path: "/seller/messages", icon: assets.contact_icon },
    ];
    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout')

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSeller(false)
            navigate('/')
        }
    }

    return (
        <div className="ml-0 p-0">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white  ">
                <Link to="/" className="flex items-center gap-2.5">
                    <img src={assets.logo} alt='logo' className='cursor-pointer h-12 md:h-14 object-contain shadow-sm' />
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 flex items-center">
                            G<span className="text-primary">rocerra</span>
                        </span>
                        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-0.5">Fresh Market</span>
                    </div>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-64   w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                        ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white "
                                }`
                            }
                        >
                            <img src={item.icon} alt="" className='w-7 h-7' />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    );
};
export default SellerLayout;