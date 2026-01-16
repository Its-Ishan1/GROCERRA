
import { useAppContext } from '../context/AppContext';

import ProductCard from '../components/ProductCard';
import React, { useState, useEffect } from 'react'




const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilteredProducts(products)

        }



    }, [products, searchQuery])
    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'> All Products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts.filter(product => product.inStock).length > 0 ? (
                    filteredProducts.filter(product => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <div className='col-span-full py-20 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-xl border border-dashed border-gray-200'>
                        <p className='text-gray-400 text-lg'>No products found matching your search.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className='px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dull transition'
                        >
                            Clear All filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default AllProducts