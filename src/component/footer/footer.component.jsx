import logo from '../../assets/img/DECON.svg'
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

const Footer = () => {
    // const{currentUser} = useContext(UserContext);
    return (
        <div className='w-full h-full'>
            <div className='h-10 flex justify-center h-20 w-30 text-md'></div>
            <div className='flex justify-center h-20 w-30 text-md'><img alt='' className='w-20 h-20' src={logo} /></div>
            <div className="flex justify-center items-center mx-2 pb-7 gap-2 text-sm">
                <p style={{ fontSize: 'x-small' }}>Copyright © checkandinspectmy</p>
            </div>
        </div>);

}

export default Footer;