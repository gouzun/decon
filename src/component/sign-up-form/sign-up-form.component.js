import { useState, useContext, Fragment, useEffect } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, verifyEmail } from "../../utils/firebase/firebase.utils";
import {
    Input, Button, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { UserContext } from '../../context/user.context.jsx'
import Header from "../header/header.component";
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';
import {
    useNavigate,
} from "react-router-dom";
import spinner from '../../assets/img/spinner.svg';
import Footer from "../footer/footer.component";

import axios from 'axios';
import { useParams } from 'react-router-dom';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
}

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password, confirmPassword, contact } = formFields;
    const { setCurrentUser } = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { token } = useParams();
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     fetch(`https://inspectmynode.onrender.com/api/v1/verifyemail/${token}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setMessage(data.message);
    //         })
    //         .catch((error) => {
    //             setMessage('Email verification failed. Please try again.');
    //         });
    // }, [token]);

    const handleUserAgreement = (event) => {
        event.preventDefault();
        handleOpen();
    }

    const handleTestEmail = async () => {
        //     const data = new FormData();
        //     data.append('email', email);

        //     fetch('https://inspectmynode.onrender.com/api/v1/verifyemail/', {
        //         method: 'post',
        //         body: data,
        //     }).then(response => console.log(response.json()))
        console.log('handleTestEmail');
        console.log(email);
        verifyEmail(email);

    }

    const handleSubmit = async () => {
        handleOpen();
        if (password === confirmPassword) {

            try {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Creating account. Please wait. <img src={spinner} alt='' /></div>);

                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                await createUserDocumentFromAuth(user, contact).then(
                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Account created.</div>))
                    .then(setCurrentUser(email))
                    .then(sessionStorage.setItem('user', email))
                    .then(resetFormFields())
                    .then(handleTestEmail())
                    .then(setTimeout(navigate('/menu'), 2000));
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use');
                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>auth/email-already-in-use</div>);
                }
                console.log('user creation encountered an error', error.message);
            }

        }
        else {
            alert("Passwords do not match");
            return;
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        // Only allow numbers for the 'contact' field
        if (name === 'contact') {
            const cleanedInput = value.replace(/\D/g, '');
            setFormFields({ ...formFields, [name]: cleanedInput });
        } else {
            setFormFields({ ...formFields, [name]: value });
        }
    };

    const handleNotAgree = () => {
        handleOpen();
        navigate('/');
    }



    return (<>

        <div className={`flex flex-col justify-center bg-gray-300 h-screen w-full pt-20 ${BGCOLOR}`}>
            <Header headerText={{ title: 'SIGN UP/CREATE NEW ACCOUNT' }} />
            <form onSubmit={handleUserAgreement} className='flex flex-col justify-center items-center'>

                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Email*" type="email" required onChange={handleChange} name='email' value={email} /></div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Contact*" type="number" required onChange={handleChange} name='contact' value={contact} /></div>

                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Password*" type="password" required onChange={handleChange} name='password' value={password} /></div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Confirm Password*" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} /></div>
                {isLoading}{message}

                <div className="flex justify-center items-center mx-2 py-3 gap-2"><Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" onClick={() => navigate('/signin')}>Back to Sign In</Button>

                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" type="submit">Sign Up</Button></div>
            </form>
            <Footer />
        </div>
        <Fragment>
            <Dialog open={open} handler={handleOpen} size='xl'>
                <DialogHeader>User Agreement and Terms & Condition</DialogHeader>
                <DialogBody divider className="h-[40rem] overflow-scroll">
                    <Typography className="font-normal">
                        Welcome to INSPECTMY Defect Inspection Web App (the "App"). Before you start using the App, please carefully read and agree to the following User Agreement (the "Agreement").
                        <br /><br /> This Agreement governs your use of the App and establishes the legal terms and conditions between you ("User," "you," or "your company") and INSPECTMY ("we," "us," "our," or "INSPECTMY"). By accessing or using the App, you acknowledge that you have read, understood, and agreed to be bound by this Agreement. If you do not agree with these terms, you must not use the App.

                        <br /><br />
                        Definitions
                        <br /><br />
                        a. "App" refers to INSPECYMY's Defect Inspection Web Application, including any updates, enhancements, and modifications made from time to time.
                        <br /><br />
                        b. "User Content" means any content, data, or information submitted by you while using the App, including but not limited to inspection reports, images, and text.
                        <br /><br />
                        Use of the App
                        <br /><br />
                        a. Eligibility: By using the App, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this Agreement.
                        <br /><br />
                        b. Account Creation: In order to use certain features of the App, you may be required to create an account. You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        <br /><br />
                        c. Acceptable Use: You agree to use the App only for its intended purposes and in compliance with all applicable laws and regulations. You shall not use the App for any unlawful, harmful, or unauthorized activities. Prohibited activities include but are not limited to:
                        <br /><br />

                        i. Uploading or sharing any User Content that is infringing, defamatory, obscene, or offensive.
                        <br /><br />
                        ii. Attempting to gain unauthorized access to the App or other users accounts.
                        <br /><br />
                        iii. Circumventing or attempting to circumvent any security measures put in place by INSPECTMY
                        <br /><br />
                        iv. Misrepresenting your identity or affiliation with any person or entity.
                        <br /><br />
                        v.Users are strictly prohibited from uploading images for unnecessary or unrelated purposes. The image uploads should be directly relevant to the defect inspection process and serve a legitimate and valid purpose. Please ensure that the images you upload contribute to the accurate and comprehensive inspection reports, and refrain from uploading any images that do not align with the intended use of the App. Failure to comply with this policy may result in the removal of such images and, in severe cases, the termination of your access to the App. We appreciate your cooperation in maintaining the integrity and efficiency of the Defect Inspection Web App for all users.
                        <br /><br />
                        d.App Functionality:
                        <br /><br />
                        Error or Bugs: While we strive to deliver a smooth and reliable user experience, it is important to note that the App may encounter occasional errors or bugs. We are committed to making continuous efforts to prevent and resolve any issues that may arise. However, we cannot provide any guarantee that the App will be completely free from errors or bugs.
                        <br /><br />
                        Use at Your Own Risk: You acknowledge and agree that the use of the App is solely at your own risk. We advise exercising caution and diligence while using the App and taking appropriate measures to safeguard your data and device.
                        <br /><br />
                        Disclaimer of Warranties
                        <br /><br />
                        The app is provided "as is" and without warranties of any kind, express or implied. InspectMy makes no representations or warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        <br /><br />
                        Limitation of Liability
                        <br /><br />
                        In no event shall InspectMy be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, arising out of or in connection with your use of the app.
                        <br /><br />
                        Indemnification
                        <br /><br />
                        You agree to indemnify, defend, and hold harmless INSPECTMY, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of the App or your violation of this Agreement.

                        <br /><br />
                        Modifications to the Agreement
                        <br /><br />
                        We reserve the right to modify or update this Agreement at any time. You will be notified of any material changes to this Agreement. Continued use of the App after the notification of changes constitutes your acceptance of the revised Agreement.
                        <br /><br />

                        Termination
                        <br /><br />
                        We may, at our sole discretion, suspend or terminate your access to the App, without notice, for any reason, including but not limited to violations of this Agreement.
                        <br /><br />

                        Contact Information
                        <br /><br />
                        If you have any questions or concerns about this Agreement or the App, please contact us at checkandinspectmy@gmail.com
                        <br /><br />
                        By using the App, you acknowledge that you have read, understood, and agreed to be bound by this Agreement.
                        <br /><br />
                        <div className='flex flex-row justify-center gap-3 pb-8'>
                            <Button variant="outlined" color="red" onClick={handleNotAgree}>
                                No i do not agree
                            </Button>
                            <Button variant="gradient" color="green" onClick={handleSubmit}>
                                I Agree
                            </Button>
                        </div>
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    Please read the User Agreement and Terms & Condition to proceed.
                </DialogFooter>
            </Dialog>
        </Fragment ></>

    );

};

export default SignUpForm;
