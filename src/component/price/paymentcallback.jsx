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
    let obj ={
        id: '',
        paid: '',
        paid_at: '',
        transaction_id: '',
        transaction_status: '',
      }
    let sign = '';

    const constructSourceString = (inputObj) => {
        console.log(inputObj);
        const sortedKeys = Object.keys(inputObj).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
    
        const sourceString = sortedKeys
          .map(key => {
            const value = inputObj[key];
            return `${key}${value}`;
          })
          .join('|');
    
        return sourceString;
      };

    const signSourceString = () => {
        const sourceString = constructSourceString(obj);
        const signature = CryptoJS.HmacSHA256(sourceString, xSignatureKey).toString();
        
        return signature;
      };

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('payment-redirect');
                
                // const urlParams = new URLSearchParams(window.location.search);
                const urlParams = new URLSearchParams('billplz%5Bid%5D=dif57g6v&billplz%5Bpaid%5D=true&billplz%5Bpaid_at%5D=2023-06-27+22%3A31%3A18+%2B0800&billplz%5Btransaction_id%5D=EA41430DE49A&billplz%5Btransaction_status%5D=completed&billplz%5Bx_signature%5D=b888ac1925a1a8b412ccf119c5c01c2f4ab00ad9545210e2d459203dc5fc564c');
                let objInput=''
                objInput.id = urlParams.get('billplz[id]');
                objInput.paid = urlParams.get('billplz[paid]');
                objInput.paid_at = urlParams.get('billplz[paid_at]');
                objInput.transaction_id = urlParams.get('billplz[transaction_id]');
                objInput.transaction_status = urlParams.get('billplz[transaction_status]');
                let sign = urlParams.get('billplz[x_signature]');
                console.log(objInput)
                obj = objInput
                // You can now use the retrieved data as needed
                console.log('obj :', objInput);
                
                const xSignature = signSourceString();
   
                console.log('Constructed Source String signature:', constructSourceString());
                console.log('XSignature Value:', xSignature);
                console.log('sign Value:', sign);


            } catch (error) {
                console.log(error)
            }
        };

        handleCallback();
    }, [obj]);

    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'PAYMENT COMPLETED' }} />
        </div></>
    )
}

export default PaymentCallback