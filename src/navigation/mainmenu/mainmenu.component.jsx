import Header from "../../component/header/header.component";
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext, useEffect } from "react";
import Footer from "../../component/footer/footer.component";
import { BUTTONCOLOR, LABELHOVERCOLOR, MAINMENU, MAINMENUBTN } from "../../utils/theme";

import { UserContext } from '../../context/user.context';

import { useNavigate } from 'react-router-dom';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";

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


    return (<>
        <div className='flex justify-center w-full min-h-screen flex-col bg-gray-300' >
            <div className='grid grid-flow-row auto-rows-max items-center'>
                <Header headerText={{ title: 'MAIN MENU' }} />

                <Footer />
            </div></div>
        <Outlet /></>);
}
export default MainMenu;
