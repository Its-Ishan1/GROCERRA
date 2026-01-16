import React from 'react'
import { useAppContext } from '../../context/AppContext'

import { toast } from 'react-hot-toast'








const ProductList = () => {
    const { products, Currency, axios, fetchProducts } = useAppContext();

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock })

            if (data.success) {
                fetchProducts();
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteProduct = async (id) => {
        const toastId = toast.loading("Removing product...")
        try {
            const { data } = await axios.post('/api/product/remove', { id })

            if (data.success) {
                fetchProducts();
                toast.success(data.message, { id: toastId })
            }
            else {
                toast.error(data.message, { id: toastId })
            }
        } catch (error) {
            toast.error(error.message, { id: toastId })
        }
    }

    return (
        <div className=" no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.filter(p => !p.isDummy).map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded overflow-hidden">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 max-sm:hidden">{Currency}{product.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                                <input
                                                    onClick={() => toggleStock(product._id, !product.inStock)}
                                                    checked={product.inStock}
                                                    type="checkbox"
                                                    className="sr-only peer" />
                                                <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                            </label>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList