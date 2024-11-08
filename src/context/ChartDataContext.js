import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import data from '../dummy-data.json'
export const ChartDataContext = createContext();

export const useChartData = () => useContext(ChartDataContext);

export const ChartDataContextProvider = ({ children, startDate, endDate, selectedPlatforms = [] }) => {
    const fetchData = async (startDate, endDate, selectedPlatforms) => {
        try {
            let aggregatedData = []; 
            
            if (selectedPlatforms.length > 0) {
                const platformData = await Promise.all(
                    selectedPlatforms.map(platform => {
                        const platformQuery = `&platform=${platform}`;
                        return fetch(`${process.env.REACT_APP_DASHBOARD}startDate=${startDate}&endDate=${endDate}${platformQuery}`)
                            .then(response => response.json() || data);
                    })
                );
 
                aggregatedData = platformData.reduce((result, data) => {
                    return result.concat(data);
                }, []);
            } else {
                const response = await fetch(`${process.env.REACT_APP_DASHBOARD}startDate=${startDate}&endDate=${endDate}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                aggregatedData = await response.json();
            }

            return aggregatedData;
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    const dataQuery = useQuery({
        queryFn: () => fetchData(startDate, endDate, selectedPlatforms),
        queryKey: ['chartData', startDate, endDate, selectedPlatforms],
    });

    return (
        <ChartDataContext.Provider value={dataQuery.data}>
            {children}
        </ChartDataContext.Provider>
    )
}
