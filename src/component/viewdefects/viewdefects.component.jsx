import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { GeneralContext } from '../../context/generalcontext.component';
import { useContext, useState, useEffect } from "react";

import { generateProjectList } from '../../utils/firebase/firebase.utils';
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import {
    Select, Option, Button,

} from "@material-tailwind/react";
import { retrieveDefectSummary, retrieveLayoutImg, } from '../../utils/firebase/firebase.utils';
import { FLOORDD } from "../../utils/theme.js";
import pin from '../../assets/img/pin-red.svg';
import spinner from '../../assets/img/spinner.svg';
import { UserContext } from '../../context/user.context';

import { useMediaQuery } from 'react-responsive';
import ViewMobile from "./viewMobile";
import ViewDesktop from "./viewDesktop";
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {

        fieldReset();
        // setProjectDisplay(curProject);
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

    // useEffect(() => {
    //     console.log('ere');
    //     handleSearch();

    // }, [render]);


    return (
        <div className='grid grid-flow-row auto-rows-max w-full min-h-screen flex flex-col place-items-center items-center bg-gray-300 place-items-center' >
            <div className='grid place-items-center items-center bg-gray-300 place-items-center w-full flex overflow-x-auto'>
                <Header headerText={{ title: 'VIEW DEFECTS SUMMARY' }} />

                <div id='projectDD' className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100'>
                    <Select label="SELECT PROJECT [*required]" onChange={handlePDD} onClick={handleProjectIndex} value={projectDisplay}>
                        {projectList.map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>
                </div>
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

                {ele ? <ViewMobile ele={ele} /> : ''}


                <Footer />

            </div></div>

    );
}
export default ViewDefects;