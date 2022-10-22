import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { Input, Button } from "@material-tailwind/react";
import { UserContext } from '../../context/user.context.jsx'
import Header from "../header/header.component";
import { BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR, BGCOLOR } from '../../utils/theme';
import {
    useNavigate,
} from "react-router-dom";
import spinner from '../../assets/img/spinner.svg';
import Footer from "../footer/footer.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password, confirmPassword } = formFields;
    const { setCurrentUser } = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            try {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Creating account. Please wait. <img src={spinner} alt='' /></div>);

                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                await createUserDocumentFromAuth(user).then(
                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Account created.</div>))
                    .then(setCurrentUser(email))
                    .then(sessionStorage.setItem('user', email))
                    .then(resetFormFields())
                    .then(setTimeout(navigate('/menu'), 2000));
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use');
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
        setFormFields({ ...formFields, [name]: value })
    };

    return (

        <div className={`flex flex-col justify-center bg-gray-300 h-screen w-full pt-20 ${BGCOLOR}`}>
            <Header headerText={{ title: 'SIGN UP/CREATE NEW ACCOUNT' }} />
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>

                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Email*" type="email" required onChange={handleChange} name='email' value={email} /></div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Password*" type="password" required onChange={handleChange} name='password' value={password} /></div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100"><Input label="Confirm Password*" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} /></div>
                {isLoading}
                <div className="flex justify-center items-center mx-2 py-3 gap-2"><Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" onClick={() => navigate('/signin')}>Back to Sign In</Button>

                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR} `} variant="gradient" type="submit">Sign Up</Button></div>
            </form>
            <Footer />
        </div>

    );

};

export default SignUpForm;
