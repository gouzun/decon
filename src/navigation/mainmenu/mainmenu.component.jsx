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
            <div className='grid grid-flow-row auto-rows-max  items-center'>
                <Header headerText={{ title: 'HOW TO USE' }} />

                <div className=' px-16 text-center py-8'>To begin a new project, firstly you need to complete Step 1 and Step 2.
                <br /><br /> Once these initial steps are finished, you can proceed with Step 3 repeatedly until all defects are added into the system.
                </div>
                <div className=' px-16'>  <Fragment >
                
                    <Accordion open={open === 1} >
                        <AccordionHeader onClick={() => handleOpen(1)} className='flex justify-start'>
                            1.Add a project.
                        </AccordionHeader>
                        <AccordionBody className='h-72 overflow-y-auto'>
                            "Project" refers to the property for which you require defect inspection. <br /><br /> A project can have multiple defects.<br /><br /> To proceed, please click on 'ADD PROJECT' icon and provide the project name, owner's name, contact number, and property address. <br /><br />These details will be included in the defect report to enable the defect team to contact you for rectification purposes.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className='flex justify-start'>
                            2.Add layout plan.
                        </AccordionHeader>
                        <AccordionBody className='h-72 overflow-y-auto'>
                            The layout plan represents the top view of your property, typically found in your Sales and Purchase (S&P) document.
                            <br /><br />Each floor of your property will have its own corresponding layout plan.
                            <br /><br /> It is recommended to include the layout plan by taking a photograph using your mobile phone.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className='flex justify-start'>
                            3.Add Defect.
                        </AccordionHeader>
                        <AccordionBody className='h-72 overflow-y-auto'>
                            To proceed, please follow these steps:<br /><br />

                            Enter the project name.<br /><br />
                            Specify the floor where the defect is located.<br /><br />
                            Create a pin to mark the exact defect location.<br /><br />
                            Select or manually enter the area associated with the defect.<br /><br />
                            Choose the relevant element related to the defect.<br /><br />
                            Capture a photo of the defect using your device.<br /><br />
                            Select or enter a description of the defect.<br /><br />
                            Finally, click the "ADD" button to attach the defect to your project.<br /><br />
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)} className='flex justify-start'>
                        4.View Defects.
                    </AccordionHeader>
                    <AccordionBody className='h-72 overflow-y-auto'>
                    Users have the option to filter and display all defects associated with a specific project and floor.
                    <br /><br /> The system will present a comprehensive list of available defects on the layout. 
                    <br /><br />Users can also remove any unwanted defect records directly from this interface.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5}>
                    <AccordionHeader onClick={() => handleOpen(5)} className='flex justify-start'>
                        5.PDF.
                    </AccordionHeader>
                    <AccordionBody className='h-72 overflow-y-auto'>
                    
                        In this section, users can conveniently search and filter all created defects based on the project name. 
                        <br /><br /> The system will display a list of defect records along with statistical graph data related to the defect list. 
                        <br /><br /> Users have the option to export the defect list as a PDF file and save it locally for submission. <br /><br /> 
                        To proceed with the PDF export feature, users will be prompted to make a purchase based on the project name.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 6}>
                    <AccordionHeader onClick={() => handleOpen(6)} className='flex justify-start'>
                        6.To make purchase
                    </AccordionHeader>
                    <AccordionBody className='h-72 overflow-y-auto'>
                    CLick on "PRICING", select project, key in your name for invoicing purposes and click "BUY NOW" button to proceed with purchase.
                    You can then check the status of purchases by clicking icon "ACCOUNT".
                        
                    </AccordionBody>
                </Accordion>
                </Fragment>
                </div>
                <Footer />
            </div></div>
        <Outlet /></>);
}
export default MainMenu;
