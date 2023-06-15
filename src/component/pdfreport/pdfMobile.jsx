import FloorCountChart from "../chart/floorcountchart";
import AreaChart from "../chart/areachart";
import ElementChart from "../chart/elementchart";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import pin from '../../assets/img/pin-red.svg';
import { NAVBARCOLOR, LABELCOLOR } from '../../utils/theme.js';

const PdfMobile = (result) => {
    let RowBgStyle = '';
    let row = 0;
    let desc = '';
    let desc2 = '';
    return (<>
        <div id='floorChart' className='w-3/4'>{result.ele.length ? <FloorCountChart table={result.ele} /> : ''}</div>
        <div id='areaChart' className='w-3/4'>{result.ele.length ? <AreaChart table={result.ele} /> : ''}</div>
        <div id='elementChart' className='w-3/4'>{result.ele.length ? <ElementChart table={result.ele} /> : ''}</div>

        <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defect infos.</div>
        <div className={`flex items-center w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>


            {result.ele.map((item) => {
                row++;
                return (<>
                    <Card key={item["rowcount"]} className="bg-gradient-to-r from-teal-100 to-cyan-200 w-80 drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4">
                        <CardHeader floated={false} className="">
                            <div className='flex justify-center bg-gradient-to-r from-teal-300 to-cyan-500'>{row}/{result.ele.length}</div>
                            <img src={item["url"]} alt="" height="400" width="300"/>
                        </CardHeader>
                        <CardBody className='h-96'>
                         
                            <Typography className="flex flex-col justify-start text-base mt-4">
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
       
    </>)

}
export default PdfMobile;