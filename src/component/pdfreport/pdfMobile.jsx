import FloorCountChart from "../chart/floorcountchart";
import AreaChart from "../chart/areachart";
import ElementChart from "../chart/elementchart";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,

} from "@material-tailwind/react";

import { NAVBARCOLOR, LABELCOLOR } from '../../utils/theme.js';

const PdfMobile = (result) => {
    let RowBgStyle = '';
    let row = 0;
    let desc = '';
    let desc2 = '';
    return (<>
        <div id='floorChart' className='w-screen'>{result.ele.length ? <FloorCountChart table={result.ele} /> : ''}</div>
        <div id='areaChart' className='w-screen'>{result.ele.length ? <AreaChart table={result.ele} /> : ''}</div>
        <div id='elementChart' className='w-screen'>{result.ele.length ? <ElementChart table={result.ele} /> : ''}</div>

        <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defect infos.</div>
        <div className={`flex items-center w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>


            {result.ele.map((item) => {
                row++;
                return (<>
                    <Card key={item["rowcount"]} className="bg-gradient-to-r from-teal-100 to-cyan-200 w-80 drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4">
                        <CardHeader floated={false} className="h-100">
                            <div className='flex justify-center bg-gradient-to-r from-teal-300 to-cyan-500'>{row}/{result.ele.length}</div>
                            <img src={item["url"]} alt="" />
                        </CardHeader>
                        <CardBody className='grow-0'>
                            <Typography className="flex flex-col justify-start text-base">
                                <div>FLOOR : {item["floor"]}</div>
                                <div>AREA : {item["area"]}</div>
                                <div>ELEMENT : {item["element"]}</div>
                                <div>DEFECT DESC : {item["defectDesc"].toUpperCase()}</div>

                            </Typography>
                        </CardBody>
                    </Card>

                </>
                )
            })}
        </div>
        <div className="flex justify-center w-screen" style={{ display: "none" }} >
            <table id='print' className="w-full table-auto rounded-lg text-left text-gray-500 dark:text-gray-400 text-xs">
                <thead className={`rounded-lg text-xs text-gray-700 uppercase ${NAVBARCOLOR} ${LABELCOLOR}`}>
                    <tr>
                        <th scope="col" className="py-1 px-2 text-center">
                            DEFECT INDEX
                        </th>
                        <th scope="col" className="py-1 px-2 text-center">
                            DEFECT LOCATION
                        </th>
                        <th scope="col" className="py-1 px-2 text-center">
                            DEFECT DESC
                        </th>
                        <th scope="col" className="py-1 px-2 text-center">
                            DEFECT POSITION
                        </th>
                        <th scope="col" className="py-1 px-2 text-center">
                            DEFECT IMAGE
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {result.ele.map((item) => {
                        row = row + 1
                        if (row % 2) {

                            RowBgStyle = 'bg-gray-300 text-gray-900 ';
                        } else {
                            RowBgStyle = 'bg-gray-200 text-gray-900 ';

                        }

                        if (item["defectDesc"].length > 40) {
                            desc = '';
                            desc2 = '';
                            const temp = item["defectDesc"].split(' ');

                            for (let i = 0; i < temp.length; i++) {
                                if (i < 6) {
                                    desc += temp[i] + ' ';
                                } else {
                                    desc2 += temp[i] + ' ';
                                }
                            }

                        } else {
                            desc = item["defectDesc"];
                            desc2 = '';
                        }


                        return (
                            <tr className={RowBgStyle} key={item["rowcount"]}>
                                <th scope="row" className="py-1 px-2 whitespace-nowrap dark:text-white text-center">
                                    {item["rowcount"]}
                                </th>
                                <td className="py-2 px-2">
                                    <div className=''>
                                        {item["floor"]},<br></br>
                                        {item["area"]},<br></br>
                                        {item["element"]}.
                                    </div>
                                </td>
                                <td className="py-2 px-2 text-center flex flex-col ">
                                    <div className='flex justify-start'>{desc}</div><br></br>
                                    <div className='flex justify-start'>{desc2}</div>
                                </td>
                                <td className="py-2 px-2">
                                    <div className='flex justify-center'><img id={item["rowcount"]} src={item["layouturl"]} alt='' className='w-16 h-16' /></div>
                                </td>

                                <td className="py-2 px-2">
                                    <div className='flex justify-center'><img src={item["url"]} alt='' className='w-16 h-16' /></div>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table></div>
    </>)

}
export default PdfMobile;