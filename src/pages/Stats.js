import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import StatCard from '../components/Cards/StatCard'

const Stats = ({ data }) => {
    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>Statistiques</PageTitle>
                </div>
                <RegularDivider />
                <div className='stats-container'>
                    {data.map((item, index) => (
                        <StatCard
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Stats