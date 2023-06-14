import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import { GeneralContext } from '../../context/generalcontext.component';
import { useContext, useState, useEffect, React } from "react";
import { generateProjectList } from '../../utils/firebase/firebase.utils';
import { NAVBARCOLOR, BUTTONCOLOR, LABELCOLOR, LABELHOVERCOLOR } from '../../utils/theme.js';
import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import { retrievePDFSummary, getUserNameAddress } from '../../utils/firebase/firebase.utils';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
        setProjectList([]);

    };

    const handleInitWithoutLoading = () => {
        setEle([]);
        setRowCount(0);
    };

    // const getHighestCount = (sortedObject) => {
    //     let obj = sortedObject
    //     let highestCount = '';
    //     let highestKey = '';

    //     Object.keys(obj).map((key) => {
    //         if (obj[key] > highestCount) {
    //             highestKey = key;
    //             highestCount = obj[key];
    //         }
    //     });
    //     // console.log(highestKey, highestCount);

    //     return { highestKey, highestCount };
    // }

    const getPercentage = (sortedObject, totalCount, status, str) => {

        let obj = sortedObject;
        let desc = '';
        if (status === 'floor') {
            desc += `There are total of ${totalCount} defects on this inspected property.`
        }
        if (status === 'area') {
            desc += `The total of ${totalCount} defects are divided by area, and each area will have their individual defect count as well.As defect count grouped into area,`
        }
        if (status === 'ele') {
            desc += `Defects can also be grouped into each different type of element defect as well. From the total of ${totalCount} defects,`
        }

        Object.keys(obj).map((key) => {
            desc += ` ${(obj[key] / totalCount * 100).toFixed(2)}% of defects are ${str} ${key}, which are total of ${obj[key]} defects.`
        });

        return desc;

    }


    const pdf = async () => {

        if (ownerName && propertyAdd) {

            const doc = new jsPDF('portrait');
            let count = 0;

            let imgstatus = 0;
            let arrRow = 0;
            let pinimg = new Image();
            let tdcount = 0;
            pinimg.src = 'https://firebasestorage.googleapis.com/v0/b/defixdb.appspot.com/o/redpin.png?alt=media&token=8869a2c5-d959-48bd-be9c-393a36b78efe';

            //get user project and address
            // let arrResult = await getUserNameAddress(curProject, currentUser);

            let floorChart = document.getElementById('floorChart');
            let floorChartImg = floorChart.lastElementChild.firstChild.toDataURL("image/png", 0.3);

            let areaChart = document.getElementById('areaChart');
            let areaChartImg = areaChart.lastElementChild.firstChild.toDataURL("image/png", 0.3);

            let elementChart = document.getElementById('elementChart');
            let elementChartImg = elementChart.lastElementChild.firstChild.toDataURL("image/png", 0.3);


            doc.text('DEFECT INSPECTION REPORT', 110, 20, { align: 'center' });
            doc.line(20, 25, 200, 25);
            doc.setFontSize(16);

            doc.text('OWNER NAME', 30, 40, { align: 'left' });
            doc.setTextColor(30, 144, 255);
            doc.setFontSize(22);
            doc.text(ownerName, 30, 50, { align: 'left' });


            if (contact) {

                doc.setFontSize(16);
                doc.setTextColor(0, 0, 0);
                doc.text('CONTACT NUMBER', 140, 40, { align: 'left' });

                doc.setTextColor(30, 144, 255);
                doc.setFontSize(22);
                doc.text(contact, 140, 50, { align: 'left' });
            }

            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('PROPERTY ADDRESS', 30, 70, { align: 'left' });
            doc.setTextColor(30, 144, 255);
            doc.setFontSize(20);

            let add = propertyAdd;
            if (add.length > 40) {
                doc.text(add.substring(0, 40), 30, 80, { align: 'left' })
                doc.text(add.substring(40, 80), 30, 90, { align: 'left' })
                doc.text(add.substring(80, 120), 30, 100, { align: 'left' })
            } else {
                doc.text(add, 30, 80, { align: 'left' })
            }


            doc.setFontSize(18);
            doc.setTextColor(0, 0, 0);
            doc.text('RECEIVED BY ', 110, 120, { align: 'center' });
            doc.setFontSize(16);
            doc.text('SIGNATURE ', 20, 140, { align: 'left' });
            doc.text('NAME&DESIGNATION', 80, 140, { align: 'left' });
            doc.text('DATE RECEIVED', 150, 140, { align: 'left' });
            doc.line(20, 170, 70, 170);
            doc.line(80, 170, 140, 170);
            doc.line(150, 170, 200, 170);


            let flrcounts = [];
            ele.forEach((record) => {
                flrcounts[record.floor] = (flrcounts[record.floor] || 0) + 1;
            });

            let areacounts = [];
            ele.forEach((record) => {
                areacounts[record.area] = (areacounts[record.area] || 0) + 1;
            })

            let elecounts = [];
            ele.forEach((record) => {
                elecounts[record.element] = (elecounts[record.element] || 0) + 1;
            });

            doc.addPage();
            doc.setFontSize(16);
            doc.text('DEFECT SUMMARY CHART BY FLOOR', 110, 20, { align: 'center' });
            doc.line(20, 25, 200, 25);
            doc.addImage(floorChartImg, 'JPEG', 50, 35, 110, 70, undefined, 'FAST');
            doc.setFontSize(10);

            let desc = getPercentage(flrcounts, ele.length, 'floor', 'at');
            let maxlength = 110;
            if (desc.length > maxlength) {
                let words = desc.split(" ");
                let lines = [];
                let currentLine = "";

                for (let i = 0; i < words.length; i++) {
                    if ((currentLine + words[i]).length <= maxlength) {
                        currentLine += words[i] + " ";
                    } else {
                        lines.push(currentLine);
                        currentLine = words[i] + " ";
                    }
                }

                if (currentLine.trim() !== "") {
                    lines.push(currentLine);
                }

                let startY = 110;
                let lineHeight = 5;

                for (let i = 0; i < lines.length; i++) {
                    doc.text(lines[i], 20, startY, { align: 'left' });
                    startY += lineHeight;
                }
            } else {
                doc.text(desc, 20, 110, { align: 'left' });
            }


            doc.addPage();
            doc.setFontSize(16);
            doc.text('DEFECT SUMMARY CHART BY AREA', 110, 20, { align: 'center' });
            doc.line(20, 25, 200, 25);
            doc.addImage(areaChartImg, 'JPEG', 50, 35, 110, 70, undefined, 'FAST');
            doc.setFontSize(10);

            desc = getPercentage(areacounts, ele.length, 'area', 'from');
            maxlength = 110;
            if (desc.length > maxlength) {
                let words = desc.split(" ");
                let lines = [];
                let currentLine = "";

                for (let i = 0; i < words.length; i++) {
                    if ((currentLine + words[i]).length <= maxlength) {
                        currentLine += words[i] + " ";
                    } else {
                        lines.push(currentLine);
                        currentLine = words[i] + " ";
                    }
                }

                if (currentLine.trim() !== "") {
                    lines.push(currentLine);
                }

                let startY = 110;
                let lineHeight = 5;

                for (let i = 0; i < lines.length; i++) {
                    doc.text(lines[i], 20, startY, { align: 'left' });
                    startY += lineHeight;
                }
            } else {
                doc.text(desc, 20, 110, { align: 'left' });
            }


            doc.addPage();
            doc.setFontSize(16);
            doc.text('DEFECT SUMMARY CHART BY ELEMENT', 110, 20, { align: 'center' });
            doc.line(20, 25, 200, 25);
            doc.addImage(elementChartImg, 'JPEG', 50, 35, 110, 70, undefined, 'FAST');
            doc.setFontSize(10);

            desc = getPercentage(elecounts, ele.length, 'ele', 'on');
            maxlength = 110;
            if (desc.length > maxlength) {
                let words = desc.split(" ");
                let lines = [];
                let currentLine = "";

                for (let i = 0; i < words.length; i++) {
                    if ((currentLine + words[i]).length <= maxlength) {
                        currentLine += words[i] + " ";
                    } else {
                        lines.push(currentLine);
                        currentLine = words[i] + " ";
                    }
                }

                if (currentLine.trim() !== "") {
                    lines.push(currentLine);
                }

                let startY = 110;
                let lineHeight = 5;

                for (let i = 0; i < lines.length; i++) {
                    doc.text(lines[i], 20, startY, { align: 'left' });
                    startY += lineHeight;
                }
            } else {
                doc.text(desc, 20, 110, { align: 'left' });
            }



            doc.addPage();
            doc.setFontSize(16);

            doc.text('DEFECT LIST', 110, 15, { align: 'center' });
            doc.line(20, 22, 200, 22);
            doc.setFontSize(12);

            let y = 30;
            let imageY = 20
            let pageCount = 1;
           
            ele.forEach((rec, index) => {
            
                doc.text('DEFECT NO :', 20, y, { align: 'left' });
                doc.text((rec.rowcount).toString(), 55, y, { align: 'left' });
                imageY = y - 5;
                y += 5;

                // doc.text('PROJECT :', 20, y, { align: 'left' });
                // doc.text(rec.project, 55, y, { align: 'left' });
                y += 5;

                doc.text('FLOOR :', 20, y, { align: 'left' });
                doc.text(rec.floor, 55, y, { align: 'left' });
                y += 5;

                doc.text('AREA :', 20, y, { align: 'left' });
                doc.text(rec.area, 55, y, { align: 'left' });
                y += 5;

                doc.text('ELEMENT :', 20, y, { align: 'left' });
                doc.text(rec.element, 55, y, { align: 'left' });
                y += 5;

                doc.text('DESCRIPTION :', 20, y, { align: 'left' });
                y += 10;


                //make line split if length more than 30 
                
                if (rec.defectDesc.length > 30) {
                    let words = rec.defectDesc.split(' ');
                    let lines = [];
                    let currentLine = '';

                    for (let i = 0; i < words.length; i++) {
                        if ((currentLine + ' ' + words[i]).length <= 30) {
                            currentLine += ' ' + words[i];
                        } else {
                            lines.push(currentLine.trim());
                            currentLine = words[i];
                        }
                    }

                    if (currentLine !== '') {
                        lines.push(currentLine.trim());
                    }

                    for (let i = 0; i < lines.length; i++) {
                        doc.text(lines[i], 20, y + (i * 5), { align: 'left' });
                    }
                } else {
                    doc.text(rec.defectDesc, 20, y, { align: 'left' });
                }


                y += 15;

                let layoutUrl = rec.layouturl
                doc.addImage(layoutUrl, 'JPEG', 110, imageY, 40, 53); // adjust the coordinates and dimensions as needed

                let defectUrl = rec.url
                doc.addImage(defectUrl, 'JPEG', 155, imageY, 40, 53); // adjust the coordinates and dimensions as needed
                console.log(rec.defectxpos,rec.defectypos);
                let pin = 'https://res.cloudinary.com/drpsfwq3y/image/upload/v1685584139/decon/pin_n4gkso.png';
                doc.addImage(pin, 'PNG', 110 + (rec.defectxpos/100)-37, imageY + (rec.defectypos/100)-17, 10, 10);   
                   
                y += 3;
                doc.line(20, y, 200, y);
                y += 7;
                if (y > 265) {
                    doc.text('Page ' + pageCount, 100, y + 20, { align: 'left' });
                    doc.addPage();
                    pageCount += 1;
                    y = 25
                    doc.line(20, 22, 200, 22);
                    imageY = y - 5;
                    y += 5;
                }
            })


            doc.text('Page ' + pageCount, 100, y + 20, { align: 'left' });
            doc.text('End of Report', 95, y + 25, { align: 'left' });
            let documentname = 'test.pdf'

            doc.save(documentname);
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
                    <div style={{ position: "absolute", 
                    top: getOffset(document.getElementById(item["rowcount"])).top 
                    + (document.getElementById(item["rowcount"]).clientWidth * item["defectypos"] / 100) - 15.5, 
                    left: getOffset(document.getElementById(item["rowcount"])).left 
                    + (document.getElementById(item["rowcount"]).clientWidth * item["defectxpos"] / 100) - 7, zIndex: '100' }}>
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

        <div className='flex flex-col justify-center place-items-center items-center bg-gray-300 w-full min-h-screen'>
            <Header headerText={{ title: 'PDF SUMMARY' }} />

            <div className='w-80 flex justify-center p-2  my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100 z-50'>
                <Select id='projectDD' label="SELECT PROJECT [*required]" onChange={handlePDD} onClick={generateDropDown}>
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
                    <div className="w-64 flex justify-center">Information below will be displayed in pdf report.</div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Input label="OWNER NAME*" value={ownerName} onChange={handleOwnerNameChange} />
                    </div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Input label="CONTACT NUMBER" value={contact} onChange={handleContactChange} />
                    </div>
                    <div className="w-64 flex justify-center p-2 my-2 rounded-lg drop-shadow-lg shadow-lg bg-gray-100">
                        <Textarea label="PROPERTY ADDRESS*" value={propertyAdd} onChange={handlePropertyAddChange} />
                    </div>

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