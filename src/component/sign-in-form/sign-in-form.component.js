import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';
import { Input, Button } from "@material-tailwind/react";
import { UserContext } from '../../context/user.context';
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import spinner from '../../assets/img/spinner.svg';
import { useEffect } from "react";


const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        // setFormFields(defaultFormFields);
    }

    // const signInWIthGoogle = async () => {
    //     await signInWithGooglePopup()
    //     .then(setCurrentUser(email));

    // };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md '>Signing in. Please wait. <img src={spinner} alt='' /></div>);

            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(email);
            resetFormFields();
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Sign in successfully.</div>);
            sessionStorage.setItem('user', email);
            setTimeout(navigate('/menu'), 3000);
        } catch (error) {

            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>User/password not found.</div>);

        }
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    // useEffect(() => {
    //     // setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Signing in. Please wait. <img src={spinner} alt='' /></div>)

    //     // setTimeout(navigate('/menu'), 3000);
    // }, email);

    return (

        <div className={`flex flex-col justify-center bg-gray-300 h-screen w-full pt-20 ${BGCOLOR} text-center`}>
            <Header headerText={{ title: 'SIGN IN WITH YOUR EMAIL AND PASSWORD' }} />
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Email*" type="email" required onChange={handleEmail} value={email} /></div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Password*" type="password" required onChange={handlePassword} value={password} /></div>
                {isLoading}

                <div className="flex justify-center items-center mx-2 py-3 gap-2">
                    <Link to='/signup'><Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" type="submit">Sign Up</Button></Link>
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" type="submit">Sign In</Button>
                </div>
            </form>
            <Footer />
        </div>


    );

};

export default SignInForm;
