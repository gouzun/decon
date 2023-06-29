import React from 'react'
import { useEffect, useState } from 'react';
import { BGCOLOR } from '../../utils/theme';
import { GeneralContext } from '../../context/generalcontext.component';
import { useContext } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


const PaymentRedirect = () => {

    const [obj, setObj] = useState({});
    const [header, setHeader] = useState('PAYMENT PROCESSING');
    const [tryAgain, setTryAgain] = useState(false);
    const { bill, setBill } = useContext(GeneralContext);

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    useEffect(() => {
        const handleCallback = async () => {
            try {

                const urlParams = new URLSearchParams(window.location.search);

                const paramsObject = Object.fromEntries(urlParams);
                console.log('paramsObject:', paramsObject);

                if (!isEmptyObject(paramsObject)) {

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
                        console.log(result.data.billplzpaid, ' ', result.data.billplztransaction_status);
                        if (result.data.billplzpaid === 'true' && result.data.billplztransaction_status === 'completed') {
                            setHeader('PAYMENT SUCCESSFUL');
                        } else {
                            setHeader('PAYMENT UNSUCCESSFUL');
                            setTryAgain(true);
                        }
                        console.log('redirect result', result);
                    } else {
                        console.log('redirect response not ok');
                        setHeader('Security key error.Please try again.');
                    }
                } else {
                    console.log('paramsObject empty');
                }

            } catch (error) {
                console.log(error)
            }
        };

        handleCallback();
    }, []);

    const handleRetry = ()=>{
        window.location.href = 'https://www.billplz-sandbox.com/bills/' + obj.billplzid;
    }


    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
           
            {obj ? (<>               

                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            {header}
                        </Typography>
                        <Typography>
                        <div className='flex flex-col'>
                            <div className='flex flex-row pb-4'><div className='text-left w-48'>BILL ID</div><div className='text-left w-48'>{obj.billplzid}</div></div>
                            <div className='flex flex-row pb-4'><div className='text-left w-48'>BILL STATUS</div><div className='text-left w-48'>{obj.billplzpaid}</div></div>
                            <div className='flex flex-row pb-4'><div className='text-left w-48'>TRANS ID</div><div className='text-left w-48'>{obj.billplztransaction_id}</div></div>
                            <div className='flex flex-row pb-4'><div className='text-left w-48'>TRANS STATUS</div><div className='text-left w-48'>{obj.billplztransaction_status}</div></div>
                        </div>
                        </Typography>
                    </CardBody>                   
                </Card>

            </>) : ''}
            {tryAgain ? (<Button className="mt-4" onClick={handleRetry}>RETRY</Button>) : ''}

        </div></>
    )
}

export default PaymentRedirect