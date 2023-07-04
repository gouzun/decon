import FloorCountChart from "../chart/floorcountchart";
import AreaChart from "../chart/areachart";
import ElementChart from "../chart/elementchart";

import pin from '../../assets/img/pin-red.svg';
import { NAVBARCOLOR, LABELCOLOR } from '../../utils/theme.js';

const PdfDesktop = (result) => {
    let RowBgStyle = '';
    let row = 0;
  
    return (<><div id='floorChart' className='w-3/4'>{result.ele.length ? <FloorCountChart table={result.ele} /> : ''}</div>
        <div id='areaChart' className='w-3/4'>{result.ele.length ? <AreaChart table={result.ele} /> : ''}</div>
        <div id='elementChart' className='w-3/4'>{result.ele.length ? <ElementChart table={result.ele} /> : ''}</div>


        <div className={`flex items-top w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>
            <table id='print' className="w-full rounded-lg text-left text-gray-500 dark:text-gray-400 text-xs " style={{ tableLayout: 'fixed' }}>
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
               
                        
                        return (
                            <tr className={RowBgStyle} key={item["rowcount"]}>
                                <td scope="row" className="py-1 px-2 whitespace-nowrap dark:text-white text-center">
                                    {item["rowcount"]}
                                </td>
                                <td className="py-2 px-2">

                                    {item["floor"]},<br></br>
                                    {item["area"]},<br></br>
                                    {item["element"]}.

                                </td>
                                <td className="py-2 px-2 text-center">
                                    <div className='flex justify-start'>{item["defectDesc"]}</div>

                                </td>
                                <td className="py-2 px-2 relative">
                                    <div className='flex justify-center' style={{ position: 'relative' }}><img id={item["rowcount"]} src={item["layouturl"]} alt='' style={{ width: 300, height: 400 }}
                                    /></div>
                                    <div style={{ top: Number(item.defectypos)-26, left: Number(item.defectxpos)+55, zIndex: 1, position: 'absolute' }}>
                                    <img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>
                                            
                                </td>

                                <td className="py-2 px-2">
                                    <div className='flex justify-center'><img src={item["url"]} alt='' className='' height='400' width='300' /></div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>

            </table></div>

    </>)

}
export default PdfDesktop;
                 
// <td className="py-2 px-2 relative">
//                                     <div className='flex justify-center' style={{ position: 'relative' }}><img id={item["rowcount"]} src={item["layouturl"]} alt='' height="400" width="300"
//                                     /></div>
//                                     <div style={{ top: Number(item.defectypos)-26, left: Number(item.defectxpos)+55, zIndex: 1, position: 'absolute' }}>
//                                     <img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>
                                            
//                                 </td>