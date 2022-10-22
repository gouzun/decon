


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";


const Header = ({ headerText }) => {
    return (

        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h3 className="text-md font-bold tracking-tight text-gray-600 drop-shadow-xl shadow-black">{headerText.title}</h3>
        </div>
    );
};
export default Header;
// <div className='flex justify-center text-lg font-semibold py-5'>{headerText.title}</div>