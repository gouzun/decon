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
        <Header headerText={{ title: 'HOW TO USE' }} />
        <div className='w-80 flex justify-center text-base py-4'><div>NAVIGATION BAR </div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={menu} /><div>Main Menu - This page will show all available functions of InspectMY app.</div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={project} /><div>Add Project - This page is to let user to create new project.Project refers as property unit where defect inspection will be conducted.</div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={defect} /><div>Add Defect - User can raise new defect by stating floor, area, element and attach with detail layout plan and photos.</div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={summary} /><div>View Defects - This page will display all raised defects in summary view.User can perform deletion in this page as well.</div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={pdf} /><div>PDF - This page is to let user to list defect summary in table view and chart view.User can also export defect list in pdf file. </div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={manual} /><div>Manual - This page will show a brief explanation for each icon functionality.</div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={logout} /><div>Log Out - User can proceed to log out here.</div></div>

        <Footer />
    </div>);
}
export default Manual;