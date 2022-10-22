import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@material-tailwind/react';
import { BGCOLOR } from '../../utils/theme';
import Footer from '../footer/footer.component';
import MAIL from '../../assets/img/mail.png';

const ContactUs = (screen) => {
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [height, setHeight] = useState('h-screen');

    useEffect(() => {
        if (screen.screen === 'small') {
            setHeight('h-full bg-gray-300');
        } else {
            setHeight('h-full ' + BGCOLOR);
        }
    }, []);

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendEmail = (e) => {
        e.preventDefault();

        if (name && email && message) {
            console.log(`up`);
            emailjs.sendForm('checkandinspectmy', 'template_uj2n735', form.current, 'wUPZWlqVmC-VIb1JE')
                .then((result) => {
                    console.log(result.text);
                    form.current = '';
                }, (error) => {
                    console.log(error.text);
                })
                .then(setName(''))
                .then(setEmail(''))
                .then(setMessage(''))
                .then(setStatus(<div className='flex justify-center text-sm py-2 h-10 text-green-700 items-center bg-green-100 w-72 drop-shadow-md shadow-md'>Inquiry submitted.Thanks!</div>))
                .then(setTimeout(() => { setStatus('') }, 3000));
        }
        else {
            setStatus(<div className='flex justify-center text-sm py-2 h-10 text-red-700 items-center bg-red-100 w-72 drop-shadow-md shadow-md'>Please input name, email and message.</div>)
            setTimeout(() => { setStatus('') }, 3000);
        }

    };

    function Mailto({ email, subject, body, ...props }) {
        return (
            <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
                {props.children}
            </a>
        );
    }


    return (<section className={`text-gray-600 body-font relative ${height} w-screen`}>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">CONTACT US</h1>

            </div>
            <div className="flex justify-center items-center mx-2 py-3 gap-2 text-center">
                For any feed back , technical issue or inquiry, please feel free to send us a message or drop us an email at:
            </div>
            <div className="flex justify-center items-center gap-2 py-4 text-lg">

                <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry/feedback for DECON web app." body="">
                    <img src={MAIL} alt='' height='50' width='50' />

                </Mailto>
                <Mailto email="checkandinspectmy@gmail.com" subject="Inquiry/feedbackfor DECON web app." body="">

                    checkandinspectmy@gmail.com
                </Mailto>

            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleName} value={name}>
                                </input>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleEmail} value={email}>
                                </input></div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={handleMessage} value={message}></textarea>
                            </div>
                        </div>

                        <div className="p-2 w-full flex justify-center">
                            <Button color='green' className="animate-pulse rounded text-lg shadow-lg drop-shadow-2xl" onClick={sendEmail}>Submit</Button>
                        </div>

                    </div>
                </form>
                <div className='flex justify-center w-full items-center py-4'>{status}</div>

            </div>

        </div>
        <Footer />
    </section>)

}
export default ContactUs;