 
import logo from '../assets/logo.png';    
import { usePageTitle } from '../context/PageTitleContext'; 
const Header = () => {  
    const {pageTitle} = usePageTitle();  
     
    return (
        <div className='w-full py-10 flex items-center justify-between h-[50px]'>
            <div className='font-[700] text-[24px]'>{pageTitle}</div>
            <div className='flex justify-between gap-4 items-center'>
                <span className='font-[600] text-[14px]'>test</span>
                <img src={logo}></img>
            </div>
        </div>
    );
}

export default Header;
