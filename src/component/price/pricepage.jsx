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
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';
import Header from "../header/header.component";
import Footer from "../footer/footer.component";


const PricePage = () => {

    let sandbox = 'https://www.billplz-sandbox.com/api/'


    const handleCreatePayment = async () => {
        console.log('in');
        // let obj = {
        //     "Authorization": "a5c23f94-92b4-4044-8b4a-0fc248187e9e",
        //     "title": "My First API Collection",
        // }


        // // Encode JSON string to base64
        // const paramsJson = JSON.stringify(obj);

        // // Encode JSON string to base64
        // const paramsBase64 = btoa(paramsJson);
        // console.log(paramsBase64);

        // let apilink = 'https://www.billplz-sandbox.com/api/';
        let authlink = 'https://www.billplz-sandbox.com/api/v4/webhook_rank';
        let createCollection = 'v4/collections';
        const apiKey = 'a5c23f94-92b4-4044-8b4a-0fc248187e9e';

        const data = new URLSearchParams();
        data.append('title', 'My First V4 API Collection');

        const url = authlink;
        console.log('url:', url);

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${apiKey}:`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        };

        // try {
        //     const response = await fetch(url, options);
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error(error);
        // }

        //node
        const response = await fetch('https://localhost:5173/api/v1/userlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
          
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }
    }

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
                        <Button
                            size="lg"
                            color="white"
                            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            ripple={false}
                            fullWidth={true}
                            onClick={handleCreatePayment}
                        >
                            Buy Now
                        </Button>
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