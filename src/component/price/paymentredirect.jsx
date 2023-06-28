import React from 'react'
import Header from "../header/header.component";
import { useEffect } from 'react';
import { BGCOLOR } from '../../utils/theme';
import CryptoJS from 'crypto-js';


const PaymentRedirect = () => {

    // const constructSourceString = (objInput) => {
    //     const filteredParams = Object.entries(objInput)
    //         .filter(([key]) => key !== 'x_signature')
    //         .map(([key, value]) => `${key}${value}`);

    //     const sortedParams = filteredParams.sort((a, b) =>
    //         a.toLowerCase().localeCompare(b.toLowerCase())
    //     );

    //     const sourceString = sortedParams.join('|');

    //     return sourceString;
    // };

    // const signSourceString = (objInput) => {

    //     const sourceString = constructSourceString(objInput);

    //     const signature = CryptoJS.HmacSHA256(sourceString, process.env.X_KEY).toString();

    //     return signature;
    // };

    useEffect(() => {
        const handleCallback = async () => {
            try {

                const urlParams = new URLSearchParams(window.location.search);
                // const urlParams = new URLSearchParams('billplz%5Bid%5D=5il95qcc&billplz%5Bpaid%5D=true&billplz%5Bpaid_at%5D=2023-06-28+12%3A44%3A55+%2B0800&billplz%5Btransaction_id%5D=7AB89CE9ABCA&billplz%5Btransaction_status%5D=completed&billplz%5Bx_signature%5D=b9a147398ba9a6ead673ecfe2e1654734b551601f36a6d2b16e70bdaa51c19d6');

                const response = await fetch('https://inspectmynode.onrender.com/api/v1/createbill', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: urlParams,

                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('redirect result', result);
                } else {
                    console.log('response not ok');
                }


                // let objInput = {};
                // objInput.billplzid = urlParams.get('billplz[id]');
                // objInput.billplzpaid = urlParams.get('billplz[paid]');
                // objInput.billplzpaid_at = urlParams.get('billplz[paid_at]');
                // objInput.billplztransaction_id = urlParams.get('billplz[transaction_id]');
                // objInput.billplztransaction_status = urlParams.get('billplz[transaction_status]');
                // let sign = urlParams.get('billplz[x_signature]');


                // const xSignature = signSourceString(objInput);
                // if (xSignature === sign) {
                //     console.log("key match!");
                // } else {
                //     console.log('xSignature:', xSignature);
                //     console.log('sign:', sign);
                // }

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

export default PaymentRedirect