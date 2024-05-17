import React from 'react';
import { Outlet , Navigate, useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import { useAuthContext } from '../hooks/useAuthContext'; 
import Header from '../components/Header'; 
const LayoutPage = () => { 
    const { user } = useAuthContext(); 
    return (
       <> 
        <div className='font-body h-full w-full flex bg-[#F7F8FC]'>  
            <Navbar/>  
            {
                user ?
                <Navigate to='/overview' replace={true} /> :
                <Navigate to='/login' replace={true} />
            }
            <div className='flex flex-col items-center w-full h-full px-10 py-5 gap-[50px]'>
                <Header/> 
                 <Outlet/> 
            </div>
        </div>
        </>
    );
}

export default LayoutPage;
