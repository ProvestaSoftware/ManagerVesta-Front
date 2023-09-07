/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import Header from '../Header';

const TimeRangeChart = ({ checks }) => {

    const [rangeData, setRangeData] = useState([]);

    // if (!fournisseurs || !checks) {
    //     // Data is not available yet, you can display a loading message or spinner
    //     return <p>Loading...</p>;
    // }

    const processRangeData = () => {
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
        processRangeData();
        // console.log("rangeData", rangeData);
    }, [checks]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // console.log("rangeData", rangeData);

    const maxValue = Math.max(...rangeData.map(item => item.value));

    const processData = () => {
        let earliest = null;
        let latest = null;

        for (const item of rangeData) {
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
    }, [rangeData]);

    const legendRanges = [
        { from: 0, to: Math.floor(maxValue / 2), label: `0 - ${Math.floor(maxValue / 2)}`, color: '#ee8432' },
        { from: Math.floor(maxValue / 2) + 1, to: maxValue, label: `${Math.floor(maxValue / 2) + 1} - ${maxValue}`, color: '#6ea8cc' },
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
                    data={rangeData}
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