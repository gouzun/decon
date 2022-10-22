import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import dustbin from '../../assets/img/dustbin.png';
import { deleteDefect } from '../../utils/firebase/firebase.utils';
import { useState, useContext } from 'react';
import { GeneralContext } from '../../context/generalcontext.component';
import { UserContext } from '../../context/user.context';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const ViewDesktop = (result) => {

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

    return (<><table className="w-full rounded-lg text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className={`rounded-lg text-xs text-gray-700 uppercase ${NAVBARCOLOR} ${LABELCOLOR}`}>
            <tr>
                <th scope="col" className="py-1 px-2 text-center">
                    DEFECT INDEX
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    FLOOR
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    AREA
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    ELEMENT
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    DEFECT DESC
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    DEFECT IMAGE
                </th>
                <th scope="col" className="py-1 px-2 text-center">
                    REMOVE
                </th>

            </tr>
        </thead>
        <tbody>
            {result.ele.map((item) => {
                row = row + 1
                if (row % 2) {

                    RowBgStyle = 'bg-gray-300 text-gray-900';
                } else {
                    RowBgStyle = 'bg-gray-200 text-gray-900';

                }

                return (
                    <tr className={RowBgStyle} key={item["rowcount"]}>
                        <th scope="row" className="py-1 px-2 whitespace-nowrap dark:text-white text-center">
                            {item["rowcount"]}
                        </th>
                        <td className="py-1 px-2 text-center">
                            {item["floor"]}
                        </td>
                        <td className="py-1 px-2 text-center">
                            {item["area"]}
                        </td>
                        <td className="py-1 px-2 text-center">
                            {item["element"]}
                        </td>
                        <td className="py-1 px-2 text-center">
                            {item["defectDesc"].toUpperCase()}
                        </td>
                        <td className="py-1 px-2">
                            <div className='flex justify-center'><img src={item["url"]} alt='' height='100' width='100' /></div>
                        </td>
                        <td className="py-1 px-2">
                            <div className='flex justify-center items-center'><img src={dustbin} alt='' height='5' weight='5' onClick={() => confirmDelete(item["defectName"])} /></div>
                        </td>

                    </tr>
                )
            })}

            <tr className={`border-b dark:border-gray-700 font-semibold h-10 ${NAVBARCOLOR}`}>
                <td colSpan='8' align='center' className={`px-4 text-xs ${LABELCOLOR}`} >End of table</td>

            </tr>
        </tbody>
    </table>
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
        </Dialog></>);
}
export default ViewDesktop;