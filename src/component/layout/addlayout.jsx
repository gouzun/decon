import React from 'react'
import Loader from '../../utils/Loader';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';

import { Button } from "@material-tailwind/react";
import { generateProjectList, retrieveLayoutImg, storeImg, addProjectFlrUrl, retrieveDefectSummary, retrieveProjectLock } from '../../utils/firebase/firebase.utils';
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../context/generalcontext.component";
import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import { Select, Option } from "@material-tailwind/react";
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { FLOORDD } from '../../utils/theme';
import cam from '../../assets/img/camera.svg';
import layout from '../../assets/img/imglayout.jpg';
import Compressor from 'compressorjs';
import spinner from '../../assets/img/spinner.svg'
import { Fragment } from "react";
import {

    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";


const AddLayout = () => {
    const {
        projectList, setProjectList,
        imgLayout, setImgLayout,
        curProject, setCurProject,
        curFloor, setCurFloor,
        imgLayoutDisplay, setImgLayoutDisplay,


    } = useContext(GeneralContext);
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(null);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const navigate = useNavigate();
    const [rowCount, setRowCount] = useState(0);
    const [ele, setEle] = useState([]);

    let RowBgStyle = '';
    let row = 0;

    const handleFloorDD = async (value) => {
        setLoader(true);
        setCurFloor(value);
        try {

            if (curProject) {
                // console.log('handleFloorDD :', curProject + '-' + currentUser + '-' + value);
                const img = await retrieveLayoutImg(curProject, currentUser, value);
                if (img !== null) {
                    // setTimeout(() => { }, 2000);

                    setImgLayout(img);
                    setImgLayoutDisplay(img);

                } else {
                    console.log('layout not exist yet.');
                    setImgLayoutDisplay(layout);

                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoader(false);
        }

    };

    const handlePDD = async (value) => {

        setCurProject(value);
        // handleGetCurDefList(value, currentUser);
        try {
            if (curFloor) {
                // console.log('handlePDD :', value + '-' + currentUser + '-' + curFloor);
                const img = await retrieveLayoutImg(value, currentUser, curFloor);

                // let count =await handleSearchDefectCount();

                // setLock(prevLock => count);
                setImgLayout(img);
                setImgLayoutDisplay(img);

            }
        } catch (e) {
            if (e.code === 'storage/object-not-found') {
                setImgLayoutDisplay(layout);
            }
        };
    };


    const generateDropDown = async () => {
        if (!curProject) {
            const projectObj = await generateProjectList(currentUser);
            let arrProject = [];

            projectObj.forEach((project) => {
                arrProject.push(project.propertyName + '-' + project.ownerName);
            })
            setProjectList(arrProject);
        }
    };

    const onImgLayoutChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            new Compressor(image, {
                quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedResult) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.        
                    setImgLayout(compressedResult);
                },
            });
            setImgLayoutDisplay(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleAddFlrLayout = async () => {

        //check if layout already exisit
        const img = await retrieveLayoutImg(curProject, currentUser, curFloor);
        let count = await retrieveProjectLock(curProject, currentUser);

        if (img !== null && count > 0) {
            console.log('img exist');
            handleOpen();
        } else {
            console.log('img null');
            addLayout();
            fieldReset();
        }

    }

    const handleAddLayout = () => {
        addLayout();
        handleOpen();
        fieldReset();
    }

    const addLayout = async () => {

        if (typeof imgLayout === 'object') {
            await storeImg(imgLayout, curProject, currentUser, curFloor)
                .then(async (urlLayout) => {
                    await addProjectFlrUrl(curProject, curFloor, urlLayout, currentUser)
                })
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Layout plan added.</div>);
        } else {
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Transaction Failed. Please retry.</div>);
        }
        gridHandler();
    }

    const fieldReset = () => {
        setCurProject('');
        setCurFloor('');
        setImgLayoutDisplay('');
        setImgLayout('');
        setIsLoading('');
    }

    const gridHandler = async () => {
        try {
            const arrResult = await generateProjectList(currentUser);

            let result = [];
            arrResult.forEach((item, index) => {
                const property = item.propertyName || "";

                for (const key in item) {
                    if (key.includes("floor") && item[key]) {
                        const floor = key.replace(/floor/gi, "").toUpperCase();
                        const layout = item[key];

                        result.push({
                            NO: result.length + 1,
                            PROPERTYNAME: property,
                            FLOOR: floor,
                            LAYOUT: layout
                        });
                    }
                }
            });

            setRowCount(arrResult.length);
            setEle(result);
        } catch (e) {
            console.log(e);
            alert(e.message);
        }

    }



    useEffect(() => {
        generateDropDown();
        gridHandler();
        fieldReset();
        // setProjectDisplay(curProject);
    }, []);


    useEffect(() => {

        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));

        }
        else {
            navigate('/');
        }

    }, []);

    const handleSearchDefectCount = async () => {
        try {
            let count = 0;
            if (curProject && curFloor) {

                const defectlist = await retrieveDefectSummary(curProject, curFloor, currentUser);
                count = defectlist.length;
            }
            return count;

        }
        catch (error) {
            console.log(`Error :${error.code},${error.message}`);
        }

    };


    return (<>
        <div className='flex flex-col w-full items-center bg-gray-300 min-h-screen'>

            <div className='grid grid-flow-row auto-rows-max  items-center bg-gray-300 place-items-center' >
                <Header headerText={{ title: 'ADD LAYOUT IMAGE' }} />
            </div>

            {projectList ? <div id='pdd' className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-20'>
                <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handlePDD} value={curProject}  >
                    {projectList.map((item) => {
                        return (<Option key={item} value={item}>{item}</Option>);
                    })}
                </Select>
            </div> : <Loader />}

            <div id='fdd' className="w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-10">
                <Select label="FLOOR [*required]" value={curFloor} onChange={handleFloorDD}>

                    {FLOORDD.map((item) => (<Option key={item} value={item}>{item}</Option>))}


                </Select></div>
            <div className="flex flex-row items-center justify-center p-2">
                <label >
                    <img className='drop-shadow-lg shadow-lg' width={25} height={25} src={cam} alt='' />
                    <input
                        accept="image/png,image/jpeg"
                        type='file'
                        className="filetype"
                        onChange={onImgLayoutChange}
                        style={{ display: 'none' }}
                        onClick={() => document.querySelector('.filetype').click()}
                    />
                </label>

            </div>

            {loader ? <Loader /> : <div className="flex justify-center p-2 my-2"><img id='photo' className='drop-shadow-lg shadow-lg' style={{ height: '400px', width: '300px' }} src={imgLayoutDisplay ? imgLayoutDisplay : layout} alt='' /></div>}
            {isLoading}
            <div className="w-72 flex justify-center p-2 my-2 gap-2">
                <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleAddFlrLayout}>ADD</Button>
                <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" onClick={fieldReset}>RESET</Button>
            </div>

            <table className="w-80 rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className={`rounded-lg text-xs text-gray-700 uppercase ${NAVBARCOLOR} ${LABELCOLOR}`}>
                    <tr>
                        <th scope="col" className="py-3 px-6 text-center">
                            NO
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            PROPERTY NAME
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            FLOOR
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            LAYOUT
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {ele.map((item) => {
                        row = row + 1
                        if (row % 2) {

                            RowBgStyle = 'bg-gray-300 text-gray-900';
                        } else {
                            RowBgStyle = 'bg-gray-200 text-gray-900';

                        }

                        return (
                            <tr className={RowBgStyle} key={item["NO"]}>
                                <th scope="row" className="py-3 px-6 font-medium whitespace-nowrap dark:text-white text-center">
                                    {item["NO"]}
                                </th>
                                <td className="py-3 px-6 text-center">
                                    {item["PROPERTYNAME"]}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {item["FLOOR"]}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <img src={item["LAYOUT"]} alt='' height='200' width='150' />
                                </td>

                            </tr>
                        )
                    })}

                    <tr className={`border-b dark:border-gray-700 font-semibold h-10 ${NAVBARCOLOR}`}>
                        <td colSpan='4' align='center' className={`px-4 text-xs ${LABELCOLOR}`} >End of table</td>

                    </tr>
                </tbody>
            </table>
            <Footer />
        </div>
        <Fragment>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Layout Plan Exists</DialogHeader>
                <DialogBody divider>
                    Please note that there is already a layout plan existing in the database. Replacing the existing layout plan will have an impact on all the existing defect information stored in the database.This changes cannot be proceed.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>

                </DialogFooter>
            </Dialog>
        </Fragment></>
    )
}

export default AddLayout;
// <div className="flex flex-row items-center justify-center p-2"><label><img className='drop-shadow-lg shadow-lg' width={25} height={25} src={cam} alt='' /><input accept="image/png,image/jpeg" type='file' className="filetype" capture='environment' onChange={onImgLayoutChange} style={{ display: 'none' }} /></label></div>
