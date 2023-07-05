import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import pdf from '../../assets/img/pdf.png';
import menu from '../../assets/img/menu2.png';
import project from '../../assets/img/project.png';
import summary from '../../assets/img/summary.png';
import defect from '../../assets/img/defect2.png';
import manual from '../../assets/img/manual.png';
import logout from '../../assets/img/signout.png';
import logo from '../../assets/img/INSPECTMY.png';
import layout from '../../assets/img/layout.png';
import pricing from '../../assets/img/pricing.png';
import account from '../../assets/img/account.png';

import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

const Manual = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));
        }
        else {
            navigate('/');
        }
    }, []);

    return (<div className='flex flex-col justify-center place-items-center items-center bg-gray-300 w-full h-full'>
        <Header headerText={{ title: 'INFORMATION' }} />


        <div className='w-80 md:w-screen flex justify-center text-base py-1'><div><img alt='' className='w-100 h-70' src={logo} /></div></div>

        <div className='w-80 md:w-screen text-sm py-4 px-0 md:px-8'>
            InspectMY is a web application specifically designed to streamline defect inspection processes. Our primary objective is to optimize the efficiency of defect detection and information gathering/recording, ultimately reducing time consumption and enhancing effectiveness.
            <br /><br />
            Traditionally, the process of identifying defects has been cumbersome for users, with scattered and difficult-to-manage information. Users face challenges when dealing with various defect attributes, such as defect location, defect types, defect images, and numbering of defects for report generation.
            <br /><br />
            Furthermore, inaccurate defect reports can lead to misunderstandings and complications among users, developers, and contractors. These issues can result in delays in defect repair timelines and directly impact move-in schedules.
            <br /><br />
            InspectMY addresses these challenges by enabling users to easily raise defects with accurate information, including defect location, description, and images, all through a few simple clicks. Notably, this can be achieved using just a mobile phone, making the process even more convenient. InspectMY significantly reduces the time-consuming task of organizing data for report generation.
            <br /><br />
            The development of InspectMY is based on the QLASSIC CONSTRUCTION INDUSTRY STANDARD (CIS 7:2021), which is a recognized reference for assessing defect descriptions. It is important to emphasize that the use of this standard is voluntary, and compliance with the Construction Industry Standard does not exempt individuals from legal obligations. This standard serves the purpose of rating building workmanship and is not intended for use as specifications or compliance requirements.
            <br /><br />
            By providing a user-friendly and efficient platform for defect inspection, InspectMY aims to enhance the overall quality and productivity of defect management in the construction industry.
        </div>
        <Header headerText={{ title: 'ICON FUNCTION' }} />
        <div className='w-80 flex justify-center text-base py-4'><div>NAVIGATION BAR </div></div>

        <div className='w-80 md:w-screen flex justify-center md:justify-start text-sm py-4 md:px-44 '><img alt='' className='w-18 h-8 px-2 ' src={menu} /><div>Main Menu - This page will show all available functions of InspectMY app.</div></div>
        <div className='w-80 md:w-screen flex justify-center text-sm py-4 md:px-44 md:justify-start'><img alt='' className='w-18 h-8 px-2 ' src={project} /><div>Add Project - This page allows users to establish new projects, which represent individual property units where defect inspections will be conducted.</div></div>

        <div className='w-80 md:w-screen flex justify-center text-sm py-4 md:px-44 md:justify-start'><img alt='' className='w-18 h-8 px-2 ' src={layout} /><div>Add Layout - This page enables users to add or modify the layout plan of a property to align it with the corresponding floor layout. The updated layout plan serves as a reference for pinpointing the location of any defects within the property.</div></div>

        <div className='w-80 md:w-screen flex justify-center text-sm py-4 md:px-44 md:justify-start'><img alt='' className='w-18 h-8 px-2 ' src={defect} /><div>Add Defect - Users have the ability to raise new defect reports by specifying the floor, area, and element affected. They can also attach a detailed layout plan and accompanying photos to provide additional context and information.</div></div>
        <div className='w-80 md:w-screen flex justify-center text-sm py-4 md:px-44 md:justify-start'><img alt='' className='w-18 h-8 px-2 ' src={summary} /><div>View Defects - On this page, users can view a comprehensive summary of all raised defects. They have the option to delete defects directly from this page, allowing for convenient management and organization of reported issues.</div></div>
        <div className='w-80 md:w-screen flex justify-center text-sm py-4 md:px-44 md:justify-start'><img alt='' className='w-18 h-8 px-2 ' src={pdf} /><div>PDF -  This page offers users the ability to list defect summaries in both table view and chart view. They can conveniently navigate thru visual representations to gain insights into the reported issues. Additionally, users have the option to export the defect list as a PDF file for easy sharing and documentation purposes. </div></div>


        <div className='w-80 md:w-screen flex md:justify-start justify-center text-sm py-4 md:px-44 '><img alt='' className='w-18 h-8 px-2 ' src={pricing} /><div>Pricing -  This page provides users with a comprehensive list of available pricing packages. Users can explore and select the package that suits their needs and make purchases accordingly. It offers a seamless process for users to choose and acquire the desired pricing package.</div></div>

        <div className='w-80 md:w-screen flex md:justify-start justify-center text-sm py-4 md:px-44 '><img alt='' className='w-18 h-8 px-2 ' src={account} /><div>Account - This page displays a complete record of all transactions related to the user's project. Users can conveniently view their transaction history and check the payment status for each transaction. It provides a clear and organized overview of the financial activities associated with the user's project.</div></div>

        <div className='w-80 md:w-screen flex md:justify-start justify-center text-sm py-4 md:px-44 '><img alt='' className='w-18 h-8 px-2 ' src={logout} /><div>Log Out - User can proceed to log out here.</div></div>

        <Footer />
    </div>);
}
export default Manual;