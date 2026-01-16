import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';



const ProductCategory = () => {

    const { products } = useAppContext();
    const { category } = useParams();
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category);
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category);

    return (
        <div className='mt-16 '>
            {searchCategory && (
                <div className='flex flex-col items-end w-max '>
                    <p className='text-2xl font-medium '> {searchCategory.text.toUpperCase()}</p>


                    <div className='w-16 h-0.5 bg-primary rounded-full'> </div>

                </div>

            )}
            {filteredProducts.filter(p => p.inStock).length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                    {filteredProducts.filter(p => p.inStock).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[60vh] text-center px-4'>
                    <p className='text-xl md:text-2xl font-medium text-primary'> No products currently in stock for this category.</p>
                    <p className='text-gray-500 mt-2'>Please check back later!</p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory