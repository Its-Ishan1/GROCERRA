import { assets } from "../assets/assets";

import React, { use } from 'react';
import { useAppContext } from "../context/AppContext";


const ProductCard = ({ product }) => {

    const { Currency, addToCart, updateCartItems, removeFromCart, navigate, cartItems } = useAppContext();



    return product && (

        <div className="border border-gray-500/20 rounded-md md:px-4 px-2 py-2 bg-white w-full">
            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="group cursor-pointer flex items-center justify-center px-1">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36 h-28 md:h-36 object-contain" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm mt-2">
                <p className="text-xs">{product.category}</p>
                <p className="text-gray-700 font-medium text-sm md:text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (

                        <img key={i} className="md:w-3.5 w-2.5" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />



                    ))}
                    <p className="text-xs">(4)</p>
                </div>
                <div className="flex items-end justify-between mt-2 md:mt-3">
                    <p className="md:text-xl text-sm font-medium text-primary">
                        {Currency} {product.offerPrice} {" "} <span className="text-gray-500/60 md:text-sm text-[10px] line-through">{Currency} {product.price}</span>
                    </p>
                    < div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-indigo-100 border border-primary md:w-[80px] w-[50px] h-[30px] md:h-[34px] rounded text-primary font-medium text-xs md:text-sm" onClick={() => addToCart(product._id)} >

                                <img className="w-3 md:w-auto" src={assets.cart_icon} alt="cart_icon" />
                                <span className="hidden md:block">Add</span>
                                <span className="md:hidden">+</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-1 md:gap-2 md:w-20 w-14 h-[30px] md:h-[34px] bg-primary/25 rounded select-none text-xs md:text-sm">
                                <button onClick={() => { removeFromCart(product._id) }} className="cursor-pointer px-1 h-full" >
                                    -
                                </button>
                                <span className="w-4 md:w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer px-1 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;