import FloorCountChart from "../chart/floorcountchart";
import AreaChart from "../chart/areachart";
import ElementChart from "../chart/elementchart";
import {
    Card,

    CardBody,

} from "@material-tailwind/react";
import pin from '../../assets/img/pin-red.svg';

const PdfMobile = (result) => {

    let row = 0;

    return (<>
        <div id='floorChart' className='w-3/4'>{result.ele.length ? <FloorCountChart table={result.ele} /> : ''}</div>
        <div id='areaChart' className='w-3/4'>{result.ele.length ? <AreaChart table={result.ele} /> : ''}</div>
        <div id='elementChart' className='w-3/4'>{result.ele.length ? <ElementChart table={result.ele} /> : ''}</div>

        <div className='text-base flex justify-center my-2 text-gray-600'>Scroll right to view more defect infos.</div>
        <div className={`flex items-top w-full drop-shadow-lg shadow-lg overflow-x-auto shrink-0 `}>


            {result.ele.map((item) => {
                row++;
                return (<>
                    <Card id={item["rowcount"]} className="drop-shadow-lg shadow-lg flex-none my-2 mb-8 mx-4 bg-gradient-to-r from-teal-100 to-cyan-200" style={{ width: 360 }}>
                        <CardBody id={item["rowcount"]} className="card-body h-auto">
                            <div className="flex justify-center pb-2">
                                {row}/{result.ele.length}
                            </div>

                            <div className='card-image object-contain shadow-xl shadow-blue-gray-900/50 flex justify-center' style={{ position: 'relative' }}><img id={item["rowcount"]} src={item["layouturl"]} alt='' style={{ width: 300, height: 400 }}
                            /></div>
                            <div style={{ top: Number(item.defectypos) + 20, left: Number(item.defectxpos) + 12.5, zIndex: 1, position: 'absolute' }}>
                                <img src={pin} alt='' style={{ width: 35, height: 35 }} /></div>


                            <div className="flex flex-col justify-center text-base py-4">
                                <div className='py-3 font-bold h-12 flex flex-row'>
                                    <div className='w-28 '>FLOOR : </div><div className=''>{item["floor"]}</div></div>

                                <div className='py-3 font-bold h-12 flex flex-row'>
                                    <div className='w-28 '>AREA : </div><div className=''>{item["area"]}</div></div>

                                <div className='py-3 font-bold h-12 flex flex-row'>
                                    <div className='w-28 '>ELEMENT : </div><div className=''>{item["element"]}</div></div>

                                <div className='py-3 font-bold h-32 flex flex-col gap-2'>
                                    <div className='w-28 '>DEFECTS : </div>
                                    <div className='flex justfiy-left'>{item["defectDesc"]}</div></div>
                                <div className='flex justify-center'>
                                    <img src={item["url"]} alt="" className=" rounded-lg shadow-xl shadow-blue-gray-900/50" height="400" width="300" />
                                </div>

                            </div>

                        </CardBody>

                    </Card>




                </>
                )
            })}
        </div>

    </>)

}
export default PdfMobile;