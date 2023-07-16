import logo from '../../assets/img/INSPECTMY.png'
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

const Footer = () => {
    // const{currentUser} = useContext(UserContext);
    const Mailto = ({ email, subject, body, ...props }) => {
        return (
            <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
                {props.children}
            </a>
        );
    }

    return (
        <div className='w-full h-full'>
            <div className='h-10 flex justify-center h-20 w-30 text-md'></div>
            <div className='flex justify-center h-20 w-30 text-md'><img alt='' className='w-32 h-16' src={logo} /></div>
            <div className="flex justify-center items-center mx-2 pb-1 gap-2 text-sm">
                <p style={{ fontSize: 'x-small' }}>Copyright © checkandinspectmy</p>
            </div>
            <div className="flex justify-center items-center mx-2 pb-1 gap-2 text-sm">
            <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry/feedbackfor INSPECTMY web app." body="" target="_blank">
                            checkandinspectmy@gmail.com
                        </Mailto></div>
            <div className="flex justify-center items-center mx-2 pb-7 gap-2 text-sm"><a href='https://www.facebook.com/checkandinspect' target="_blank">https://www.facebook.com/checkandinspect</a></div>
        </div>);

}

export default Footer;