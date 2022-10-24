import { Fragment } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import LOGO from '../../assets/img/DECON.svg';
import { CONTENTNAVBARCOLOR, NAVBARTEXT, NAVBARTEXTHOVER } from '../../utils/theme';

const ContentNavBar = () => {
  
    return (
        <Fragment>
            <div className={`flex flex-row items-center w-full h-16 drop-shadow-lg shadow-lg ${CONTENTNAVBARCOLOR} overflow-x-auto gap-5 pr-8 fixed z-50 `} >

                <div className={`flex justify-start items-center pl-4 pt-4`} >
                    <img className='animate-bounce' src={LOGO} alt='' height='70' width='70' /></div>
                <div className={`flex justify-end ${NAVBARTEXT} items-center w-full overflow-x-auto gap-5 pr-4`} >
                    <Link to='/app' className={`${NAVBARTEXTHOVER}`}>APP</Link>
                    <Link to='/signin' className={`${NAVBARTEXTHOVER}`}>LOGIN</Link>
                    <Link to='/contactus' className={`${NAVBARTEXTHOVER}`}>CONTACT US</Link>
                </div>
            </div>
            <Outlet />

        </Fragment>
    );
};
export default ContentNavBar;
// <div>{currentUser?currentUser:"Please login."}</div>
