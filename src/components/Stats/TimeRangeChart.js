/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import Header from '../Header';

const TimeRangeChart = ({ data }) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // console.log("data", data);

    const maxValue = Math.max(...data.map(item => item.value));

    const processData = () => {
        let earliest = null;
        let latest = null;

        for (const item of data) {
            const date = item.day.split('T')[0];

            if (!earliest || date < earliest) {
                earliest = date;
            }

            if (!latest || date > latest) {
                latest = date;
            }
        }

        setStartDate(new Date(earliest));
        setEndDate(new Date(latest));
    };

    useEffect(() => {
        processData();
    }, [data]);

    const legendRanges = [
        { from: 0, to: Math.floor(maxValue / 2), label: `0 - ${Math.floor(maxValue / 2)}`, color: '#6ea8cc' },
        { from: Math.floor(maxValue / 2) + 1, to: maxValue, label: `${Math.floor(maxValue / 2) + 1} - ${maxValue}`, color: '#ff7e86' },
        // Add more ranges with colors as needed
    ];

    const generateLegendItems = () => {
        return legendRanges.map(range => (
            <div key={range.label} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                <div style={{ width: 16, height: 16, backgroundColor: range.color, marginRight: 5 }} />
                <span>{range.label}</span>
            </div>
        ));
    };

    return (
        <div style={{
            display: 'block',
            height: 'auto'
        }}>
            <div style={{
                display: 'block',
                height: '200px'
            }}>
                <Header title="Calendrier des Chèques et Traites" subtitle="Ch/Tr par Date et Intensité" />
                <ResponsiveCalendar
                    data={data}
                    from={startDate}
                    to={endDate}
                    emptyColor="#eeeeee"
                    colors={legendRanges.map(range => range.color)} // Use an array of colors
                    margin={{
                        "top": 10,
                        "right": 10,
                        "bottom": 50,
                        "left": 10
                    }}
                    yearSpacing={40}
                    monthBorderColor="#ffffff"
                    monthLegendOffset={10}
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    legends={[
                        {
                            "anchor": "bottom-right",
                            "direction": "row",
                            "translateY": 36,
                            "itemCount": 4,
                            "itemWidth": 34,
                            "itemHeight": 36,
                            "itemDirection": "top-to-bottom"
                        }
                    ]}
                />
            </div>
            <div style={{
                display: 'block',
                marginLeft: '10px',
            }}>
                {generateLegendItems()}
            </div>
        </div>
    )
}

export default TimeRangeChart