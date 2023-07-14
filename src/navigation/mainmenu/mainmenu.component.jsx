import Header from "../../component/header/header.component";
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from "react";
import Footer from "../../component/footer/footer.component";
import { BUTTONCOLOR, LABELHOVERCOLOR, MAINMENU, MAINMENUBTN } from "../../utils/theme";

import { UserContext } from '../../context/user.context';

import { useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

const MainMenu = () => {

    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

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
                <div className=' px-24'>  <Fragment >
                    <Accordion open={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                            What is Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            How to use Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            What can I do with Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                </Fragment>
                </div>
                <Footer />
            </div></div>
        <Outlet /></>);
}
export default MainMenu;
