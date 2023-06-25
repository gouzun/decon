import React from 'react'
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { useEffect } from 'react';

import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';

const PaymentCallback = () => {
    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('payment-callback');
                // Get the payment details from the callback request
                // const response = await fetch('/api/payment-callback'); // Replace with the actual server-side endpoint URL

                // if (!response.ok) {
                //     throw new Error('Failed to fetch payment details');
                // }

                // // Parse the response data as JSON
                // const paymentData = await response.json();
                // console.log('paymentData:',paymentData);
            } catch (error) {
                console.log(error)
            }
        };

        handleCallback();
    }, []);

    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'PAYMENT COMPLETED' }} />
        </div></>
    )
}

export default PaymentCallback