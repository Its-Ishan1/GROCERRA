import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'


const BestSeller = () => {
  const { products } = useAppContext();
  const filteredProducts = products.filter(p => p.inStock);
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'> Best Sellers</p>

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {filteredProducts.slice(0, 5).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-center mt-6 text-gray-500'>No best sellers available at the moment.</p>
      )}

    </div>
  )
}

export default BestSeller