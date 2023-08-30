import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownChart from '../components/Stats/BreakdownChart'
import DailyChart from '../components/Stats/DailyChart'

const Charts = () => {
    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>KPIs</PageTitle>
                </div>
                <RegularDivider />
                <div className='stats-container'>
                    <BreakdownChart isDashboard={true} />
                    <DailyChart />
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Charts