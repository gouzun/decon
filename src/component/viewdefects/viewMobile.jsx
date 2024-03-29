import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import dustbin from '../../assets/img/dustbin.png';
import pending from '../../assets/img/pending.png';
import completed from '../../assets/img/complete.png';
import { deleteDefect,updateProjectStatus } from '../../utils/firebase/firebase.utils';
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
    const [defToSet, setDefToSet] = useState('');
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const { currentUser } = useContext(UserContext);
    const {
        render, setRender,
        curProject
    } = useContext(GeneralContext);

    const handleOpen = (value) => {
        setOpen(!open);
    }
    const handleOpenStatus = (value) => {
        setOpenStatus(!openStatus);
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

    const confirmSetStatus = (def,status) => {
        setDefToSet(def);
        setStatus(status);
        setOpenStatus(status);
        handleOpenStatus();
    }

    const handleSetStatus = ()=>{
        if (defToSet) {
            updateProjectStatus(curProject, defToSet,status,currentUser);
            // setItemToDelete('');
        }
        setRender(!render);
        handleOpenStatus();
    }

  

    return (<>
        <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defects.</div>
        <div className={`flex items-top w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>
            {result.ele.map((item) => {
                row++;
                let bghead='';
                let bgbody='';
                if(item.status.toUpperCase()==='PENDING'){
                     bghead ='bg-yellow-500';
                     bgbody='bg-yellow-100';
                }else{
                     bghead ='bg-green-500';
                     bgbody='bg-green-100';
                }
                return (
                    
                    <Card id={item["rowcount"]} className={`w-80 drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4 ${bgbody}`}>
                        <CardHeader id={item["rowcount"]} floated={false} style={{ height: '400px', width: '300px' }} className=''>
                            <div className={`flex justify-center ${bghead}`}>
                                {row}/{result.ele.length}
                            </div>
                            <img src={item["url"]} alt="" className="card-image object-contain" style={{ height: '400px', width: '300px' }} />
                        </CardHeader>
                        <CardBody id={item["rowcount"]} className="card-body h-80">
                            <Typography id={item["rowcount"]} className="flex flex-col justify-start text-base ">
                                <div className='pb-3'>DEFECT INDEX: {item["rowcount"]}</div>
                                <div className='pb-3'>FLOOR: {item["floor"]}</div>
                                <div className='pb-3'>AREA: {item["area"]}</div>
                                <div className=' h-14'>ELEMENT: {item["element"]}</div>
                                <div className=' h-24'>DEFECT DESC: {item["defectDesc"].toUpperCase()}</div>
                                {item["status"]==='COMPLETED'?(<div className=' text-light-green-800  font-bold'>DEFECT STATUS: {item["status"].toUpperCase()}</div>):(<div className=' text-red-800  font-bold'>DEFECT STATUS: {item["status"].toUpperCase()}</div>)}
                            </Typography>
                        </CardBody>
                        <CardFooter id={item["rowcount"]} divider className="flex items-center justify-center gap-4">
                            {item["status"]==='COMPLETED'?<img src={pending} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmSetStatus(item["defectName"],item["status"])} />:
                            <img src={completed} alt="" className="cursor-pointer" height="30" width="30" onClick={() => confirmSetStatus(item["defectName"],item["status"])} />}
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
        <Dialog open={openStatus} handler={handleOpenStatus} size='xl'>
            <DialogHeader className='bg-red-100'>Update status?</DialogHeader>
            <DialogBody divider>
                This will update defect status to {status==='COMPLETED'?'PENDING':'COMPLETED'}.Click confirm to proceed.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpenStatus}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleSetStatus}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>


    </>);
}
export default ViewMobile;