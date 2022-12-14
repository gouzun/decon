import React, { useEffect, useContext, useState } from 'react';
import pin from '../../assets/img/pin-red.svg';
import layout from '../../assets/img/imglayout.jpg';
import defect from '../../assets/img/imgdefect.jpg';
import cam from '../../assets/img/camera.svg';

import { GeneralContext } from '../../context/generalcontext.component';

import { Select, Option } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import { addDefect, retrieveDefectListForProject, updateDefectListForProject, storeImg, generateProjectList, addProjectFlrUrl } from '../../utils/firebase/firebase.utils';
import { FLOORDD, AREADD, ELEMENTDD, FLOORDEFECTS, INTERNALWALLDEFECTS, CEILINGDEFECTS, DOORDEFECTS, WINDOWSDEFECTS, INTERNALFIXTURESDEFECTS, ROOFDEFECTS, EXTERNALWALLDEFECTS, PERIMETREDEFECTS, CARPARKDEFECTS, MEDEFECTS, FENCINGANDDATEDEFECTS } from '../../utils/theme';
import Compressor from 'compressorjs';
import { retrieveLayoutImg } from '../../utils/firebase/firebase.utils';
import spinner from '../../assets/img/spinner.svg'
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { PINTEXTBLACK } from "../../utils/theme";
import { BUTTONCOLOR, LABELHOVERCOLOR } from '../../utils/theme';


