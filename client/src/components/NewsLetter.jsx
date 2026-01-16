import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const NewsLetter = () => {
    const { axios } = useAppContext();
    const [email, setEmail] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/newsletter/subscribe', { email });
            if (data.success) {
                toast.success(data.message);
                setEmail("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl font-semibold">Keep Up with Fresh Deals!</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get daily fresh offers, new harvests, and exclusive discounts
            </p>
            <form onSubmit={onSubmitHandler} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
    )
}
export default NewsLetter;