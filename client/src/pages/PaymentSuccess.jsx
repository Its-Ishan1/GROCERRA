import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { axios, setCartItems } = useAppContext();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = searchParams.get('session_id');
            const orderId = searchParams.get('order_id');

            if (!sessionId || !orderId) {
                toast.error('Invalid payment session');
                navigate('/cart');
                return;
            }

            try {
                const { data } = await axios.post('/api/order/verify-payment', {
                    sessionId,
                    orderId
                });

                if (data.success) {
                    toast.success('Payment successful! Your order has been placed.');
                    setCartItems({});
                    setTimeout(() => {
                        navigate('/my-orders');
                    }, 2000);
                } else {
                    toast.error(data.message || 'Payment verification failed');
                    navigate('/cart');
                }
            } catch (error) {
                toast.error(error.message || 'Payment verification failed');
                navigate('/cart');
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams, navigate, axios, setCartItems]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                {verifying ? (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                        <h2 className="text-2xl font-medium text-gray-700">Verifying Payment...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we confirm your payment</p>
                    </>
                ) : (
                    <>
                        <div className="text-green-600 text-6xl mb-4">✓</div>
                        <h2 className="text-2xl font-medium text-gray-700">Payment Successful!</h2>
                        <p className="text-gray-500 mt-2">Redirecting to your orders...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
