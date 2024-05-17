import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Pagination } from '@mui/material';
import { formatDate } from '../utils/formatDate';
import { formatText } from '../utils/formatText';
import Avatar from '@mui/material/Avatar';
import avatar from '../assets/avatar.png';
import { useUsersData } from '../context/UsersDataContext';

const UsersTable = () => {
    const {
        usersData,
        limit,
        pageCount,
        total,
        currentPage,
        handleChangePage,
        handleLimitChange,
    } = useUsersData();
      
    if (!usersData || usersData.length === 0) {
        return <CircularProgress color="secondary" />
    }

    const displayKeys = ['userDetails', 'customerName', 'registerDate', 'segment'];
    const formattedKeys = displayKeys.map(formatText);

    return (
        <div className='w-full h-full'>
            <Paper sx={{ width: '100%', height: 'auto', borderRadius: '10px', border: '1px solid #e3e3e3', boxShadow: 'unset' }}>
                <div className='w-full p-[15px] font-body font-bold text-[19px]'>All Users</div>
                <TableContainer sx={{ height: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {formattedKeys.map((key, index) => (
                                    <TableCell
                                        style={{ fontSize: '14px', color: '#9FA2B4', fontWeight: '700', fontFamily: 'Mulish', borderBottom: '3px solid #f3f3f3' }}
                                        key={index}
                                        align={`${key === 'User Details' ? 'left' : 'center'}`}>
                                        {key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((user, index) => (
                                <TableRow  key={index} style= {{ cursor:'pointer' }}>
                                    {displayKeys.map((key, index) => (
                                        <TableCell
                                            style={{ height: '92px', fontSize: '14px', color: '#252733', fontWeight: '600', fontFamily: 'Mulish', borderColor: '#f3f3f3' }}
                                            key={index}
                                            align={`${key === 'userDetails' ? 'left' : 'center'}`}>
                                            <div className={`${key && key === 'segment' && user[key] ? 'w-[50%] h-[27px] m-auto bg-[#29CC97] rounded-[100px] text-white ' : ''} flex ${key !== 'userDetails' ? 'justify-center' : 'justify-start gap-4'} items-center`}>
                                                {key === 'userDetails' && <Avatar alt={user[key]} src={avatar} />}
                                                {key === 'registerDate' ? formatDate(user[key]) : user[key]}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <div className='w-full flex items-center justify-center font-body relative p-2 mt-2'>
                <div className='text-[15px] text-[#5D6980] font-[400] flex h-full items-center justify-between flex-[1] gap-2 absolute left-0 mr-10'>
                    Showing {`${(currentPage.current * limit) - limit === 0 ? 1 : (currentPage.current * limit) - limit}-${currentPage.current * limit}`} of {total} items</div>
                <Pagination
                    style={{ flex: '4', display: 'flex', width: '100%', justifyContent: 'center' }}
                    count={pageCount}
                    page={currentPage.current}
                    onChange={handleChangePage} 
                />
                <div className='flex h-full items-center justify-between flex-[1] gap-2 absolute right-0 mr-10'>
                    <input
                        value={limit}
                        className="peer h-[80%] w-[60px] border-red-50l rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        placeholder="Items per page"
                        onChange={handleLimitChange}
                        type='number'
                    />
                    <label className='font-[400] text-[15px]'>items per page</label>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
