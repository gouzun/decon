import React, { useEffect, useContext, useState, useRef } from 'react';
import pin from '../../assets/img/pin-red.svg';
import layout from '../../assets/img/imglayout.jpg';
import defect from '../../assets/img/imgdefect.jpg';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { Resizable } from 're-resizable';
import { GeneralContext } from '../../context/generalcontext.component';
import {
    Select, Option,
} from "@material-tailwind/react";
import {
    Button, Textarea,
} from "@material-tailwind/react";
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import { addDefect, retrieveDefectListForProject, updateDefectListForProject, storeImg, generateProjectList } from '../../utils/firebase/firebase.utils';
import { FLOORDD, AREADD, ELEMENTDD, FLOORDEFECTS, INTERNALWALLDEFECTS, CEILINGDEFECTS, DOORDEFECTS, WINDOWSDEFECTS, INTERNALFIXTURESDEFECTS, ROOFDEFECTS, EXTERNALWALLDEFECTS, PERIMETREDEFECTS, CARPARKDEFECTS, MEDEFECTS, FENCINGANDDATEDEFECTS } from '../../utils/theme';
import Compressor from 'compressorjs';
import { retrieveLayoutImg } from '../../utils/firebase/firebase.utils';
import spinner from '../../assets/img/spinner.svg'
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { PINTEXTBLACK } from "../../utils/theme";
import { BUTTONCOLOR, LABELHOVERCOLOR } from '../../utils/theme';
import Loader from '../../utils/Loader';


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

    const [isLoading, setIsLoading] = useState(null);
    const [defects, setDefects] = useState([]);
    const [loader, setLoader] = useState(false);
    const [inputDesc, setInputDesc] = useState('');
    const [selectColor, setSelectColor] = useState('');
    const [textareColor, setTextareaColor] = useState('');
    const [areaArea, setAreaArea] = useState('');

    const [selectAreaColor, setSelectAreaColor] = useState('');
    const [areaAreaColor, setAreaAreaColor] = useState('');

    const fieldreset = () => {
        setXpos(0);
        setYpos(0);
        setMarker('');
        setImgDefectDisplay('');
        setImgDefect('');
        setCurDefectDesc('');
        setCurElement('');
        setProjectDisplay('');

        setDefects([]);
        setCurArea('');
        setInputDesc('');
        setTextareaColor('');
        setSelectColor('');
        setAreaAreaColor('');
        setSelectAreaColor('');

    }

    const navigate = useNavigate();

    const pageReloadResetField = () => {
        setXpos(0);
        setYpos(0);
        setMarker('');
        setImgDefectDisplay('');
        setImgDefect('');
        setCurDefectDesc('');
        setCurElement('');
        setProjectDisplay('');
        setDefects([]);
        setCurArea('');
        setImgLayout('');
        setImgLayoutDisplay('');
        setCurProject('');
        setCurFloor('');
        setTextareaColor('');
        setSelectColor('');
        setAreaAreaColor('');
        setSelectAreaColor('');
    }

    useEffect(() => {

        pageReloadResetField();
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

    const handleFloorDD = async (value) => {
        setLoader(true);
        setCurFloor(value);
        try {

            if (curProject) {

                const img = await retrieveLayoutImg(curProject, currentUser, value);
               
                setImgLayout(img);
                setImgLayoutDisplay(img);
             

            }
        } catch (e) {
            if (e.code === 'storage/object-not-found') {
                setImgLayoutDisplay(layout);
            }

        } finally {
            setLoader(false);
        }

    };

    const handleAreaDD = (value) => {
        setCurArea(value);
        setAreaArea('');
        setAreaAreaColor('error');
        setSelectAreaColor('success');
    };

    const handleAreaArea = (e) => {
        setCurArea(e.target.value);
        setAreaArea(e.target.value);
        setAreaAreaColor('success');
        setSelectAreaColor('error');
    }

    let DEFECTDD = [];

    const handleElementDD = (value) => {
        setCurElement(value);
        setCurDefectDesc('');
    };

    useEffect(() => {
        handleDefectReload();
    }, [curElement])


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
        setTextareaColor('error');
        setInputDesc('');
        setCurDefectDesc(value);
        setSelectColor('success');
    };



    const handleGetCurDefList = async (project, user) => {

        const tempDefectList = await retrieveDefectListForProject(project, user);

        setCurDefectList(tempDefectList);
    };


    const handleSetCurDefList = async (project, currentUser, latestDefect) => {
        const arr = await updateDefectListForProject(project, currentUser, latestDefect);
        setCurDefectList(arr);
    };

    const handleAddDefect = async () => {
        //to check if input are empty or only space, if all no empty only proceed to create
        try {

            if (curProject && curFloor && curArea && curElement && imgLayoutDisplay && curDefectDesc && imgDefectDisplay) {


                let defCount = 1 + curDefectList.length;

                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Updating record. <img src={spinner} alt='' /></div>);

                //check if record exist.
                const projectDefectList = await retrieveDefectListForProject(curProject, currentUser);
                while (projectDefectList.includes(curProject + '-' + currentUser + '-' + defCount)) {
                    defCount = defCount + 1;
                }

                await storeImg(imgDefect, curProject, currentUser, defCount)
                    .then(async (urlDefect) => {
                        await addDefect(curProject, curFloor, curArea, curElement, defCount, curDefectDesc.toUpperCase(), xpos, ypos + 2, urlDefect, currentUser)
                    })
                    .then(handleSetCurDefList(curProject, currentUser, defCount));

                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Defect no. {defCount} Added.</div>);

            } else {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72 drop-shadow-md shadow-md'>Please input all required fields.</div>);
            }
        } catch (e) {
            alert(e.message)
        } finally {
            fieldreset();
        }

    }

    const handlePDD = async (value) => {

        setCurProject(value);
        // setProjectDisplay(value => value);
        handleGetCurDefList(value, currentUser);
        try {
            if (curFloor) {

                const img = await retrieveLayoutImg(value, currentUser, curFloor);

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
        // setProjectDisplay(curProject);
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

        console.log('corX:', corX);
        console.log('corY:', corY);

        setMarker(<div><div style={{ position: "absolute", top: y - 37, left: x - 17 }} ><Draggable bounds={{ top: -100, left: -100, right: 100, bottom: 100 }} {...dragHandlers}
        >
            <Resizable
                defaultSize={{
                    width: 35,
                    height: 35
                }}
                style={{
                    background: `url(${pin})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}
                lockAspectRatio={true}
                enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            >
            </Resizable>

        </Draggable></div>
        </div>);

        setXpos(corX);
        setYpos(corY);

    
    }

    
    const handleInputDesc = (e) => {
        setCurDefectDesc(e.target.value);
        setInputDesc(e.target.value);
        setTextareaColor('success');
        setSelectColor('error');

    }

    const onStart = () => {

    };

    const onStop = (e, data) => {
        setXpos(data.x);
        setYpos(data.y);
    };

    const dragHandlers = { onStart, onStop };
    const imageRef = useRef(null);
    const [position, setPosition] = useState({ top: '', left: '' });

    const getImageStartPosition = () => {
        const imageElement = imageRef.current;
        if (imageElement) {
            const { top, left } = imageElement.getBoundingClientRect();
            const { naturalWidth, naturalHeight } = imageElement;
            const { scrollX, scrollY } = window;
            const currentPosition = {
                top: top + scrollY,
                left: left + scrollX,
                width: naturalWidth,
                height: naturalHeight
            };
            // console.log('Image current position:', currentPosition);
            setPosition(currentPosition);
        }
    };

    useEffect(() => {
        const updateSize = () => {
            console.log('updateSize');
            getImageStartPosition();
        };

        const imageElement = imageRef.current;
        if (imageElement && imageElement.complete) {
            // Image is already loaded, call getImageStartPosition immediately
            getImageStartPosition();
        } else {
            // Image is not loaded yet, set onload event
            imageElement.onload = () => {
                getImageStartPosition();
            };
        }

        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);


    // useEffect(() => {
    //     getImageStartPosition();
    // }, [imgLayoutDisplay]);


    return (

        <div className='flex justify-center w-full items-center bg-gray-300'>

            <div className='grid grid-flow-row auto-rows-max items-center bg-gray-300 place-items-center'>
                <Header headerText={{ title: 'CREATE NEW DEFECT ITEM' }} />

                <div id='pdd' className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-20'>
                    <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handlePDD} onClick={handlePDDIndex} value={curProject}>
                        {projectList.map((item) => {
                            return (<Option key={item} value={item}>{item}</Option>);
                        })}
                    </Select>
                </div>
                <div id='fdd' className="w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-10">
                    <Select label="FLOOR [*required]" onChange={handleFloorDD} value={curFloor} onClick={handleFDDIndex}>

                        {FLOORDD.map((item) => (<Option key={item} value={item}>{item}</Option>))}

                    </Select></div>

                <Header headerText={{ title: 'DRAG PIN ON DEFECT POSITION' }} />
                {loader ? <Loader /> : (<>
                    {imgLayoutDisplay ? (<><div className='z-10' style={{ position: 'absolute', left: position.left - 27.5, top: position.top - 55 }}>
                        <Draggable {...dragHandlers} bounds={{ top: 0, left: 0, right: 299, bottom: 399 }}
                        >
                            <Resizable
                                defaultSize={{
                                    width: 55,
                                    height: 55
                                }}
                                style={{
                                    background: `url(${pin})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                lockAspectRatio={true}
                                enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                            >
                            </Resizable>

                        </Draggable>

                    </div>
                        <div className="flex justify-center p-2 my-2">
                            <img id='photo' className='drop-shadow-lg shadow-lg' style={{ height: '400px', width: '300px' }} src={imgLayoutDisplay ? imgLayoutDisplay : layout} alt='' ref={imageRef} /></div></>) :

                        (<>
                            <div className="flex justify-center p-2 my-2">
                                <img id='photo' className='drop-shadow-lg shadow-lg' style={{ height: '300px', width: '300px' }} src={imgLayoutDisplay ? imgLayoutDisplay : layout} alt='' ref={imageRef} /></div></>)}
                </>)}


                <Header headerText={{ title: 'SELECT OR KEY IN AREA [*chose either one]' }} />

                <div id='area' className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-50">
                    {selectAreaColor === 'success' ? (<Select label="SELECT FROM AREA LIST[*]" onChange={handleAreaDD} onClick={handleAreaIndex} value={curArea} success>
                        {AREADD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>) : (selectAreaColor === '' ? (<Select label="SELECT FROM AREA LIST[*]" onChange={handleAreaDD} onClick={handleAreaIndex} value={curArea}>
                        {AREADD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>) : (<Select label="SELECT FROM AREA LIST[*]" onChange={handleAreaDD} onClick={handleAreaIndex} value={curArea} error>
                        {AREADD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>))}
                </div>

                <div id='area' className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                    {areaAreaColor === 'success' ? (<Textarea label="KEY IN AREA [*]" onChange={handleAreaArea} value={areaArea} success>
                    </Textarea>) : (areaAreaColor === '' ? (<Textarea label="KEY IN AREA [*]" onChange={handleAreaArea} value={areaArea}>
                    </Textarea>) : (<Textarea label="KEY IN AREA [*]" onChange={handleAreaArea} value={areaArea} error>
                    </Textarea>))}
                </div>
                <div id='element' className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-40">
                    <Select label="ELEMENT [*required]" onChange={handleElementDD} onClick={handleElementIndex} value={curElement}>
                        {ELEMENTDD.sort().map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select></div>
                <Header headerText={{ title: 'CLICK BELOW TO TAKE IMAGE' }} />
                <div className="flex justify-center p-2 my-2"><label><img className='drop-shadow-lg shadow-lg' height='400' width='300' src={imgDefectDisplay ? imgDefectDisplay : defect} alt='' /><input accept='image/*”' type='file' className="filetype" capture='environment' onChange={onImgDefectChange} style={{ display: 'none' }} /></label></div>

                <Header headerText={{ title: 'SELECT OR KEY IN A DEFECT [*chose one]' }} />


                <div className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-40">
                    {selectColor === 'success' ? (<Select label="SELECT FROM DEFECT LIST [*]" onChange={handleDefectDesc} size="lg" success defaultValue={curDefectDesc} >
                        {defects.map((item) => (<Option className='text-sm' key={item} value={item.toUpperCase()}>{item.toUpperCase()}</Option>))}
                    </Select>) : (selectColor === '' ? (<Select label="SELECT FROM DEFECT LIST [*]" onChange={handleDefectDesc} size="lg" defaultValue={curDefectDesc}>
                        {defects.map((item) => (<Option className='text-sm' key={item} value={item.toUpperCase()}>{item.toUpperCase()}</Option>))}
                    </Select>) : (<Select label="SELECT FROM DEFECT LIST [*]" onChange={handleDefectDesc} size="lg" error defaultValue={curDefectDesc}>
                        {defects.map((item) => (<Option className='text-sm' key={item} value={item.toUpperCase()}>{item.toUpperCase()}</Option>))}
                    </Select>))}

                </div>

                <div className="w-80 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-30">
                    {textareColor === 'success' ? <Textarea label="KEY IN DEFECT DESCRIPTION [*]" value={inputDesc} onChange={handleInputDesc} success>
                    </Textarea > : (textareColor === '' ? (<Textarea label="KEY IN DEFECT DESCRIPTION [*]" value={inputDesc} onChange={handleInputDesc} ></Textarea >) : (<Textarea label="KEY IN DEFECT [*]" value={inputDesc} onChange={handleInputDesc} error></Textarea>)
                    )}
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
