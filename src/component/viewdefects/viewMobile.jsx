import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import dustbin from '../../assets/img/dustbin.png';
import { deleteDefect } from '../../utils/firebase/firebase.utils';
import { useState, useContext } from 'react';
import { GeneralContext } from '../../context/generalcontext.component';
import { UserContext } from '../../context/user.context';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const ViewMobile = (result) => {

    let RowBgStyle = '';
    let row = 0;
    const [itemToDelete, setItemToDelete] = useState('');
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(UserContext);
    const {
        render, setRender,
        curProject
    } = useContext(GeneralContext);

    const handleOpen = (value) => {
        setOpen(!open);
    }

    const confirmDelete = (invToDelete) => {
        setItemToDelete(invToDelete);
        handleOpen();
    }

    const handleDelete = () => {
        if (currentUser !== 'test@gmail.com') {
            if (itemToDelete) {
                deleteDefect(curProject, itemToDelete, currentUser);
                // setItemToDelete('');
            }
        } else {
            alert('Delete is disabled in test account.');
        }
        setRender(!render);

        handleOpen();

    }

    let desc = '';
    let desc2 = '';

    return (<>
        <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defects.</div>
        <div className={`flex items-center w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>
            {result.ele.map((item) => {
                row++;
                return (
                    <Card id={item["rowcount"]} className="w-80 drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4 bg-gradient-to-r from-teal-100 to-cyan-200">
                        <CardHeader floated={false} className="">
                            <div className="flex justify-center bg-gradient-to-r from-teal-300 to-cyan-500">
                                {row}/{result.ele.length}
                            </div>
                            <img src={item["url"]} alt="" className="card-image object-contain h-64 w-full" />
                        </CardHeader>
                        <CardBody className="card-body h-40">
                            <Typography className="flex flex-col justify-start text-base">
                                <div>DEFECT INDEX: {item["rowcount"]}</div>
                                <div>FLOOR: {item["floor"]}</div>
                                <div>AREA: {item["area"]}</div>
                                <div>ELEMENT: {item["element"]}</div>
                                <div>DEFECT DESC: {item["defectDesc"].toUpperCase()}</div>
                            </Typography>
                        </CardBody>
                        <CardFooter divider className="flex items-center justify-center">
                            <img src={dustbin} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmDelete(item["defectName"])} />
                        </CardFooter>
                    </Card>
                )
            })
            }
        </div>
        <Dialog open={open} handler={handleOpen} size='xl'>
            <DialogHeader className='bg-red-100'>Confirm delete?</DialogHeader>
            <DialogBody divider>
                This will removed the selected defect item.Click confirm to proceed.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleDelete}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>


    </>);
}
export default ViewMobile;