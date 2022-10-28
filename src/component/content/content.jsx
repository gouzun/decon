import LOGO from '../../assets/img/DECON.svg';
import { BGCOLOR } from '../../utils/theme';
import { Button } from '@material-tailwind/react';
import MOBILE from '../../assets/img/mobile.png';
import PINLAYOUT from '../../assets/img/pins.png';
import TABLE from '../../assets/img/table.png';
import CHART from '../../assets/img/chart.png';
import PDF from '../../assets/img/pdffile.png';
import Users from '../../component/users/users';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer.component';
import DANDM from '../../assets/img/desktopandmobile.png'
import PhoneTurn from './phoneturn.component';

import { useMediaQuery } from 'react-responsive';
const Content = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/signup');
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (<div className={`font-sans text-base ${BGCOLOR} md:text-xl w-screen`} >
        <div className='flex justify-around justify-between flex-wrap pt-20'>
            <div className='md:h-screen w-2/4 flex justify-center items-center'>
                <div className='h-96 md:h-screen md:w-screen flex justify-center items-center'>
                    {isMobile ? <img className='pt-10' src={MOBILE} alt='' height='300' width='300' /> : <PhoneTurn />}</div>

            </div>
            <div className='md:h-screen w-2/4 flex justify-left items-left flex-col pt-10 pl-5 flex-wrap'>
                <div className='md:h-48'></div>
                <div><img className='' src={LOGO} alt='' height='150' width='150' /></div>
                <div className=' py-4 pr-8 md:text-3xl text-lg font-bold flex flex-wrap'>DECON,THE WEB BASED DEFECT INSPECTION TOOL.</div>
                <div>Allowing you to carry out your defect inspection process with ease! </div>
            </div>
        </div>

        <div className='flex justify-around justify-between'>
            <div className='h-96 w-2/4 flex justify-left items-left flex-col p-10 md:p-20 '>

                <div className=' py-4 pr-4 md:text-3xl text-lg font-bold flex justify-center'>PIN DROPPING FEATURE</div>
                <div >Upload your property layout plan by using your phone camera function, and directly dropping pins on defect spot!</div>
            </div>
            <div className='h-96 w-2/4  flex justify-center items-center p-2 md:p-0'><img className='shadow-lg drop-shadow-2xl' src={PINLAYOUT} alt='' height='500' width='500' /></div>

        </div>

        <div className='flex justify-around justify-between flex-wrap'>
            <div className='h-52 md:h-screen w-2/4 flex justify-center items-center pl-8 md:pl-10'><img className='shadow-lg drop-shadow-2xl' src={TABLE} alt='' height='800' width='800' /></div>

            <div className='h-64 md:h-screen w-2/4 flex justify-left items-left flex-col pl-4 md:p-20 flex-nowrap'>
                <div className='h-0 md:h-60'> </div>
                <div></div>
                <div className=' py-4 pr-4 md:text-3xl text-lg font-bold flex justify-end'>DEFECT SUMMARY VIEW</div>
                <div>Defect details to be viewed in table format including information such as defect image and defect position.</div>
            </div>
        </div>

        <div className='flex justify-around justify-between'>
            <div className='h-96 w-2/4 flex justify-left items-left flex-col p-10 md:p-20 '>
                <div className='h-60'> </div>
                <div></div>
                <div className=' py-4 pr-4 md:text-3xl text-lg font-bold flex justify-center'>CHART VIEW</div>
                <div>Generate chart based on defects information collected.Letting you understand your defects more!</div>
                <div className='h-60'> </div>
            </div><div className='h-96 w-2/4  flex justify-center items-center p-2 md:p-0'><img className='shadow-lg drop-shadow-2xl' src={CHART} alt='' height='400' width='400' /></div>

        </div>

        <div className='flex justify-around justify-between flex-wrap'>
            <div className='h-96 md:h-screen w-2/4 flex justify-center items-center pl-8 md:p-0'><img className='shadow-lg drop-shadow-2xl' src={PDF} alt='' height='500' width='500' /></div>

            <div className='h-72 md:h-screen w-2/4 flex justify-left items-left flex-col p-10 md:p-20 flex-nowrap'>
                <div className='h-48 md:h-60'> </div>
                <div></div>
                <div className='py-4 md:text-3xl text-lg font-bold flex justify-start'>EXPORT IN PDF FORM</div>
                <div>Exporting your defect report into PDF format. Directly send soft copy report to your contractor or developer.
                    <br></br>Go paperless!</div>
            </div>
        </div>

        <div className='flex justify-around justify-between pb-20'>
            <div className='h-96 w-2/4 flex justify-left items-left flex-col p-10 md:p-20 '>
                <div className='h-60'> </div>
                <div></div>
                <div className=' py-4 pr-4 md:text-3xl text-lg font-bold flex justify-center'>ACCESSIBLE ACROSS MULTIPLE PLATFORM</div>
                <div>DECON can be accessed thru desktop PC, tablet and mobile phone. No installation needed!</div>
                <div className='h-60'> </div>
            </div><div className='h-96 w-2/4  flex justify-center items-center p-2 md:p-0'><img className='pr-4 md:p-0' src={DANDM} alt='' height='500' width='500' /></div>

        </div>

        <div className='h-96 w-full flex flex-col justify-center items-center '>
            <div className='h-32 w-2/4 flex justify-center items-center flex-col p-0 md:p-20'>
                <div className='py-20 md:text-3xl text-lg font-bold  text-center'>WHO SHOULD BE USING THIS APP?</div>
            </div>
            <div className='h-96 w-full flex justify-left items-left flex-col pb-20 pt-10'>
                <Users />
            </div>
        </div>
        <div className='flex justify-around justify-between flex-wrap'>
            <div className='h-96 w-2/4 flex flex-col justify-center items-center '>
                <div className='pl-8 md:pl-0 py-4 font-bold'>SIGN UP FOR FREE AND TRY OUT DECON NOW!</div>
                <div className='py-4 pl-8 md:pl-0'><Button color='green' className='animate-pulse rounded text-lg shadow-lg drop-shadow-2xl' onClick={handleRegister}>FREE REGISTRATION!</Button></div>
            </div>
            <div className='h-96 w-1/3 md:w-2/4 flex justify-center items-center'>
                <img src={MOBILE} alt='' height='200' width='200' /></div>

        </div>
        <Footer />


    </div>)
}
export default Content;