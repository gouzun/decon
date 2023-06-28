import React from 'react'
import Header from "../header/header.component";
import { useEffect,useState } from 'react';
import { BGCOLOR } from '../../utils/theme';
import CryptoJS from 'crypto-js';



const PaymentRedirect = () => {

    const [obj,setObj] = useState({});
    const [header,setHeader] = useState('PAYMENT PROCESSING');

    useEffect(() => {
        const handleCallback = async () => {
            try {

                const urlParams = new URLSearchParams(window.location.search);

                const paramsObject = Object.fromEntries(urlParams);
                console.log('paramsObject:', paramsObject);

                // const urlParams = new URLSearchParams('billplz%5Bid%5D=5il95qcc&billplz%5Bpaid%5D=true&billplz%5Bpaid_at%5D=2023-06-28+12%3A44%3A55+%2B0800&billplz%5Btransaction_id%5D=7AB89CE9ABCA&billplz%5Btransaction_status%5D=completed&billplz%5Bx_signature%5D=b9a147398ba9a6ead673ecfe2e1654734b551601f36a6d2b16e70bdaa51c19d6');

                const response = await fetch('https://inspectmynode.onrender.com/api/v1/validatebill', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paramsObject),

                });
                if (response.ok) {
                    const result = await response.json();
                    setObj(result.data);
                    console.log('redirect result', result);
                } else {
                    console.log('redirect response not ok');
                }

            } catch (error) {
                console.log(error)
            }
        };

        handleCallback();
    }, []);



    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: header }} />
            {obj?(<>
               <div>ID: {obj.billplzid}</div>
               <div>billplzpaid: {obj.billplzpaid}</div>
               <div>billplzpaid_at: {obj.billplzpaid_at}</div>
               <div>billplztransaction_id: {obj.billplztransaction_id}</div>
               <div>billplztransaction_status: {obj.billplztransaction_status}</div>
                         
               </>):''}
        </div></>
    )
}

export default PaymentRedirect