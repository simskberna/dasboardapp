import React, { useEffect, useState, useRef } from 'react';
import { usePageTitle } from '../context/PageTitleContext';
import InfoBox from '../components/InfoBox'; 
import { Grid } from '@mui/material';
import ChartInstance from '../components/ChartInstance';  
import { ChartDataContextProvider, useChartData } from '../context/ChartDataContext';       
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Select from 'react-select';
import { formatDateApi } from '../utils/formatDateApi';
import InternalDatePicker from '../components/InternalDatePicker';
const OverviewPage = () => {
    const data = useChartData();

    const options = [
        { value: '', label: 'all platforms' },
        { value: 'Web', label: 'web' },
        { value: 'App', label: 'app' }
    ];
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date('2023-01-01'), 
        endDate: new Date('2023-04-01'), 
        key: 'selection',
    });  
    
    const [showDateRange, setShowDateRange] = useState(false); 
    const { setTitle } = usePageTitle();   

    useEffect(() => {
        setTitle('Overview');
        return () => {
            setTitle('');
        } 
    }, []);


    const dataKeys = typeof data !== 'undefined' ? Object.keys(data).filter(x => x !== 'timeSeriesData') : []; 


    const handleSelectPlatform = (platformsSelected) => {
        setSelectedPlatforms(platformsSelected);
    };

    const handleSelectDate = (ranges) => { 
        setSelectionRange(prevState => ({
            ...prevState,
            ...ranges.selection
        })); 
    };

    return (
        <ChartDataContextProvider 
            startDate={formatDateApi(selectionRange.startDate)}
            endDate={formatDateApi(selectionRange.endDate)}
            selectedPlatforms={selectedPlatforms.map(platform => platform.value)}
        >  
                <div className='flex gap-10 h-auto justify-end w-full font-body relative'>
                    <div className='flex-col'>
                        <span className=''>Platform</span>
                        <Select
                            onChange={handleSelectPlatform}
                            defaultValue={[]}
                            isMulti
                            value={selectedPlatforms}
                            name="platforms"  
                            options={options} 
                            className="basic-multi-select"
                            classNamePrefix="select"  
                        />
                    </div> 
                    <InternalDatePicker
                        selectionRange={selectionRange}
                        onSelectDate={handleSelectDate}
                    /> 
 
                </div>
                <Grid 
                    gap='10px' 
                    spacing={2}
                    justifyContent='space-between'
                    style={{width:'100%',margin:'0px auto'}} 
                    container  
                >
                    {dataKeys.map((key, index) => (
                        <Grid key={index} minWidth='24%' style={{ padding: '0px' }}> 
                            <InfoBox key={index} dataKey={key} dataValue={data[key]} /> 
                        </Grid>
                    ))}
                </Grid>
                <ChartInstance /> 
        </ChartDataContextProvider>
    );
}

export default OverviewPage;