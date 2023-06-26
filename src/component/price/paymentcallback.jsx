import React from 'react'
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { useEffect } from 'react';
git ini
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';

const PaymentCallback = () => {
    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('payment-redirect');
                const urlParams = new URLSearchParams(window.location.search);
                const billplzId = urlParams.get('billplz[id]');
                const isPaid = urlParams.get('billplz[paid]');
                const paidAt = urlParams.get('billplz[paid_at]');
                const transactionId = urlParams.get('billplz[transaction_id]');
                const transactionStatus = urlParams.get('billplz[transaction_status]');
                const xSignature = urlParams.get('billplz[x_signature]');

                // You can now use the retrieved data as needed
                console.log(billplzId);
                console.log(isPaid);
                console.log(paidAt);
                console.log(transactionId);
                console.log(transactionStatus);
                console.log(xSignature);
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