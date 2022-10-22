import OWNER from '../../assets/img/owner.png'
import AGENT from '../../assets/img/agent.png';
import DEVELOPER from '../../assets/img/developer.png';
import CONTRACTOR from '../../assets/img/contractor.png';
import INSPECTOR from '../../assets/img/defect inspector.png';
import '../../App.css';


const Users = () => {

    return (<>
        
        <div className='marquee'>
            <div className='marquee__content flex overflow-x-auto '>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={OWNER} alt='' height='200' width='200' /><div className='flex justify-center'>UNIT OWNER</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={AGENT} alt='' height='200' width='200' /><div className='flex justify-center'>PROPERTY AGENT</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={CONTRACTOR} alt='' height='200' width='200' /><div className='flex justify-center'>CONTRACTOR</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={DEVELOPER} alt='' height='200' width='200' /><div className='flex justify-center'>DEVELOPER</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={INSPECTOR} alt='' height='200' width='200' /><div className='flex justify-center'>DEFECT INSPECTOR</div></div>

            </div>
            <div className='marquee__content flex overflow-x-auto ' aria-hidden="true">
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={OWNER} alt='' height='200' width='200' /><div className='flex justify-center'>UNIT OWNER</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={AGENT} alt='' height='200' width='200' /><div className='flex justify-center'>PROPERTY AGENT</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={CONTRACTOR} alt='' height='200' width='200' /><div className='flex justify-center'>CONTRACTOR</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={DEVELOPER} alt='' height='200' width='200' /><div className='flex justify-center'>DEVELOPER</div></div>
                <div className='flex justify-center flex-col items-center text-sm shrink-0 px-2'><img className='flex justify-center' src={INSPECTOR} alt='' height='200' width='200' /><div className='flex justify-center'>DEFECT INSPECTOR</div></div>

            </div>
        </div>
    </>);

}
export default Users;