const CreateDefectPage1 = () => {
    const { xpos, setXpos, ypos, setYpos,
        projectList, setProjectList,
        curDefectList, setCurDefectList,
        imgDefect, setImgDefect,
        imgLayout, setImgLayout,
        curProject, setCurProject,
        curFloor, setCurFloor,
        curArea, setCurArea,
        curElement, setCurElement,
        curDefectDesc, setCurDefectDesc,
        imgLayoutDisplay, setImgLayoutDisplay,
        imgDefectDisplay, setImgDefectDisplay,
        projectDisplay, setProjectDisplay

    } = useContext(GeneralContext);
    const [marker, setMarker] = useState('');
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [imgLoad, setImgLoad] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [defects, setDefects] = useState([]);
    const [defectDisplay, setDefectDisplay] = useState('');

    const fieldreset = () => {
        setXpos(0);
        setYpos(0);
        setMarker('');
        setImgDefectDisplay(defect);
        setImgDefect(defect);
        setCurDefectDesc('');
        setCurElement('');
        setProjectDisplay('');
        setDefectDisplay('');
        setDefects([]);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));
        }
        else {
            navigate('/');
        }

    }, []);


    const onImgDefectChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            new Compressor(image, {
                quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedResult) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.        
                    setImgDefect(compressedResult);
                },
            });
            // setImgDefect(event.target.files[0]);
            setImgDefectDisplay(URL.createObjectURL(event.target.files[0]));
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

    const handleFloorDD = async (value) => {
        setCurFloor(value);
        try {
            setImgLoad(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Searching layout <img src={spinner} alt='' /></div>);
            if (curProject) {

                const img = await retrieveLayoutImg(curProject + '-' + value);

                setTimeout(() => { }, 2000);

                setImgLayout(img);
                setImgLayoutDisplay(img);
                setImgLoad('');
            }
        } catch (e) {
            if (e.code === 'storage/object-not-found') {
                setImgLayoutDisplay(layout);
            }
            setImgLoad('');
        };

    };

    const handleAreaDD = (value) => {
        setCurArea(value);
    };

    let DEFECTDD = [];
    const handleElementDD = (value) => {
        setCurElement(value);
        setCurDefectDesc('');
        setDefects([]);
    };


    const handleDefectReload = () => {
        switch (curElement) {
            case 'FLOOR':
                DEFECTDD = FLOORDEFECTS;
                break;
            case 'WALL':
                DEFECTDD = INTERNALWALLDEFECTS;
                break;
            case 'CEILING':
                DEFECTDD = CEILINGDEFECTS;
                break;
            case 'DOOR':
                DEFECTDD = DOORDEFECTS;
                break;
            case 'WINDOW':
                DEFECTDD = WINDOWSDEFECTS;
                break;
            case 'INTERNAL FIXTURE':
                DEFECTDD = INTERNALFIXTURESDEFECTS;
                break;
            case 'ROOF':
                DEFECTDD = ROOFDEFECTS;
                break;
            case 'EXTERNAL WALL':
                DEFECTDD = EXTERNALWALLDEFECTS;
                break;
            case 'APRON,DRAIN OR DRAIN COVER':
                DEFECTDD = PERIMETREDEFECTS;
                break;
            case 'CARPARK AND CARPORCH':
                DEFECTDD = CARPARKDEFECTS;
                break;
            case 'M&E':
                DEFECTDD = MEDEFECTS;
                break;
            case 'FENCE AND GATE':
                DEFECTDD = FENCINGANDDATEDEFECTS;
                break;

            default:
                DEFECTDD = [];
        }
        setDefects(DEFECTDD);
    }


    const handleDefectDesc = (value) => {
        // setDefectDisplay(value => value);
        setCurDefectDesc(value);
    };



    const handleGetCurDefList = async (project, user) => {

        const tempDefectList = await retrieveDefectListForProject(project, user);

        setCurDefectList(tempDefectList);
    };


    const handleSetCurDefList = async (project, latestDefect) => {
        const arr = await updateDefectListForProject(project, latestDefect, currentUser);
        setCurDefectList(arr);
    };

    const handleAddDefect = async () => {
        //to check if input are empty or only space, if all no empty only proceed to create
        try {
            if (curProject && curFloor && curArea && curElement && imgLayoutDisplay && curDefectDesc && imgDefectDisplay && marker) {

                let defCount = 1 + curDefectList.length;

                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Updating record. <img src={spinner} alt='' /></div>);

                //check if record exist.
                const projectDefectList = await retrieveDefectListForProject(curProject, currentUser);
                while (projectDefectList.includes(curProject + '-' + defCount)) {
                    defCount = defCount + 1;
                }

                await storeImg(imgDefect, `${curProject}-${defCount}`)
                    .then(async (urlDefect) => {
                        await addDefect(curProject, curFloor, curArea, curElement, defCount, curDefectDesc.toUpperCase(), xpos, ypos, urlDefect, currentUser)
                    })
                    .then(handleSetCurDefList(curProject, defCount));


                if (typeof imgLayout === 'object') {
                    await storeImg(imgLayout, `${curProject}-${curFloor}`)
                        .then(async (urlLayout) => {
                            await addProjectFlrUrl(curProject, curFloor, urlLayout, currentUser)
                        }).then(fieldreset())
                        .then(
                            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Defect no. {defCount} Added.</div>)
                        );
                } else {
                    fieldreset();

                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Defect no. {defCount} Added.</div>);

                }

            } else {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72 drop-shadow-md shadow-md'>Please input all required fields.</div>);
            }
        } catch (e) {
            alert(e.message)
        }

    }

    const handlePDD = async (value) => {

        setCurProject(value);
        setProjectDisplay(value => value);
        handleGetCurDefList(value, currentUser);
        try {
            if (curFloor) {

                const img = await retrieveLayoutImg(value + '-' + curFloor);

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

    useEffect(() => {
        generateDropDown();
        setProjectDisplay(curProject);
    }, [currentUser]);


    const handleAreaIndex = () => {
        const area = document.getElementById('area');
        const element = document.getElementById('element');
        area.style.zIndex = '100';
        element.style.zIndex = '10';
    }

    const handleElementIndex = () => {
        const area = document.getElementById('area');
        const element = document.getElementById('element');
        area.style.zIndex = '10';
        element.style.zIndex = '100';
    }

    const handlePDDIndex = () => {
        const pdd = document.getElementById('pdd');
        const fdd = document.getElementById('fdd');
        pdd.style.zIndex = '100';
        fdd.style.zIndex = '10';
    }

    const handleFDDIndex = () => {
        const fdd = document.getElementById('fdd');
        const pdd = document.getElementById('pdd');
        fdd.style.zIndex = '100';
        pdd.style.zIndex = '10';
    }



    let corX = 0;
    let corY = 0;
    let x = 0;
    let y = 0;
    let eleX = 0;
    let eleY = 0;

    const showCoords = (event) => {

        x = event.pageX;
        y = event.pageY;
        eleX = document.getElementById('photo').offsetLeft;
        eleY = document.getElementById('photo').offsetTop;
        corX = x - eleX;
        corY = y - eleY;

        setMarker(<div><div style={{ position: "absolute", top: y - 37, left: x - 17 }} ><img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>
            <div style={{ position: "absolute", top: y - 37 + 3, left: x - 17 + 10 }} >
                <div style={{
                    color: { PINTEXTBLACK }, fontWeight: 700
                }}  >{1 + curDefectList.length}</div></div></div>);

        const xPercentage = corX / document.getElementById('photo').clientWidth * 100
        const yPercentage = corY / document.getElementById('photo').clientWidth * 100
        setXpos(xPercentage);
        setYpos(yPercentage);

        // setXpos(corX);
        // setYpos(corY);
    }



    useEffect(() => {
        function updateSize() {
            setMarker(<div><div style={{ position: "absolute", top: document.getElementById('photo').offsetTop + (document.getElementById('photo').clientWidth * ypos / 100) - 37, left: document.getElementById('photo').offsetLeft + (document.getElementById('photo').clientWidth * xpos / 100) - 17, zIndex: '100' }}>
                <img id='1' src={pin} alt='' style={{ width: 35, height: 35 }} /></div>
                <div style={{ position: "absolute", top: document.getElementById('photo').offsetTop + (document.getElementById('photo').clientWidth * ypos / 100) - 37 + 5, left: document.getElementById('photo').offsetLeft + (document.getElementById('photo').clientWidth * xpos / 100) - 17 + 10, zIndex: '100' }}>
                    <div style={{
                        color: { PINTEXTBLACK }, fontWeight: 700
                    }}>{1 + curDefectList.length}</div></div ></div>);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [xpos, ypos]);

    useEffect(() => {
        // if (curProject) {
        //     setProjectDisplay(curProject);
        // }
    }, [])

    return (

        <div className='flex justify-center w-full items-center bg-gray-300'>

            <div className='grid grid-flow-row auto-rows-max items-center bg-gray-300 place-items-center'>
                <Header headerText={{ title: 'CREATE NEW DEFECT ITEM' }} />

                <div id='pdd' className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-20'>
                    <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handlePDD} onClick={handlePDDIndex} value={projectDisplay}>
                        {projectList.map((item) => {
                            return (<Option key={item} value={item}>{item}</Option>);
                        })}
                    </Select>

                </div>
                <div id='fdd' className="w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-10">
                    <Select label="FLOOR [*required]" onChange={handleFloorDD} value={curFloor} onClick={handleFDDIndex}>

                        {FLOORDD.map((item) => (<Option key={item} value={item}>{item}</Option>))}

                    </Select></div>

                {imgLoad}
                <div className="flex flex-col items-center justify-center p-2"><label><img className='drop-shadow-lg shadow-lg' width={25} height={25} src={cam} alt='' /><input accept="image/png,image/jpeg" type='file' className="filetype" capture='environment' onChange={onImgLayoutChange} style={{ display: 'none' }} /></label></div>

                <div className='text-center'><Header headerText={{ title: 'CLICK ON LAYOUT TO MARK DEFECT LOCATION' }} /></div>

                <div className="flex justify-center p-2 my-2"><img id='photo' className='drop-shadow-lg shadow-lg w-80 h-80' src={imgLayoutDisplay ? imgLayoutDisplay : layout} alt='' onClick={showCoords} /></div>
                {marker}
                <div id='area' className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-30">
                    <Select label="AREA [*required]" onChange={handleAreaDD} onClick={handleAreaIndex} value={curArea}>
                        {AREADD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select></div>

                <div id='element' className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-40">
                    <Select label="ELEMENT [*required]" onChange={handleElementDD} onClick={handleElementIndex} value={curElement}>
                        {ELEMENTDD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select></div>
                <Header headerText={{ title: 'CLICK ON IMAGE BELOW TO TAKE IMAGE' }} />
                <div className="flex justify-center p-2 my-2"><label><img className='drop-shadow-lg shadow-lg w-80 h-100' src={imgDefectDisplay ? imgDefectDisplay : defect} alt='' /><input accept='image/*???' type='file' className="filetype" capture='environment' onChange={onImgDefectChange} style={{ display: 'none' }} /></label></div>

                <div className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-40">
                    <Select label="DEFECT DESCRIPTION [*required]" onChange={handleDefectDesc} size="lg" onClick={handleDefectReload}>
                        {defects.map((item) => (<Option className='text-sm' key={item} value={item.toUpperCase()}>{item.toUpperCase()}</Option>))}
                    </Select>
                </div>

                <div className="flex justify-center p-2 my-2 gap-2">{isLoading}</div>
                <div className="flex justify-center p-2 my-2 gap-2">
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" onClick={handleAddDefect}>ADD</Button>
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" onClick={fieldreset}>RESET</Button>
                </div>
                <Footer />
            </div>

        </div >
    );

}

export default CreateDefectPage1;
