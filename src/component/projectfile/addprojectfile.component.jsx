import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { addProject, generateProjectList, sendVerifyEmail, verifyEmail } from '../../utils/firebase/firebase.utils';
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../context/generalcontext.component";
import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const AddProjectFile = () => {

    const { propertyName, setPropertyName,
        ownerName, setOwnerName,
        propertyAdd, setPropertyAdd, setProjectList } = useContext(GeneralContext);

    const [isLoading, setIsLoading] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [ele, setEle] = useState([]);
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    let RowBgStyle = '';
    let row = 0;
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const resetField = () => {
        setOwnerName('');
        setPropertyAdd('');
    }

    useEffect(() => {
        resetField();
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));

        }
        else {
            navigate('/');
        }
        gridHandler();
    }, []);

    useEffect(() => {

        gridHandler();
    }, [currentUser]);

    function onlySpaces(str) {
        return str.trim().length === 0;
    }

    const fieldreset = () => {
        setPropertyName('');
        setOwnerName('');
        setPropertyAdd('');
        setIsLoading('');
    }

    const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value.toUpperCase());
    };

    const handleOwnerNameChange = (event) => {
        setOwnerName(event.target.value.toUpperCase());
    };

    const handlePropertyAddChange = (event) => {
        setPropertyAdd(event.target.value.toUpperCase());
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const isVerify = await verifyEmail();

            if (isVerify) {
                //to check if input are empty or only space, if all no empty only proceed to create
                if (!onlySpaces(propertyName) && !onlySpaces(ownerName) && !onlySpaces(propertyAdd)) {

                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Record updating...</div>);
                    await addProject(propertyName, ownerName, propertyAdd, currentUser)
                        .then(
                            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Record Added/Updated.</div>)
                        ).then(gridAfterAdd()).then(gridHandler());

                } else {

                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72 drop-shadow-md shadow-md'>Please input all required fields.</div>);

                }
            } else {
                handleOpen();
            }
        }
        catch (e) {
            alert(e.message);
        }

    }

    const gridAfterAdd = async () => {
        try {
            let arrResult = await generateProjectList(currentUser);
            let arrProject = [];
            setRowCount(arrResult.length);
            setEle(arrResult);
            arrResult.forEach((project) => {
                arrProject.push(project.propertyName + '-' + project.ownerName);
            })
            setProjectList(arrProject);
            fieldreset();
        } catch (e) {
            alert(e.message);
        }
    }

    const gridHandler = async () => {
        try {
            setLoad(true);
            const arrResult = await generateProjectList(currentUser);
            setRowCount(arrResult.length);
            setEle(arrResult);
        } catch (e) {
            console.log(e);
            alert(e.message);
        } finally {
            setLoad('');
        }

    }

    const handleResend = () => {
        sendVerifyEmail();
        handleOpen();
    }


    return (<>
        <div className='flex justify-center w-full items-center bg-gray-300 min-h-screen'>

            <div className='grid grid-flow-row auto-rows-max  items-center bg-gray-300 place-items-center' >
                <Header headerText={{ title: 'ADD PROJECT FILE' }} />


                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                    <Input label="NEW PROPERTY NAME [*required]" value={propertyName} onChange={handlePropertyNameChange} />
                </div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                    <Input label="OWNER NAME [*required]" value={ownerName} onChange={handleOwnerNameChange} />
                </div>
                <div className="w-72 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                    <Textarea label="PROPERTY ADDRESS [*required]" value={propertyAdd} onChange={handlePropertyAddChange} />
                </div>

                <div className="w-72 flex justify-center p-2 my-2 gap-2">
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleAddProject}>ADD</Button>
                    <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" onClick={fieldreset}>RESET</Button>
                </div>


                {isLoading}
                <div className='flex justify-center text-sm py-2 h-10 font-semibold'>Record(s) found : {rowCount}</div>
                {load ? <Loader /> : ''}
                <table className="w-80 rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className={`rounded-lg text-xs text-gray-700 uppercase ${NAVBARCOLOR} ${LABELCOLOR}`}>
                        <tr>
                            <th scope="col" className="py-3 px-6 text-center">
                                NO
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                PROPERTY NAME
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                OWNER NAME
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                ADDRESS
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {ele.map((item) => {
                            row = row + 1
                            if (row % 2) {

                                RowBgStyle = 'bg-gray-300 text-gray-900';
                            } else {
                                RowBgStyle = 'bg-gray-200 text-gray-900';

                            }

                            return (
                                <tr className={RowBgStyle} key={item["rowcount"]}>
                                    <th scope="row" className="py-3 px-6 font-medium whitespace-nowrap dark:text-white text-center">
                                        {item["rowcount"]}
                                    </th>
                                    <td className="py-3 px-6 text-center">
                                        {item["propertyName"]}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {item["ownerName"]}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {item["propertyAddress"]}
                                    </td>

                                </tr>
                            )
                        })}

                        <tr className={`border-b dark:border-gray-700 font-semibold h-10 ${NAVBARCOLOR}`}>
                            <td colSpan='4' align='center' className={`px-4 text-xs ${LABELCOLOR}`} >End of table</td>

                        </tr>
                    </tbody>
                </table>

                <Footer /></div></div>0
        <Dialog open={open} handler={handleOpen} size='xl'>
            <DialogHeader>ACCOUNT NOT VERIFIED</DialogHeader>
            <DialogBody divider>
                Your account is not verified yet.We've sent you a verification email. <br/><br/>Please take a moment to verify your email address so that you can proceed with our services.<br/><br/>Please re-log in again after verifying your email account. 
            </DialogBody>
            <DialogFooter className='flex flex-row gap-4'>
                <Button variant="gradient" color="blue" onClick={handleOpen}>
                    <span>BACK</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleResend}>
                    <span>RESEND VERIFICATION EMAIL</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>);

}
export default AddProjectFile;