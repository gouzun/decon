import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import pdf from '../../assets/img/pdf.png';
import menu from '../../assets/img/menu2.png';
import project from '../../assets/img/project.png';
import summary from '../../assets/img/summary.png';
import defect from '../../assets/img/defect2.png';
import manual from '../../assets/img/manual.png';
import logout from '../../assets/img/signout.png';
import logo from '../../assets/img/DECON.svg';

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


        <div className='w-80 md:w-screen flex justify-center text-base py-4 '><div><img alt='' className='w-28 h-18 px-2' src={logo} /></div></div>
        <div className='w-80 flex justify-center text-base py-4'><div>INTRODUCTION</div></div>
        <div className='w-80 md:w-screen text-sm py-4 px-0 md:px-8'>DECON is a defect inspection web app.'<span style={{ color: '#ffde59', fontWeight: 'bold' }}>DE</span>' stands for defects and '<span style={{ color: '#7ed957', fontWeight: 'bold' }}>CON</span>' stands for control. Our main purpose is
            to help user to perform defect detection and defect information gathering/recording in a less time consuming and more effective way.<br></br><br></br>
            Traditional way of defect rising is always causing pain to users where information are all scatter around.
            Users first will have to identify physical detect and
            Users always facing hard time trying to manipulate all information such as defect location, defect types,
            images of defects, numbering of defects to match with defect images and etc while generating defect report. <br></br><br></br>
            Besides, inaccurate defect reports will cause misunderstanding and complication to user, developer and contractors as well.
            All these will then lead to timeline delay in defect repairing schedule, and directly affecting move in schedule as well. <br></br><br></br>
            With DECON, user can easily raise defect by providing defect location, defect description , defect image,and generating defect report within a few clicks, and most importantly,all can be done by just using mobile phone.
            This will directly help users to save a lot of time consuming works in data organizing for report generating.<br></br><br></br>
            DECON is suitable for all type of residential property including single storey unit, double storey unit, superlink, semi detached,bungalow, condo/service apartment ,SOHO, studio and many more. DECON can also be used for commercial property such as shoplot,office,factory and others.<br></br><br></br>
            DECON is developed by refering QLASSIC CONSTRUCTION INDUSTRY STANDARD (CIS 7:2021) as a <span className='font-bold'>reference</span> in <span className='font-bold'>assessment of defect description</span>.
            It should be noted that the use of this standard is voluntary and compliance with this Construction Industry Standard does not of itself confer immunity from legal obligations.
            The standard is solely for building workmanship rating purpose and is not intended to be used as specification or compliance’s requirement.
        </div>
        <Header headerText={{ title: 'HOW TO USE' }} />
        <div className='w-80 flex justify-center text-base py-4'><div>NAVIGATION BAR </div></div>
        <div className='w-80 md:w-screen flex justify-start md:justify-center text-sm py-4'><img alt='' className='w-18 h-8 px-2 ' src={menu} /><div>Main Menu - This page will show all available functions of DECON app.</div></div>
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