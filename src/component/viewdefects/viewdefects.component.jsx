import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import dustbin from '../../assets/img/dustbin.png';
import pending from '../../assets/img/pending.png';
import completed from '../../assets/img/complete.png';
import { GeneralContext } from '../../context/generalcontext.component';
import { useContext, useState, useEffect } from "react";

import { generateProjectList, deleteDefect, updateProjectStatus } from '../../utils/firebase/firebase.utils';
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import {
    Select, Option,

} from "@material-tailwind/react";
import { retrieveDefectSummary, retrieveLayoutImg, } from '../../utils/firebase/firebase.utils';
import { FLOORDD } from "../../utils/theme.js";
import pin from '../../assets/img/pin-red.svg';
import spinner from '../../assets/img/spinner.svg';
import { UserContext } from '../../context/user.context';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Loader from "../../utils/Loader";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const ViewDefects = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {
        projectList, setProjectList,
        curFloor, setCurFloor,
        curProject, setCurProject, render,
        projectDisplay, setProjectDisplay
    } = useContext(GeneralContext);
    const [marker, setMarker] = useState('');
    const [isLoading, setIsLoading] = useState(null);

    const [rowCount, setRowCount] = useState(0);
    const [ele, setEle] = useState([]);
    const [getImg, setGetImg] = useState('');

    let RowBgStyle = '';
    let row = 0;
    const [itemToDelete, setItemToDelete] = useState('');
    const [defToSet, setDefToSet] = useState('');
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const handleOpen = (value) => {
        setOpen(!open);
    }
    const handleOpenStatus = (value) => {
        setOpenStatus(!openStatus);
    }

    const confirmDelete = (invToDelete) => {
        setItemToDelete(invToDelete);
        handleOpen();
    }

    const handleDelete = () => {
        if (currentUser !== 'test@gmail.com') {
            if (itemToDelete) {
                deleteDefect(curProject, itemToDelete, currentUser);
                handleSearch();
            }
        } else {
            alert('Delete is disabled in test account.');
        }

        handleOpen();

    }

    const confirmSetStatus = (def, status) => {
        setDefToSet(def);
        setStatus(status);
        setOpenStatus(status);
        handleOpenStatus();
    }
    const handleSetStatus = () => {
        if (defToSet) {
            updateProjectStatus(curProject, defToSet, status, currentUser);
            handleSearch();
        }

        handleOpenStatus();
    }

    const handlePDD = (value) => {
        setCurProject(value);
        setProjectDisplay(value => value);

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

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));

        }
        else {
            navigate('/');
        }

        generateDropDown();
    }, []);


    const fieldReset = () => {
        setCurFloor('');
        setCurProject('');
        setEle('');
    }

    const handleSearch = async () => {
        try {
            setMarker('');
            if (curProject && curFloor) {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Searching for records. <img src={spinner} alt='' /></div>);

                const img = await retrieveLayoutImg(curProject, currentUser, curFloor);
                setGetImg(img);

                await retrieveDefectSummary(curProject, curFloor, currentUser).then((arrResult) => {

                    setEle(arrResult);
                    setRowCount(arrResult.length);
                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Summary generated.</div>)

                });

            }else{
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Please select a project and floor.</div>);
            
            }

        }
        catch (error) {
            console.log(`Error :${error.code},${error.message}`);
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Item not exist!</div>);
            handleInitWithoutLoading();
        }

    };

    const handleFloorDD = (value) => {
        setCurFloor(value);
    };

    const handleInit = () => {
        setCurFloor('');
        setCurProject('');
        setEle([]);
        setRowCount(0);
        setIsLoading('');
        setGetImg('');
        setProjectList([]);
        setProjectDisplay('');
    };

    const handleInitWithoutLoading = () => {

        setEle([]);
        setRowCount(0);
        setGetImg('');
    };

    useEffect(() => {

        let strJsx = [];

        if (curFloor) {
            ele.forEach((rec) => {
                strJsx.push(<div key={rec["rowcount"]}>
                    <div style={{ top: document.getElementById('photo').offsetTop + Number(rec.defectypos) - 36, left: document.getElementById('photo').offsetLeft + Number(rec.defectxpos) - 17, zIndex: 1, position: 'absolute' }}>
                        <img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>

                    <div style={{ top: document.getElementById('photo').offsetTop + Number(rec.defectypos) - 35, left: document.getElementById('photo').offsetLeft + Number(rec.defectxpos) - 6, zIndex: 1, position: 'absolute' }}>
                        <div style={{ color: 'black', fontWeight: 700 }}>{rec["rowcount"]}</div>
                    </div>
                </div>);
            });
        }
        setMarker(strJsx);
    }, [ele])

    useEffect(() => {
        function updateSize() {
            let strJsx = [];

            if (curFloor) {
                ele.forEach((item) => {

                    strJsx.push(<div key={item["rowcount"]}>
                        <div style={{ top: document.getElementById('photo').offsetTop + Number(item.defectypos) - 36, left: document.getElementById('photo').offsetLeft + Number(item.defectxpos) - 17, zIndex: 1, position: 'absolute' }}>
                            <img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>

                        <div style={{ top: document.getElementById('photo').offsetTop + Number(item.defectypos) - 35, left: document.getElementById('photo').offsetLeft + Number(item.defectxpos) - 6, zIndex: 1, position: 'absolute' }}>
                            <div style={{ color: 'black', fontWeight: 700 }}>{item["rowcount"]}</div>
                        </div>
                    </div>);
                });
            }
            setMarker(strJsx);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [ele]);

    const handleProjectIndex = () => {
        const projectDD = document.getElementById('projectDD');
        const floorDD = document.getElementById('flr');
        projectDD.style.zIndex = '100';
        floorDD.style.zIndex = '10';
        generateDropDown();
    }
    const handleFloorIndex = () => {

        const projectDD = document.getElementById('projectDD');
        const floorDD = document.getElementById('flr');
        projectDD.style.zIndex = '10';
        floorDD.style.zIndex = '100';
    }

    //to force rerender after performed delete in child component.


    useEffect(() => {
        generateDropDown();
    }, [currentUser]);

    useEffect(() => {

        fieldReset();
        // setProjectDisplay(curProject);
    }, []);



    return (
        <div className='grid grid-flow-row auto-rows-max w-full min-h-screen flex flex-col place-items-center items-center bg-gray-300 place-items-center' >
            <div className='grid place-items-center items-center bg-gray-300 place-items-center w-full flex overflow-x-auto'>
                <Header headerText={{ title: 'VIEW DEFECTS SUMMARY' }} />

                {projectList ? <div id='projectDD' className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100'>
                    <Select label="SELECT PROJECT [*required]" onChange={handlePDD} onClick={handleProjectIndex} value={projectDisplay}>
                        {projectList.map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>
                </div> : <Loader />}
                <div id='flr' className="w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 ">
                    <Select label="FLOOR" onChange={handleFloorDD} value={curFloor} onClick={handleFloorIndex} >
                        {FLOORDD.map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select></div>
                {isLoading}

                <div className="w-72 flex justify-center p-2 my-2 gap-2">
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleSearch}>SEARCH</Button>
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleInit}>RESET</Button>

                </div>

                <div className='flex justify-center text-sm py-2 h-10 font-semibold'>Record(s) found : {rowCount}</div>
                {getImg ? <div className="flex justify-center p-2 my-2 w-full "><img id='photo' className='drop-shadow-lg shadow-lg' style={{ height: '400px', width: '300px' }} src={getImg} alt='' /></div> : <div className="flex justify-center p-2 my-2 w-full "></div>}


                {marker}

                <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defects.</div>
                <div className={`flex items-top w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>
                    {ele ? ele.map((item) => {
                        row++;
                        let bghead = '';
                        let bgbody = '';
                        if (item.status.toUpperCase() === 'PENDING') {
                            bghead = 'bg-yellow-500';
                            bgbody = 'bg-yellow-100';
                        } else {
                            bghead = 'bg-green-500';
                            bgbody = 'bg-green-100';
                        }
                        return (

                            <Card id={item["rowcount"]} className={`w-80 drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4 ${bgbody}`}>
                                <CardHeader id={item["rowcount"]} floated={false} style={{ height: '400px', width: '300px' }} className=''>
                                    <div className={`flex justify-center ${bghead}`}>
                                        {row}/{ele.length}
                                    </div>
                                    <img src={item["url"]} alt="" className="card-image object-contain" style={{ height: '400px', width: '300px' }} />
                                </CardHeader>
                                <CardBody id={item["rowcount"]} className="card-body h-80">
                                    <Typography id={item["rowcount"]} className="flex flex-col justify-start text-base ">
                                        <div className='pb-3'>DEFECT INDEX: {item["rowcount"]}</div>
                                        <div className='pb-3'>FLOOR: {item["floor"]}</div>
                                        <div className='pb-3'>AREA: {item["area"]}</div>
                                        <div className=' h-14'>ELEMENT: {item["element"]}</div>
                                        <div className=' h-24'>DEFECT DESC: {item["defectDesc"].toUpperCase()}</div>
                                        {item["status"] === 'COMPLETED' ? (<div className=' text-light-green-800  font-bold'>DEFECT STATUS: {item["status"].toUpperCase()}</div>) : (<div className=' text-red-800  font-bold'>DEFECT STATUS: {item["status"].toUpperCase()}</div>)}
                                    </Typography>
                                </CardBody>
                                <CardFooter id={item["rowcount"]} divider className="flex items-center justify-center gap-4">
                                    {item["status"] === 'COMPLETED' ? <img src={pending} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmSetStatus(item["defectName"], item["status"])} /> :
                                        <img src={completed} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmSetStatus(item["defectName"], item["status"])} />}
                                    <img src={dustbin} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmDelete(item["defectName"])} />

                                </CardFooter>
                            </Card>
                        )
                    }) : ''
                    }
                </div>
                <Dialog open={open} handler={handleOpen} size='xl'>
                    <DialogHeader className='bg-red-100'>Confirm delete?</DialogHeader>
                    <DialogBody divider>
                        This will removed the selected defect item.Click confirm to proceed.
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
                        <Button variant="gradient" color="green" onClick={handleDelete}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
                <Dialog open={openStatus} handler={handleOpenStatus} size='xl'>
                    <DialogHeader className='bg-red-100'>Update status?</DialogHeader>
                    <DialogBody divider>
                        This will update defect status to {status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'}.Click confirm to proceed.
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpenStatus}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleSetStatus}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>


                <Footer />

            </div></div>

    );
}
export default ViewDefects;