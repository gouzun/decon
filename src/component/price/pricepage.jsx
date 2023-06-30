import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { BGCOLOR } from '../../utils/theme';
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { Link } from 'react-router-dom';
import { NAVBARTEXTHOVER } from '../../utils/theme';
import { UserContext } from '../../context/user.context';
import { useState, useEffect } from 'react';
import Loader from '../../utils/Loader';

const PricePage = () => {

    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState('');

    const handleCreatePayment = async () => {
        console.log('in');
        setLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Updating record. </div>);
        try {
            //node
            const response = await fetch('https://inspectmynode.onrender.com/api/v1/createbill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            if (response.ok) {
                const result = await response.json();
                // window.location.href = result.url;
                window.open(result.url, '_blank');
            } else {
                console.log('create bill response not ok');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading('');
        }
    }


    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
    }, []);

    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'PRICE RATE (RM)' }} />
            <div className="flex md:flex-row flex-col gap-6">
                <Card color="indigo" variant="gradient" className="w-full max-w-[20rem] p-8">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                    >
                        <Typography
                            variant="small"
                            color="white"
                            className="font-normal uppercase"
                        >
                            FOR ALL USERS
                        </Typography>
                        <Typography
                            variant="h1"
                            color="white"
                            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                        >
                            <span className="mt-2 text-4xl">RM</span>15{" "}
                            <span className="self-end text-2xl">/project</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Ads free</Typography>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Summary graph included</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">A4 printable pdf report</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Technical support provided</Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        {logged ? (<Button
                            size="lg"
                            color="white"
                            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            ripple={false}
                            fullWidth={true}
                            onClick={handleCreatePayment}
                        >
                            Buy Now
                            {loading?<Loader/>:''}
                        </Button>) : (<Link to='/signin' className={`${NAVBARTEXTHOVER}`}><Button
                            size="lg"
                            color="white"
                            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            ripple={false}
                            fullWidth={true}
                        >
                            Login/Sign Up Now
                        </Button></Link>)}

                    </CardFooter>
                </Card>
                {/*<Card color="light-green" variant="gradient" className="w-full max-w-[20rem] p-8">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                    >
                        <Typography
                            variant="small"
                            color="white"
                            className="font-normal uppercase"
                        >
                            FOR DEFECT INSPECTOR/AGENT/OTHERS
                        </Typography>
                        <Typography
                            variant="h1"
                            color="white"
                            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                        >
                            <span className="mt-2 text-4xl">RM</span>250{" "}
                            <span className="self-end text-2xl">/mth</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Ads free</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Unlimited projects</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Summary graph included</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">A4 printable pdf report</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Technical support provided</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Save time on your reports!</Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        <Button
                            size="lg"
                            color="white"
                            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            ripple={false}
                            fullWidth={true}
                        >
                            Buy Now
                        </Button>
                    </CardFooter>
    </Card>*/}
            </div>
            <Footer />
        </div>
    </>
    )
}

export default PricePage