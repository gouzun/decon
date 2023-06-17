import { Fragment, useContext, useRef, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../../assets/img/INSPECTMY.png';
import { NAVBARCOLOR, LABELCOLOR, LABELHOVERCOLOR, NAVBARLINK } from '../../utils/theme';
import pdf from '../../assets/img/pdf.png';
import menu from '../../assets/img/menu2.png';
import project from '../../assets/img/project.png';
import summary from '../../assets/img/summary.png';
import defect from '../../assets/img/defect2.png';
import manual from '../../assets/img/manual.png';
import logout from '../../assets/img/signout.png';
import pricing from '../../assets/img/pricing.png'

import "react-pro-sidebar/dist/css/styles.css";
import { UserContext } from '../../context/user.context';

const NavBar = () => {
    const { currentUser } = useContext(UserContext);
    const [disableNavBar, setDisableNavBar] = useState('none');


    useEffect(() => {

        if (currentUser) {
            setDisableNavBar('auto');

        } else {
            setDisableNavBar('none');
        }
    },
        [currentUser])

    return (
        <Fragment>
            <div className={`flex ${LABELCOLOR}font-bold text-xs uppercase items-center w-full h-16 drop-shadow-lg shadow-lg ${NAVBARCOLOR} overflow-x-auto`} style={{ pointerEvents: disableNavBar }}>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/menu'><img alt='' className='w-32 h-14 pl-3' src={logo} /></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/menu'><img alt='' className='w-15 h-8 ' src={menu} /><div>MAIN MENU</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/addprojectfile'><img alt='' className='w-15 h-8 ' src={project} /><div>ADD PROJECT</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/adddefect'><img alt='' className='w-15 h-8 ' src={defect} /><div>ADD DEFECT</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/viewdefects'><img alt='' className='w-15 h-8 ' src={summary} /><div>VIEW DEFECTS</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/pdf'><img alt='' className='w-15 h-8 px-3' src={pdf} /><div>PDF</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/info'><img alt='' className='w-15 h-8 px-3' src={manual} /><div>INFORMATION</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/pricing'><img alt='' className='w-15 h-8 px-3' src={pricing} /><div>PRICING</div></Link>
                <Link className={`${LABELHOVERCOLOR} ${NAVBARLINK}`} to='/logout'><img alt='' className='w-15 h-8 px-4' src={logout} /><div>LOG OUT</div></Link>

            </div>
            <Outlet />

        </Fragment>
    );
};
export default NavBar;
// <div>{currentUser?currentUser:"Please login."}</div>
