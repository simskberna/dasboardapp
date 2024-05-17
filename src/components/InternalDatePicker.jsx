import React, { useState, useEffect, useRef } from 'react';
import { formatDateApi } from '../utils/formatDateApi'; 
import calender from '../assets/calender.png';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';    


const InternalDatePicker = ({selectionRange,onSelectDate}) => { 
     

    const divRef = useRef(null); 
    const [showDateRange, setShowDateRange] = useState(false); 

    const handleShowDateRange = () => {
        setShowDateRange(!showDateRange);
    };

    const handleSelectDate = (ranges) => {     
        onSelectDate(ranges)
    }; 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target) && !event.target.classList.contains('date-range-picker-trigger')) {
                setShowDateRange(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); 

     
    return (
        <div className='date-picker '>
            <div className='flex-col relative w-full'>
                <span className=''>Date Range</span>
                <div className='date-range-picker-trigger cursor-pointer border-solid border-2 border-[#e5e7eb] rounded-md flex items-center justify-center p-2 h-[40px] bg-white'
                    onClick={handleShowDateRange} 
                >
                    {formatDateApi(selectionRange.startDate)} - {formatDateApi(selectionRange.endDate)}  
                    <img className='date-range-picker-trigger pl-5' src={calender} alt="calendar" />
                </div>
            </div>
            <div 
                ref={divRef}
                className={`absolute top-[100px] right-0 z-30 ${showDateRange ? '' : 'hidden'}`}>
                <DateRangePicker  
                    ranges={[selectionRange]}
                    onChange={handleSelectDate} 
                /> 
            </div>
        </div>
    );
}

export default InternalDatePicker;
