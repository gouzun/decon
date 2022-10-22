import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { GeneralContext } from '../../context/generalcontext.component';
import { useContext, useState, useEffect, React } from "react";
import { generateProjectList } from '../../utils/firebase/firebase.utils';
import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import { retrievePDFSummary, getUserNameAddress } from '../../utils/firebase/firebase.utils';
import jsPDF from "jspdf";
import pin from '../../assets/img/pin-red.svg';
import spinner from '../../assets/img/spinner.svg';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import PdfDesktop from "./pdfDesktop";
import PdfMobile from "./pdfMobile";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const PdfReport = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {
        projectList, setProjectList,
        setCurFloor,
        curProject, setCurProject, ownerName, setOwnerName, contact, setContact, propertyAdd, setPropertyAdd
    } = useContext(GeneralContext);

    const [marker, setMarker] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [ele, setEle] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setCurrentUser(sessionStorage.getItem('user'));
        }
        else {
            navigate('/');
        }

        generateDropDown();
    }, []);

    const handlePDD = (value) => {
        setCurProject(value);
    };

    const generateDropDown = async () => {
        let arrProject = [];
        if (!curProject) {
            const projectObj = await generateProjectList(currentUser);

            projectObj.forEach((project) => {
                arrProject.push(project.propertyName + '-' + project.ownerName);
            })
            setProjectList(arrProject);
        }
    };

    useEffect(() => {
        generateDropDown();
    }, [currentUser]);



    const handleSearch = async () => {
        try {
            setMarker('');

            if (curProject) {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Searching for records. <img src={spinner} alt='' /></div>);

                await retrievePDFSummary(curProject, currentUser).then((arrResult) => {

                    setEle(arrResult);
                    setRowCount(arrResult.length);
                    setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Summary generated.</div>);


                });
            } else {
                setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Please select a project.</div>);
            }
        }
        catch (error) {
            console.log(`Error :${error.code},${error.message}`);
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Item not exist!</div>);
            handleInitWithoutLoading();
        }

    };


    const handleInit = () => {
        setCurFloor('');
        setCurProject('');
        setEle([]);
        setRowCount(0);
        setIsLoading('');

    };

    const handleInitWithoutLoading = () => {
        setEle([]);
        setRowCount(0);
    };

    const pdf = async () => {
        setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Generating pdf file <img src={spinner} alt='' /></div>);

        if (ownerName && propertyAdd) {

            const doc = new jsPDF('landscape');
            let count = 0;

            let imgstatus = 0;
            let arrRow = 0;
            let pinimg = new Image();
            let tdcount = 0;
            pinimg.src = 'https://firebasestorage.googleapis.com/v0/b/defixdb.appspot.com/o/redpin.png?alt=media&token=8869a2c5-d959-48bd-be9c-393a36b78efe';

            //get user project and address
            // let arrResult = await getUserNameAddress(curProject, currentUser);

            let floorChart = document.getElementById('floorChart');
            let floorChartImg = floorChart.lastElementChild.firstChild.toDataURL("image/png", 1.0);

            let areaChart = document.getElementById('areaChart');
            let areaChartImg = areaChart.lastElementChild.firstChild.toDataURL("image/png", 1.0);

            let elementChart = document.getElementById('elementChart');
            let elementChartImg = elementChart.lastElementChild.firstChild.toDataURL("image/png", 1.0);


            doc.setFontSize(22);

            doc.text('DEFECT INSPECTION REPORT', 150, 20, { align: 'center' });
            doc.line(50, 25, 250, 25);
            doc.setFontSize(16);

            doc.text('OWNER NAME', 50, 40, { align: 'left' });
            doc.setTextColor(30, 144, 255);
            doc.setFontSize(22);
            doc.text(ownerName, 60, 50, { align: 'left' });


            if (contact) {

                doc.setFontSize(16);
                doc.setTextColor(0, 0, 0);
                doc.text('CONTACT NUMBER', 170, 40, { align: 'left' });

                doc.setTextColor(30, 144, 255);
                doc.setFontSize(22);
                doc.text(contact, 180, 50, { align: 'left' });
            }

            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('PROPERTY ADDRESS', 50, 70, { align: 'left' });
            doc.setTextColor(30, 144, 255);
            doc.setFontSize(20);

            let add = propertyAdd;
            if (add.length > 50) {
                doc.text(add.substring(0, 50), 60, 80, { align: 'left' })
                doc.text(add.substring(50), 60, 90, { align: 'left' })
            } else {
                doc.text(add, 60, 80, { align: 'left' })
            }


            doc.setFontSize(18);
            doc.setTextColor(0, 0, 0);
            doc.text('RECEIVED BY ', 150, 120, { align: 'center' });
            doc.setFontSize(16);
            doc.text('SIGNATURE ', 50, 140, { align: 'left' });
            doc.text('NAME & DESIGNATION', 120, 140, { align: 'left' });
            doc.text('DATE RECEIVED', 200, 140, { align: 'left' });
            doc.line(50, 170, 100, 170);
            doc.line(120, 170, 180, 170);
            doc.line(200, 170, 250, 170);

            doc.addPage();
            doc.setFontSize(22);
            doc.text('DEFECT COUNT SUMMARY CHART', 150, 20, { align: 'center' });
            doc.line(50, 25, 250, 25);
            doc.addImage(floorChartImg, 'JPEG', 20, 35, 110, 70, undefined, 'FAST');
            doc.addImage(areaChartImg, 'JPEG', 160, 35, 110, 70, undefined, 'FAST');
            doc.addImage(elementChartImg, 'JPEG', 80, 120, 140, 70, undefined, 'FAST');


            doc.addPage();
            doc.setFontSize(14);
            doc.autoTable({
                html: '#print',
                bodyStyles: { minCellHeight: 34 },
                didDrawCell: function (data) {
                    tdcount++;

                    if (!imgstatus) {
                        //to skip the header
                        if (count === 4) {
                            imgstatus = 1;
                            count = -1;


                            if (tdcount === 35) {
                                tdcount = 5;
                            }
                        }

                    } else {


                        if ((ele[arrRow] != undefined)) {
                            if (data.column.index === 3 && data.cell.section === 'body') {
                                if (count === 3) {
                                    var td = data.cell.raw;

                                    var img = td.getElementsByTagName('img')[0];
                                    var dim = data.cell.height - data.cell.padding('vertical');

                                    doc.addImage(img.src, data.cell.x, data.cell.y + 1, dim, dim, undefined, 'FAST');

                                    doc.addImage(pinimg.src, data.cell.x + (dim * ele[arrRow].defectxpos / 100) - 1.5, data.cell.y + (dim * ele[arrRow].defectypos / 100) - 2.1, 3, 3, undefined, 'FAST');

                                }
                            }
                            if (data.column.index === 4 && data.cell.section === 'body') {
                                if (count === 4) {
                                    // console.log(`ele[arrRow] url:`,ele[arrRow].url);
                                    count = -1;
                                    var td4 = data.cell.raw;
                                    var img4 = td4.getElementsByTagName('img')[0];
                                    var dim4 = data.cell.height - data.cell.padding('vertical');
                                    // console.log(img4);
                                    doc.addImage(img4.src, data.cell.x, data.cell.y + 1, dim4, dim4, undefined, 'FAST');

                                }
                            }
                            if (count === -1) {
                                arrRow++;

                            }
                            //will be header after 30 td cell
                            if (tdcount === 30) {
                                imgstatus = 0;
                            }
                            //after td cell, continue reading table and initialize tdcount.


                        }
                    }


                    count++;
                }

            });


            doc.save('defectsummary.pdf');
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-green-100 w-72  drop-shadow-md shadow-md'>Pdf report generated.</div>);
            handleOpen();
        } else {
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-red-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Please fill required fields.</div>);

        }
    }

    useEffect(() => {

        let strJsx = [];


        ele.forEach((item) => {

            strJsx.push(<div key={item["rowcount"]}>
                <div style={{ position: "absolute", top: getOffset(document.getElementById(item["rowcount"])).top + (document.getElementById(item["rowcount"]).clientWidth * item["defectypos"] / 100) - 15.5, left: getOffset(document.getElementById(item["rowcount"])).left + (document.getElementById(item["rowcount"]).clientWidth * item["defectxpos"] / 100) - 7, zIndex: '100' }}>
                    <img src={pin} alt='' style={{ width: 15, height: 15 }} /></div>

            </div>);
        });

        setMarker(strJsx);


    }, [ele]);

    function getOffset(el) {
        if (el) {
            const rect = el.getBoundingClientRect();
            return {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY
            };
        }
    }

    useEffect(() => {
        function updateSize() {
            let strJsx = [];


            ele.forEach((item) => {

                strJsx.push(<div key={item["rowcount"]}>
                    <div style={{ position: "absolute", top: getOffset(document.getElementById(item["rowcount"])).top + (document.getElementById(item["rowcount"]).clientWidth * item["defectypos"] / 100) - 15.5, left: getOffset(document.getElementById(item["rowcount"])).left + (document.getElementById(item["rowcount"]).clientWidth * item["defectxpos"] / 100) - 7, zIndex: '100' }}>
                        <img src={pin} alt='' style={{ width: 15, height: 15 }} /></div>

                </div>);
            });

            setMarker(strJsx);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [ele]);


    const handleExport = async () => {
        if (curProject) {
            setIsLoading('');
            //load owner info

            let arrResult = await getUserNameAddress(curProject, currentUser);
            setOwnerName(arrResult[0].ownerName);
            setPropertyAdd(arrResult[0].propertyAddress);

            handleOpen();
        } else {
            setIsLoading(<div className='flex justify-center text-sm py-2 h-5 text-green-700 items-center bg-red-100 w-72  drop-shadow-md shadow-md'>Please search a project.</div>);
        }
    }

    const handleOwnerNameChange = (event) => {
        setOwnerName(event.target.value.toUpperCase());
    };

    const handlePropertyAddChange = (event) => {
        setPropertyAdd(event.target.value.toUpperCase());
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
    };

    return (

        <div className='flex flex-col justify-center place-items-center items-center bg-gray-300 w-full h-full'>
            <Header headerText={{ title: 'PDF SUMMARY' }} />

            <div className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-50'>
                <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handlePDD} >
                    {projectList.map((item) => (<Option key={item} value={item}>{item}</Option>))}
                </Select>
            </div>

            {isLoading}

            <div className="w-80 flex justify-center p-2 my-2 gap-2">
                <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleSearch}>SEARCH</Button>
                <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleInit}>RESET</Button>
                <Button className={`drop-shadow-lg shadow-lg ${BUTTONCOLOR} ${LABELCOLOR} ${LABELHOVERCOLOR}`} variant="gradient" type="submit" onClick={handleExport}>EXPORT PDF</Button>
            </div>
            <div className='flex justify-center text-sm py-2 h-10 font-semibold'>Record(s) found : {rowCount}</div>

            {isMobile ? '' : marker}
            {isMobile ? <PdfMobile ele={ele} /> : <PdfDesktop ele={ele} />}

            <Footer />
            <Dialog open={open} handler={handleOpen} size='xl' className='flex justify-center flex-col items-center'>
                <DialogHeader className='flex justify-center text-green-200 '>EXPORT TO PDF FILE</DialogHeader>
                <DialogBody className='text-gray-800 flex flex-col justify-center items-center w-72 '>
                    <div className="w-64 flex justify-center">Information below will be display in pdf report.</div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Input label="OWNER NAME*" value={ownerName} onChange={handleOwnerNameChange} />
                    </div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Input label="CONTACT NUMBER" value={contact} onChange={handleContactChange} />
                    </div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Textarea label="PROPERTY ADDRESS*" value={propertyAdd} onChange={handlePropertyAddChange} />
                    </div>

                    {isLoading}
                </DialogBody>
                <DialogFooter className='flex justify-center'>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={pdf} >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>

    );
}
export default PdfReport;