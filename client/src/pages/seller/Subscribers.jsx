import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Subscribers = () => {
    const { axios } = useAppContext();
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        try {
            const { data } = await axios.get('/api/newsletter/subscribers');
            if (data.success) {
                setSubscribers(data.subscribers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    return (
        <div className="flex-1 p-6 md:p-10 bg-gray-50 overflow-y-auto h-[95vh]">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h2>
                <p className="text-gray-500">View all customers who have subscribed to your newsletter.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">#</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Email Address</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Subscription Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {subscribers.length > 0 ? subscribers.map((sub, index) => (
                            <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(sub.date).toLocaleDateString()} at {new Date(sub.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                            </tr>
                        )) : !loading && (
                            <tr>
                                <td colSpan="3" className="px-6 py-20 text-center text-gray-400">
                                    No subscribers found yet.
                                </td>
                            </tr>
                        )}
                        {loading && (
                            <tr>
                                <td colSpan="3" className="px-6 py-10 text-center">
                                    <div className="animate-pulse flex items-center justify-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subscribers;
