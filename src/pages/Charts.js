/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownCheckTypeChart from '../components/Stats/BreakdownCheckTypeChart'
import DailyChart from '../components/Stats/DailyChart'
import { useSelector } from 'react-redux'
import TopFournisseursTable from '../components/Stats/TopFournisseursTable'
import TimeRangeChart from '../components/Stats/TimeRangeChart'
import TopIcomesFournisseurs from '../components/Stats/TopIcomesFournisseurs'
import TopMonths from '../components/Stats/TopMonths'
import BreakdownCheckStatusChart from '../components/Stats/BreakdownCheckStatusChart'
// import TimeRangeChart from '../components/Stats/TimeRangeChart'

const Charts = () => {

    const fournisseurs = useSelector((state) => state.fournisseurs);
    const checks = useSelector((state) => state.checks);

    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>KPIs</PageTitle>
                </div>
                <RegularDivider />
                <div className='kpis-container'>
                    <BreakdownCheckTypeChart isDashboard={true} />
                    <DailyChart />
                    <TopFournisseursTable fournisseurs={fournisseurs} checks={checks} />
                    <TimeRangeChart checks={checks} />
                    <TopIcomesFournisseurs checks={checks} fournisseurs={fournisseurs} />
                    <TopMonths />
                    <BreakdownCheckStatusChart isDashboard={true} />
                </div>
            </div>
        </ContentWrapper>
    );
}


export default Charts