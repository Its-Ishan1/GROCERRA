import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets';
import { toast } from 'react-hot-toast';

const Orders = () => {
    const { Currency, axios } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller')
            if (data.success) {
                setOrders(data.orders)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;
        try {
            const { data } = await axios.post('/api/order/status', { orderId, status: newStatus })
            if (data.success) {
                await fetchOrders()
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium text-gray-800">Orders List</h2>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-5xl rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-4 min-w-[300px]">
                                <img className="w-12 h-12 object-contain opacity-70" src={assets.box_icon} alt="boxIcon" />
                                <div>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="mb-1">
                                            <p className="font-semibold text-gray-800">
                                                {item.product?.name || "Product Removed"} {" "}
                                                <span className="text-primary font-bold">x {item.quantity}</span>
                                            </p>
                                        </div>
                                    ))}
                                    <div className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                                        <p className='font-bold text-gray-700 uppercase mb-1'>{order.address.firstName} {order.address.lastName}</p>
                                        <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
                                        <p>{order.address.zipcode}, {order.address.country}</p>
                                        <p className="mt-1 font-medium text-primary">Phone: {order.address.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center md:items-start min-w-[120px]">
                                <p className="text-gray-500 text-sm">Amount</p>
                                <p className="font-bold text-xl text-gray-800 leading-none mt-1">{Currency}{order.amount}</p>
                                <p className={`text-[10px] mt-2 px-2 py-0.5 rounded-full font-bold uppercase ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {order.isPaid ? "Paid" : "Pending"}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center text-sm text-gray-500">
                                <p>Method: <span className="font-medium text-gray-700">{order.paymentType}</span></p>
                                <p>Date: <span className="font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                            </div>

                            <div className="flex flex-col justify-center min-w-[160px]">
                                <p className="text-xs text-gray-400 mb-1 font-bold uppercase">Status Management</p>
                                {order.status === 'Cancelled' ? (
                                    <div className="bg-red-50 text-red-500 font-bold py-2 px-4 rounded text-center border border-red-100">
                                        CANCELLED
                                    </div>
                                ) : (
                                    <select
                                        onChange={(event) => statusHandler(event, order._id)}
                                        value={order.status}
                                        className="p-2.5 font-medium border border-gray-300 rounded-md outline-primary bg-gray-50 cursor-pointer"
                                    >
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Packing">Packing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400 text-lg">No orders found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders