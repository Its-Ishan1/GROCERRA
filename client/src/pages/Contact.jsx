import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { axios } = useAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/contact/submit', formData);
            if (data.success) {
                toast.success(data.message);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="py-12 px-6 md:px-0">
            {/* Header Section */}
            <div className="text-center flex flex-col items-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Get In Touch</h1>
                <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
                <p className="text-gray-500 max-w-lg">
                    Have a question or just want to say hi? We'd love to hear from you.
                    Our team is always here to help you get the best out of Grocerra.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start justify-center max-w-6xl mx-auto">

                {/* Contact Information */}
                <div className="w-full lg:w-1/3 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-hover duration-300 hover:shadow-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Our Location</p>
                                    <p className="text-gray-500 text-sm">45, Green Tech Park, HSR Layout, Sector 6, Bangalore, India 560102</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Email Us</p>
                                    <p className="text-gray-500 text-sm">support@grocerra.dev</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Call Us</p>
                                    <p className="text-gray-500 text-sm">+91 98765 43210</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-100 pt-8">
                            <h4 className="font-bold text-gray-900 mb-4">Working Hours</h4>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-medium text-gray-700">9:00 AM - 8:00 PM</span></li>
                                <li className="flex justify-between"><span>Sat - Sun:</span> <span className="font-medium text-gray-700">10:00 AM - 6:00 PM</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-2/3 bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>

                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                            <input
                                type="text"
                                required
                                className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
                                placeholder="How can we help you?"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Your Message</label>
                            <textarea
                                rows="5"
                                required
                                className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition resize-none"
                                placeholder="Write your message here..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dull transition-all shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
