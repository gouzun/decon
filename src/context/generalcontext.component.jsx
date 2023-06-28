import { createContext, useState } from "react";

export const GeneralContext = createContext({
    xpos: '',
    setXpos: () => { },
    ypos: '',
    setYpos: () => { },
    propertyName: '',
    setPropertyName: () => { },
    ownerName: '',
    setOwnerName: () => { },
    propertyAdd: '',
    setPropertyAdd: () => { },
    projectList: '',
    setProjectList: () => { },
    curDefectList: '',
    setCurDefectList: () => { },

    imgDefect: '',
    setImgDefect: () => { },
    imgLayout: '',
    setImgLayout: () => { },
    curProject: '',
    setCurProject: () => { },
    curFloor: '',
    setCurFloor: () => { },
    curArea: '',
    setCurArea: () => { },
    curElement: '',
    setCurElement: () => { },
    curRemark: '',
    setCurRemark: () => { },
    curDefectDesc: '',
    setCurDefectDesc: () => { },
    imgLayoutDisplay: '',
    setImgLayoutDisplay: () => { },
    imgDefectDisplay: '',
    setImgDefectDisplay: () => { },
    userLoggedOut: false,
    setUserLoggedOut: () => { },
    render: '',
    setRender: () => { },
    contact: '',
    setContact: () => { },
    projectDisplay: '',
    setProjectDisplay: () => { },
    defects: '',
    setDefects: () => { },
});



export const GeneralProvider = ({ children }) => {

    const [xpos, setXpos] = useState('');
    const [ypos, setYpos] = useState('');

    const [propertyName, setPropertyName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [propertyAdd, setPropertyAdd] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [curDefectList, setCurDefectList] = useState([]);

    const [imgLayout, setImgLayout] = useState('');
    const [imgDefect, setImgDefect] = useState('');
    const [curProject, setCurProject] = useState('');
    const [curFloor, setCurFloor] = useState('');
    const [curArea, setCurArea] = useState('');
    const [curElement, setCurElement] = useState('');

    const [curDefectDesc, setCurDefectDesc] = useState('');
    const [curRemark, setCurRemark] = useState('');
    const [imgLayoutDisplay, setImgLayoutDisplay] = useState('');
    const [imgDefectDisplay, setImgDefectDisplay] = useState('');
    const [userLoggedOut, setUserLoggedOut] = useState(false);
    const [render, setRender] = useState('');
    const [contact, setContact] = useState('');

    const [defects, setDefects] = useState([]);
    const [projectDisplay, setProjectDisplay] = useState('');

    const value = {
        xpos, setXpos, ypos, setYpos,
        propertyName, setPropertyName,
        ownerName, setOwnerName,
        propertyAdd, setPropertyAdd,
        projectList, setProjectList,
        curDefectList, setCurDefectList,
        imgDefect, setImgDefect,
        imgLayout, setImgLayout,
        curProject, setCurProject,
        curFloor, setCurFloor,
        curArea, setCurArea,
        curElement, setCurElement,
        curDefectDesc, setCurDefectDesc,
        curRemark, setCurRemark,
        imgLayoutDisplay, setImgLayoutDisplay,
        imgDefectDisplay, setImgDefectDisplay,
        userLoggedOut, setUserLoggedOut,
        render, setRender, contact, setContact, projectDisplay, setProjectDisplay,
        defects, setDefects
    };

    return (<GeneralContext.Provider value={value}>{children}</GeneralContext.Provider >)
};