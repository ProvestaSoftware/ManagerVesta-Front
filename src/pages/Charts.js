/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownChart from '../components/Stats/BreakdownChart'
import DailyChart from '../components/Stats/DailyChart'
import { useSelector } from 'react-redux'
import TopFournisseursTable from '../components/Stats/TopFournisseursTable'
import TimeRangeChart from '../components/Stats/TimeRangeChart'
// import TimeRangeChart from '../components/Stats/TimeRangeChart'

const Charts = () => {
    
    const fournisseurs = useSelector((state) => state.fournisseurs);
    const checks = useSelector((state) => state.checks);

    const [rangeData, setRangeData] = useState([]);

    // if (!fournisseurs || !checks) {
    //     // Data is not available yet, you can display a loading message or spinner
    //     return <p>Loading...</p>;
    // }

    const processData = () => {
        const rangeDataMap = {};

        for (const item of checks) {
            const date = item.dueDate.split('T')[0];

            if (rangeDataMap[date]) {
                rangeDataMap[date]++;
            } else {
                rangeDataMap[date] = 1;
            }
        }

        const processedData = Object.keys(rangeDataMap).map(date => ({
            value: rangeDataMap[date],
            day: date,
        }));

        setRangeData(processedData);
    };

    useEffect(() => {
        processData();
        console.log("rangeData", rangeData);
    }, [checks]);

    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>KPIs</PageTitle>
                </div>
                <RegularDivider />
                <div className='kpis-container'>
                    <BreakdownChart isDashboard={true} />
                    <DailyChart />
                    <TopFournisseursTable fournisseurs={fournisseurs} checks={checks} />
                    <TimeRangeChart data={rangeData} />
                </div>
            </div>
        </ContentWrapper>
    );
}


export default Charts