import React, { createContext, useContext, useEffect, useState, useRef } from 'react'; 
import { formatDateApi } from '../utils/formatDateApi';

export const UsersDataContext = createContext(); 
export const useUsersData = () => useContext(UsersDataContext); 

export const UsersDataContextProvider = ({ children }) => {
    const [usersData, setUsersData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const [total, setTotal] = useState(1);
    const [startDate, setStartDate] = useState('2023-01-08'); 
    const [endDate, setEndDate] = useState('2023-05-30');
    const currentPage = useRef(1);

    const fetchData = async () => { 
        try {
            const response = await fetch(`${process.env.REACT_APP_USERS}startDate=${startDate}&endDate=${endDate}&page=${currentPage.current}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
         
            setPageCount(data.lastPage); 
            if (data.data.length !== limit) {  
                setUsersData(data.data.slice(0, limit));
            } else {
                setUsersData(data.data);
            }  
             
           
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    }; 
    useEffect(() => { 
        fetchData();
    }, [limit, currentPage.current, startDate, endDate]); 

    const handleChangePage = (event, newPage) => {
        currentPage.current = newPage;
        fetchData();
    };

    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value);
        setLimit(newLimit);
        currentPage.current = 1;
        fetchData();
    };

    const handleDateRangeChange = (ranges) => { 
        setStartDate(prevStartDate => formatDateApi(ranges.selection.startDate));
        setEndDate(prevEndDate => formatDateApi(ranges.selection.endDate)); 
       
    };

    return (
        <UsersDataContext.Provider value={{ usersData, pageCount, total, limit, currentPage, handleChangePage, handleLimitChange, handleDateRangeChange }}>
            {children}
        </UsersDataContext.Provider>
    );
};
