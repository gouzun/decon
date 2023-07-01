import React from 'react'
import { BGCOLOR } from '../../utils/theme';
import Header from "../header/header.component";
import Footer from "../footer/footer.component";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";

import { useEffect, useState } from 'react';
import Loader from '../../utils/Loader';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [spinner, setSpinner] = useState('');
    const [logged, setLogged] = useState(false);
    const [ele,setEle] = useState([]);

    const TABLE_HEAD = ["Trans ID", "Amount", "Paid Date", "Project","Status"];

    // const TABLE_ROWS = [
    //     {
    //         id: "asdasd1",
    //         amount: "5555",
    //         date: "Wed 3:00pm",
    //         status: "paid",
    //         project: "defect project",

    //     },
    //     {
    //         id: "asdasd2",
    //         amount: "5555",
    //         date: "Wed 3:00pm",
    //         status: "paid",
    //         project: "defect project",

    //     },
    //     {
    //         id: "asdasd3",
    //         amount: "5555",
    //         date: "Wed 3:00pm",
    //         status: "paid",
    //         project: "defect project",

    //     },
    //     {
    //         id: "asdasd4",
    //         amount: "5555",
    //         date: "Wed 3:00pm",
    //         status: "paid",
    //         project: "defect project",

    //     },

    // ];
    const navigate = useNavigate();

    const handleAccCheck = async () => {
        console.log('in');
        setSpinner(true);
        try {
            //node
           
            const response = await fetch('https://inspectmynode.onrender.com/api/v1/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: sessionStorage.getItem('user') }),

            });
            if (response.ok) {
                const result = await response.json();
                
                setEle(result.data);
                // window.location.href = result.url;
                // window.open(result.url, '_blank');
            } else {
                console.log('account response not ok');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSpinner('');
        }
    }

    const handleURL = (url) => {
        
        window.open(url, '_blank');
    }

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setLogged(true);

            handleAccCheck();
        }
        else {
            setLogged(false);
            navigate('/');
        }
       
    }, [])

    return (
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'ACCOUNT DETAILS' }} />
            
            {spinner ? (<Loader />) : (<><Card className="h-full  w-full px-2 py-4">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-center gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Recent Transactions
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                            ACCOUNT :  {sessionStorage.getItem('user')}
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ele?(ele.map(
                                ({ id, amount, paid_at, state,project,url }, index) => {
                                    const isLast = index === ele.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {id}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {(amount/100).toFixed(2)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {paid_at}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {project}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                   {state==='paid'?(<Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={state}
                                                    color={"green"}
                                                />):(<Button                                                    
                                                    color={"amber"}
                                                    onClick={()=>handleURL(url)}
                                                >MAKE PAYMENT</Button>)}
                                                    

                                                    
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                },
                            )):''}
                        </tbody>
                    </table>
                </CardBody>

            </Card></>)}
            <Footer />
        </div>
    )
}

export default AccountPage