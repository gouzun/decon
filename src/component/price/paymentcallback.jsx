import React from 'react'
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { useEffect } from 'react';
import crypto from 'crypto';


import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';

const PaymentCallback = () => {
    const calculateXSignature = async (params, apiKey) => {
        // Sort the parameters alphabetically by key
        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        // Create a new TextEncoder instance
        const encoder = new TextEncoder();

        // Convert the sortedParams to a string
        const paramString = JSON.stringify(sortedParams);

        // Encode the string into a Uint8Array
        const encodedData = encoder.encode(paramString);

        // Import the API key as a CryptoKey
        const keyData = encoder.encode(apiKey);
        const importedKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);

        // Calculate the HMAC-SHA256 hash using the imported key
        const signature = await crypto.subtle.sign('HMAC', importedKey, encodedData);

        // Convert the signature to a hexadecimal string
        const hexSignature = Array.from(new Uint8Array(signature))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');

        return hexSignature;
    };



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
                console.log('billplzId:', billplzId);
                console.log('isPaid:', isPaid);
                console.log('paidAt:', paidAt);
                console.log('transactionId:', transactionId);
                console.log('transactionStatus:', transactionStatus);
                console.log('xSignature:', xSignature);

                const hexSignature = calculateXSignature(
                    {
                        id: billplzId,
                        paid: isPaid,
                        paid_at: paidAt,
                        transaction_id: transactionId,
                        transaction_status: transactionStatus,
                    },
                    process.env.API_KEY
                );
                console.log('hexSignature:', hexSignature);
                console.log('xSignature:', xSignature);

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