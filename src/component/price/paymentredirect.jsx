import React from 'react'
import { useEffect, useState } from 'react';
import { BGCOLOR } from '../../utils/theme';
import Loader from '../../utils/Loader';
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { NAVBARTEXTHOVER } from '../../utils/theme';

const PaymentRedirect = () => {

    const [obj, setObj] = useState({});
    const [header, setHeader] = useState('PAYMENT PROCESSING');
    const [tryAgain, setTryAgain] = useState(false);
    const [spinner, setSpinner] = useState('');

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    useEffect(() => {
        const handleCallback = async () => {
            try {
                setSpinner(true);
                const urlParams = new URLSearchParams(window.location.search);
                
                const paramsObject = Object.fromEntries(urlParams);
           
                if (!isEmptyObject(paramsObject)) {

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
                      
                        if (result.data.billplzpaid === 'true' && result.data.billplztransaction_status === 'completed') {
                            setHeader('PAYMENT COMPLETED');
                        } else {
                            setHeader('PAYMENT UNSUCCESSFUL');
                            setTryAgain(true);
                        }
                    } else {
                        console.log('redirect response not ok');
                        setHeader('Security key error.Please try again.');
                    }
                } else {
                    console.log('paramsObject empty');
                }

            } catch (error) {
                console.log(error)
            }finally{
                setSpinner('');
            }
        };

        handleCallback();
    }, []);

    const handleRetry = () => {
        window.location.href = 'https://www.billplz.com/bills/' + obj.billplzid;
    }

    // const handleClick = ()=>{
    //     <Link to='/account' className={`${NAVBARTEXTHOVER}`}>BACK TO ACCOUNT</Link>
    // }


    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>

            {obj ? (<>

                <Card className="mt-6 w-96">
                    <CardBody>
                    {spinner?(<Loader/>):
                        (<><Typography variant="h4" color="blue-gray" className="mb-8">
                            {header}
                        </Typography>
                        <Typography variant="h6">
                            <div className='flex flex-col'>
                                <div className='flex flex-row pb-4'><div className='text-left w-48'>BILL ID</div><div className='text-left w-48'>{obj.billplzid}</div></div>
                                <div className='flex flex-row pb-4'><div className='text-left w-48'>TRANS ID</div><div className='text-left w-48'>{obj.billplztransaction_id}</div></div>
                                <div className='flex flex-row pb-4'><div className='text-left w-48'>TRANS STATUS</div><div className='text-left w-48'>{obj.billplztransaction_status}</div></div>
                                <div className='flex item-center justify-center pt-4'><div className='text-center'>RECEIPT HAS BEEN SENT TO YOUR EMAIL</div></div>
                                <div className='flex item-center justify-center py-3'><Link to='/account' className={`${NAVBARTEXTHOVER}`}><Button>BACK TO MY ACCOUNT</Button></Link></div>
                            </div>
                        </Typography></>)}
                    </CardBody>
                </Card>

            </>) : ''}
            {tryAgain ? (<Button className="mt-4" onClick={handleRetry}>RETRY</Button>) : ''}

        </div></>
    )
}

export default PaymentRedirect