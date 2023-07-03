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
                    <div className='flex flex-row'>
                        <div className='flex flex-col' width='400'>
                            <div><img src={item["layouturl"]} alt="" height="400" width="300"/></div>
                            <div><img src={item["url"]} alt="" height="400" width="300"/></div>
                            <div><Typography className="flex flex-col justify-start text-base mt-4">
                            <div>FLOOR : {item["floor"]}</div>
                            <div>AREA : {item["area"]}</div>
                            <div>ELEMENT : {item["element"]}</div>
                            <div>DEFECT DESC : {item["defectDesc"].toUpperCase()}</div>
                        </Typography></div>
                        </div>
                    </div>

                    

                </>
                )
            })}
        </div>
       
    </>)

}
export default PdfMobile;