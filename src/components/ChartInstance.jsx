import React from 'react';
import { Chart } from "react-google-charts";
import { useChartData } from '../context/ChartDataContext';
import { CircularProgress } from '@mui/material';

export const options = { 
  chart: {
    title: "",
    subtitle: "",
  }, 
  hAxis: {
    format: 'MMM d'
  }, 
  
  legend: {
    position:'top',
    alignment: 'center', 
  },
  
  seriesType: "line",
  series: {
    0: { type: 'line', pointSize: 5 },
    1: { type: 'line', pointSize: 5 },
    2: { type: 'line', pointSize: 5 },
  },  
};

const ChartInstance = () => {
  const realData = useChartData();   
  let chartData = []; 
  if (typeof realData === 'undefined') {
    return <CircularProgress color="secondary" />
  } else { 
    if (Array.isArray(realData)) { 
      chartData = realData.flatMap(data => data.timeSeriesData.map(({ date, userCount, eventSum, eventPerUser }) => [new Date(date), userCount, eventSum, eventPerUser]));
    } else {  
      chartData = realData.timeSeriesData.map(({ date, userCount, eventSum, eventPerUser }) => [new Date(date), userCount, eventSum, eventPerUser]);
    }
  }

  if (!chartData || !Array.isArray(chartData)) {
    return <CircularProgress color="secondary" />
  }

  return (
    <> 
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={[['Date', 'User Count', 'Event Sum', 'Event Per User'], ...chartData]}
        options={options}
      /> 
    </>
  );
}

export default ChartInstance;
