/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PageTitle from '../components/PageTitle';
import RegularDivider from '../components/RegularDivider';
import '../assets/css/Calendrier.css'
import { useDispatch, useSelector } from 'react-redux';
import { getChecks } from '../actions/checks';

const localizer = momentLocalizer(moment)

const Calendrier = () => {

    const checks = useSelector((state) => state.checks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChecks());
    }, []);

    return (
        <ContentWrapper>
            <div className='calendar-wrapper'>
                <div>
                    <PageTitle>Calendrier</PageTitle>
                </div>
                <RegularDivider />
                <Calendar
                    titleAccessor="num"
                    localizer={localizer}
                    events={checks}
                    startAccessor="dueDate"
                    endAccessor="dueDate"
                    style={{ height: 500 }}
                />
            </div>
        </ContentWrapper>
    )
}

export default Calendrier