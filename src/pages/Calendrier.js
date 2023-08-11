import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventsData } from '../data/MockData'
import PageTitle from '../components/PageTitle';
import RegularDivider from '../components/RegularDivider';
import '../assets/css/Calendrier.css'

const localizer = momentLocalizer(moment)

const Calendrier = () => {
    return (
        <ContentWrapper>
            <div className='calendar-wrapper'>
                <div>
                    <PageTitle>Calendrier</PageTitle>
                </div>
                <RegularDivider />
                <Calendar
                    localizer={localizer}
                    events={eventsData}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </ContentWrapper>
    )
}

export default Calendrier