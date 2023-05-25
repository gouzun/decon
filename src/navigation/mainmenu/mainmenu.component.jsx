import Header from "../../component/header/header.component";
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext, useEffect } from "react";
import Footer from "../../component/footer/footer.component";
import { BUTTONCOLOR, LABELHOVERCOLOR, MAINMENU, MAINMENUBTN } from "../../utils/theme";

import { UserContext } from '../../context/user.context';
import {
    Button
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {

    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));

        }
        else {
            navigate('/');
        }

    }, []);


    return (<Fragment>
        <div className='flex justify-center w-full min-h-screen flex-col bg-gray-300' >
            <div className='grid grid-flow-row auto-rows-max items-center'>
                <Header headerText={{ title: 'MAIN MENU' }} />
                <div className={`${MAINMENU}`}><Link to='/addprojectfile'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">ADD PROJECT FILE</Button></Link></div>
                <div className={`${MAINMENU}`}><Link to='/adddefect'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">ADD NEW DEFECT</Button></Link></div>
                <div className={`${MAINMENU}`}><Link to='/viewdefects'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">VIEW DEFECT SUMMARY</Button></Link></div>
                <div className={`${MAINMENU}`}><Link to='/pdf'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">GENERATE PDF REPORT</Button></Link></div>
                <div className={`${MAINMENU}`}><Link to='/info'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">INFORMATION</Button></Link></div>
                <div className={`${MAINMENU}`}><Link to='/logout'><Button className={`${MAINMENUBTN} ${BUTTONCOLOR} ${LABELHOVERCOLOR} `} variant="gradient">LOG OUT</Button></Link></div>
                <Footer />
            </div></div>
        <Outlet /></Fragment >);
}
export default MainMenu;
