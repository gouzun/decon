import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Select, Option, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { BGCOLOR } from '../../utils/theme';
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { Link } from 'react-router-dom';
import { NAVBARTEXTHOVER } from '../../utils/theme';
import { generateProjectList } from '../../utils/firebase/firebase.utils';

import { useState, useEffect, useContext, Fragment } from 'react';
import Loader from '../../utils/Loader';
import { GeneralContext } from '../../context/generalcontext.component';

const PricePage = () => {

    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [buyerName, setBuyerName] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [openExist, setOpenExist] = useState(false);
    const handleOpenExist = () => setOpenExist(!openExist);

    const {
        projectList, setProjectList,
    } = useContext(GeneralContext);

    const handleCreatePayment = async () => {
        if (buyerName === '' || selectedProject === '') {
            handleOpen();
        }
        else {
            console.log('in');

            try {
                //node
                let obj = {
                    email: sessionStorage.getItem('user'),
                    project: selectedProject,
                    name: buyerName.toUpperCase(),
                }

                const response = await fetch('https://inspectmynode.onrender.com/api/v1/createbill', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),

                });
                const result = await response.json();
                if (response.ok) {
                    // window.location.href = result.url;
                    window.open(result.url, '_blank');
                } else {
                    console.log('create bill response not ok');
                    console.log(result.message);
                    handleOpenExist();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading('');
            }
        }
    }

    const generateDropDown = async () => {
        try {
            const projectObj = await generateProjectList(sessionStorage.getItem('user'));
            let arrProject = [];

            projectObj.forEach((project) => {
                arrProject.push(project.propertyName + '-' + project.ownerName);
            })
            setProjectList(arrProject);
        } catch (err) {
            console.log('Unable to generate drop down.');
        }
    };

    const handleProjectChange = (value) => {

        setSelectedProject(value);
    }

    const handleBuyerName = (e) => {
        setBuyerName(e.target.value);
    }

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setLogged(true);
            generateDropDown();
        }
        else {
            setLogged(false);
        }
    }, []);

    const Mailto = ({ email, subject, body, ...props }) => {
        return (
            <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
                {props.children}
            </a>
        );
    }

    return (<>
        <div className={`flex flex-col justify-center items-center bg-gray-300 min-h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'PRICE RATE (RM)' }} />

            <div className="flex md:flex-row flex-col gap-6 pb-8">
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
                            <span className="mt-2 text-4xl">RM</span>20{" "}
                            <span className="self-end text-2xl">/property unit</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4 justify-center">What you will get :</li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect report with images</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect layout identification.</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect summary graph</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect status tracking</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Suitable for 1st/re-inspection</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">A4 size pdf report</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Receive report ON THE SPOT</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Ensure accurate documentation</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Ebook for How-To-Inspect</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Guidance provided</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Technical support</Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        {logged ? (<>
                            <div className='flex flex-col gap-4 pb-4'>
                                <div id='pdd' className='w-full flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-20'>
                                    <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handleProjectChange} value={selectedProject}>
                                        {projectList.map((item) => {
                                            return (<Option key={item} value={item}>{item}</Option>);
                                        })}
                                    </Select>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Buyer name"
                                        onChange={handleBuyerName}
                                        value={buyerName}
                                    />

                                </div>
                            </div>
                            <Button
                                size="lg"
                                color="white"
                                className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                                ripple={false}
                                fullWidth={true}
                                onClick={handleCreatePayment}
                            >
                                Buy Now
                                {loading ? <Loader /> : ''}
                            </Button></>) : (<Link to='/signin' className={`${NAVBARTEXTHOVER}`}><Button
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
                <Card color="blue" variant="gradient" className="w-full max-w-[20rem] p-8">
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
                            FOR DEFECT INSPECTOR / CONTRACTOR / PROPERTY AGENT / OTHERS
                        </Typography>
                        <Typography
                            variant="h1"
                            color="white"
                            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                        >
                            <span className="mt-2 text-4xl">TO BE QUOTED</span>
                            <span className="self-end text-2xl">/month</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4 justify-center">What you will get :</li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Unlimited project creation</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Customize report with logo</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Multiple concurrent users</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect report with images</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect layout identification.</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect summary graph</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Defect status tracking</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Cater multiple time inspection </Typography>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">A4 size pdf report</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Receive report ON THE SPOT</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Ensure accurate documentation</Typography>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Guidance provided</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <Typography className="font-normal">Technical support</Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry for INSPECTMY monthly service." body="" target="_blank">
                            <Button
                                size="lg"
                                color="white"
                                className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                                ripple={false}
                                fullWidth={true}
                            >
                                EMAIL US
                                {loading ? <Loader /> : ''}
                            </Button></Mailto>
                    </CardFooter>
                </Card>
            </div>

            <Footer />
        </div>
        <Fragment>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Insufficient Information</DialogHeader>
                <DialogBody divider>
                    Please select a project and input your name.
                </DialogBody>
                <DialogFooter>

                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={openExist} handler={handleOpenExist}>
                <DialogHeader>Bill Already Exists</DialogHeader>
                <DialogBody divider>
                    Bill for selected project already exists. Please go to account to check status.
                </DialogBody>
                <DialogFooter>

                    <Button variant="gradient" color="green" onClick={handleOpenExist}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </Fragment>
    </>
    )
}

export default PricePage