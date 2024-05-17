import React from 'react'; 
import { Box, ThemeProvider } from '@mui/material';
import { formatText } from '../utils/formatText';
const InfoBox = ({dataValue,dataKey}) => {  
 
    const formattedKey = formatText(dataKey);
    
    return (
        <div className='w-full h-auto'>
             <ThemeProvider
                theme={{ 
                palette: {
                    primary: {
                    main: '#007FFF',
                    dark: '#0066CC',
                    },
                },
                }}
            >
                <Box
                sx={{  
                    height:'auto', 
                    width: '100%', 
                    borderRadius: 1, 
                    boxSizing:'border-box',
                    bgcolor: '#fff',
                    borderRadius:'8px',
                    border:'1px solid #DFE0EB',
                    '&:hover': {
                        cursor:'pointer',
                        border: '1px solid #3751ff',
                    },
                }}
                 
                >
                <div className='group flex flex-col items-center justify-center p-2 overflow-hidden font-body w-full h-[134px]'>
                    <span className='font-[700] text-[19px] text-[#9FA2B4] group-hover:text-[#3751ff]'>{formattedKey}</span>
                    <span className='font-[700] text-[40px] text-black group-hover:text-[#3751ff]'>{dataValue}</span>
                </div>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default InfoBox;
