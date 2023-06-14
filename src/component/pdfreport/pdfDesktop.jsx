import FloorCountChart from "../chart/floorcountchart";
import AreaChart from "../chart/areachart";
import ElementChart from "../chart/elementchart";

import { NAVBARCOLOR, LABELCOLOR } from '../../utils/theme.js';

const PdfDesktop = (result) => {
    let RowBgStyle = '';
    let row = 0;
    let desc = '';
    let desc2 = '';
    return (<><div id='floorChart' className='w-2/4'>{result.ele.length ? <FloorCountChart table={result.ele} /> : ''}</div>
        <div id='areaChart' className='w-2/4'>{result.ele.length ? <AreaChart table={result.ele} /> : ''}</div>
        <div id='elementChart' className='w-2/4'>{result.ele.length ? <ElementChart table={result.ele} /> : ''}</div>


        <div className="flex w-full ">
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

                        // if (item["defectDesc"].length > 40) {
                        //     desc = '';
                        //     desc2 = '';
                        //     const temp = item["defectDesc"].split(' ');

                        //     for (let i = 0; i < temp.length; i++) {
                        //         if (i < 6) {
                        //             desc += temp[i] + ' ';
                        //         } else {
                        //             desc2 += temp[i] + ' ';
                        //         }
                        //     }

                        // } else {
                        //     desc = item["defectDesc"];
                        //     desc2 = '';
                        // }


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
                                <td className="py-2 px-2">
                                    <div className='flex justify-center'><img id={item["rowcount"]} src={item["layouturl"]} alt='' className='' height='400' width='300' /></div>
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