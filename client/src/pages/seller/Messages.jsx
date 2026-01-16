import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Messages = () => {
    const { axios } = useAppContext();
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get('/api/contact/messages');
            if (data.success) {
                setMessages(data.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const { data } = await axios.post('/api/contact/update-status', { id, status });
            if (data.success) {
                toast.success(data.message);
                fetchMessages();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="flex-1 p-6 md:p-10 bg-gray-50 overflow-y-auto h-[95vh]">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Customer Messages</h2>
                <p className="text-gray-500">Manage inquiries received through the contact form.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.length > 0 ? messages.map((msg, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/10 rounded-full text-primary font-bold">
                                    {msg.name[0].toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{msg.name}</h4>
                                    <p className="text-sm text-gray-500">{msg.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${msg.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                        msg.status === 'reviewed' ? 'bg-blue-100 text-blue-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {msg.status}
                                </span>
                                <p className="text-sm text-gray-400">
                                    {new Date(msg.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold text-gray-800 mb-1">Subject: {msg.subject}</p>
                            <p className="text-gray-600 italic">"{msg.message}"</p>
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={msg.status}
                                onChange={(e) => updateStatus(msg._id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1 outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400">No messages found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
