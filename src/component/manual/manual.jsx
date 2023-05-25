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
            InspectMY is a web application designed for defect inspection.Our primary objective is to enhance the efficiency of defect detection and information gathering/recording, reducing time consumption and increasing effectiveness.
            <br /><br />
            The conventional method of defect identification is burdensome for users, as information is scattered and difficult to manage. Users encounter challenges when dealing with various defect attributes such as defect location, defect types, defect images, and numbering of defects for report generation.
            <br /><br />
            Moreover, inaccurate defect reports can lead to misunderstandings and complications for users, developers, and contractors. This can result in delays in defect repair timelines and directly impact move-in schedules.
            <br /><br />
            With InspectMY, users can easily raise defects by providing accurate defect information, including defect location, description, and images, all within a few simple clicks. Importantly, these tasks can be accomplished using just a mobile phone. InspectMY significantly reduces the time-consuming process of organizing data for report generation.
            <br /><br />
            InspectMY caters to a wide range of residential property types, including single-storey units, double-storey units, superlinks, semi-detached houses, bungalows, condos/service apartments, SOHOs, studios, and more. Additionally, InspectMY can be utilized for commercial properties such as shoplots, offices, factories, and others.
            <br /><br />
            InspectMY's development is based on the QLASSIC CONSTRUCTION INDUSTRY STANDARD (CIS 7:2021) as a recognized reference for assessing defect descriptions. It is important to note that the use of this standard is voluntary, and compliance with the Construction Industry Standard does not exempt individuals from legal obligations. This standard serves the purpose of rating building workmanship and is not intended for use as specifications or compliance requirements.
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