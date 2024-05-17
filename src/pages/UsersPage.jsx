// UsersPage.js
import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../context/PageTitleContext'; 
import { formatDateApi } from '../utils/formatDateApi';
import UsersTable from '../components/UsersTable';
import { UsersDataContextProvider, useUsersData } from '../context/UsersDataContext';  
import InternalDatePicker from '../components/InternalDatePicker';

const UsersPage = () => {  
    const { setTitle, handleDateRangeChange } = usePageTitle(); 
    const { limit, handleDateRangeChange: contextHandleDateRangeChange } = useUsersData();  
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date('2023-01-01'), 
        endDate: new Date('2023-04-01'), 
        key: 'selection',
    });  

    useEffect(() => {
        setTitle('Users');
        return () => {
            setTitle('');
        }
    },[]);

    const handleSelectDate = (ranges) => {   
        contextHandleDateRangeChange(ranges);  
        setSelectionRange(prevState => ({
            ...prevState,
            ...ranges.selection
        }));  
    }; 
    
    return (
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='w-full flex justify-end m-10 mt-0 relative'>
                <InternalDatePicker
                    selectionRange={selectionRange}
                    onSelectDate={handleSelectDate}
                /> 
            </div>
            <UsersTable />
        </div>
    );
}

const UsersPageWithContext = () => {
    return (
        <UsersDataContextProvider>
            <UsersPage/>
        </UsersDataContextProvider>
    )
}

export default UsersPageWithContext;
