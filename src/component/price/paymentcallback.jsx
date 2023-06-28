import React from 'react'
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { useEffect } from 'react';
import { enc, HmacSHA256 } from 'crypto-js';
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';
import CryptoJS from 'crypto-js';
import { useState } from 'react';

// import dotenv from 'dotenv-webpack';
// dotenv.config();
const PaymentCallback = () => {
    const [xSignatureKey, setXSignatureKey] = useState('S-eoIF74Bg1fI_K2mu7Mc3xA');
    const [obj, setObj] = useState({
        billplzid: '',
        billplzpaid: '',
        billplzpaid_at: '',
        billplztransaction_id: '',
        billplztransaction_status: '',
    });

    let sign = '';

    const constructSourceString = (objInput) => {
        const filteredParams = Object.entries(objInput)
            .filter(([key]) => key !== 'x_signature')
            .map(([key, value]) => `${key}${value}`);

        const sortedParams = filteredParams.sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );

        const sourceString = sortedParams.join('|');

        return sourceString;
    };

    const signSourceString = (objInput) => {

        const sourceString = constructSourceString(objInput);

        const signature = CryptoJS.HmacSHA256(sourceString, 'S-eoIF74Bg1fI_K2mu7Mc3xA').toString();

        return signature;
    };

    useEffect(() => {
        const handleCallback = async () => {
            try {

                const urlParams = new URLSearchParams(window.location.search);
                // const urlParams = new URLSearchParams('billplz%5Bid%5D=5il95qcc&billplz%5Bpaid%5D=true&billplz%5Bpaid_at%5D=2023-06-28+12%3A44%3A55+%2B0800&billplz%5Btransaction_id%5D=7AB89CE9ABCA&billplz%5Btransaction_status%5D=completed&billplz%5Bx_signature%5D=b9a147398ba9a6ead673ecfe2e1654734b551601f36a6d2b16e70bdaa51c19d6');

                let objInput = {};
                objInput.billplzid = urlParams.get('billplz[id]');
                objInput.billplzpaid = urlParams.get('billplz[paid]');
                objInput.billplzpaid_at = urlParams.get('billplz[paid_at]');
                objInput.billplztransaction_id = urlParams.get('billplz[transaction_id]');
                objInput.billplztransaction_status = urlParams.get('billplz[transaction_status]');
                let sign = urlParams.get('billplz[x_signature]');


                const xSignature = signSourceString(objInput);
                if (xSignature === sign) {
                    console.log("key match!");
                } else {
                    console.log('xSignature:', xSignature);
                    console.log('sign:', sign);
                }

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