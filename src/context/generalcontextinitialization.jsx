
import { useContext} from "react";
import { GeneralContext } from "./generalcontext.component";


export const ContextInitialization = () => {
    const {  setXpos, setYpos,
         setProjectList,
        setCurDefectList,
         setImgDefect,
        setImgLayout,
         setCurProject,
        setCurFloor,
         setCurArea,
        setCurElement,
        setCurDefectDesc,
         setImgLayoutDisplay,
        setImgDefectDisplay,
        setCurRemark,
        setPropertyName,
        setOwnerName,
        setPropertyAdd
     } = useContext(GeneralContext);

    setXpos('');
    setYpos('');
    setPropertyName('');
    setOwnerName('');
    setPropertyAdd('');
    setProjectList([]);
    setCurDefectList([]);
    setImgLayout('');
    setImgDefect('');
    setCurProject('');
    setCurFloor('');
    setCurArea('');
    setCurElement('');
    setCurDefectDesc('');
    setCurRemark('');
    setImgLayoutDisplay('');
    setImgDefectDisplay('');

}