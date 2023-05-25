import React, { useRef, useState, useEffect } from 'react';
import { BGCOLOR } from '../../utils/theme';
import Footer from '../footer/footer.component';
import MAIL from '../../assets/img/mail.png';

const ContactUs = () => {

    const Mailto = ({ email, subject, body, ...props }) => {
        return (
            <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
                {props.children}
            </a>
        );
    }

    return (
        <section className={`text-gray-600 body-font relative w-screen min-h-screen flex flex-col justify-between ${BGCOLOR}`} >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">CONTACT US</h1>
                </div>
                <div className="flex justify-center items-center mx-2 py-3 gap-2 text-center">
                    For any feed back , technical issue or inquiry, please feel free to send us a message or drop us an email at:
                </div>
                <div className="flex justify-center items-center gap-2 py-4 text-lg">
                    <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry/feedback for INSPECTMY web app." body="">
                        <img src={MAIL} alt='' height='50' width='50' />
                    </Mailto>
                    <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry/feedbackfor INSPECTMY web app." body="">
                        checkandinspectmy@gmail.com
                    </Mailto>
                </div>
                <div className="flex justify-center items-center gap-2 py-4 text-lg"><a href='https://www.facebook.com/checkandinspect'>https://www.facebook.com/checkandinspect</a></div>
            </div>
            <Footer />
        </section >)

}
export default ContactUs;