import Header from "../header/header.component";
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme';
import { useContext, useEffect } from "react";
import { UserContext } from '../../context/user.context';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { GeneralContext } from "../../context/generalcontext.component";

import ContactUs from "../contactus/contactus.component";
const SignOut = () => {
    const { setCurrentUser } = useContext(UserContext);
    const { setXpos, setYpos,
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
        setPropertyAdd, setUserLoggedOut
    } = useContext(GeneralContext);

    const navigate = useNavigate();
    const handleLogOut = (event) => {

        signOutUser();
        setCurrentUser('');
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
        setUserLoggedOut(true);
        sessionStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));
        }
        else {
            navigate('/');
        }
    }, []);

    return (<div className='flex flex-col justify-center bg-gray-300 h-full'>
        <Header headerText={{ title: 'CLICK BUTTON TO SIGN OUT.' }} />

        <div className="flex justify-center items-center mx-2 py-3 gap-2">
            User logged in : {sessionStorage.getItem('user')}
        </div>
        <div className="flex justify-center items-center mx-2 py-8 gap-2">
            <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" onClick={handleLogOut}>Confirm Log Out</Button>

        </div>
        <Header headerText={{ title: 'DEVELOPER INFORMATION' }} />
        <div className="flex justify-center items-center mx-2 py-3 gap-2 text-xs">
            webapp version : 1.0 Beta Version.
        </div>

        <ContactUs screen={'small'} />

    </div>)
}
export default SignOut;