/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Header from "../Header";
import moment from "moment"

const DailyChart = () => {

    const allChecks = useSelector((state) => state.checks);

    const checks = allChecks?.filter(item => item?.type === "Chèque");
    const traites = allChecks?.filter(item => item?.type === "Traite");

    const [checkDailyData, setCheckDailyData] = useState([]);
    const [traiteDailyData, setTraiteDailyData] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const processData = () => {
        const checkDailyDataMap = {};
        const traiteDailyDataMap = {};
        let earliest = null;
        let latest = null;

        for (const item of allChecks) {
            const date = item.dueDate.split('T')[0];

            if (!earliest || date < earliest) {
                earliest = date;
            }

            if (!latest || date > latest) {
                latest = date;
            }
        }

        for (const item of checks) {
            const date = item.dueDate.split('T')[0];

            if (checkDailyDataMap[date]) {
                checkDailyDataMap[date]++;
            } else {
                checkDailyDataMap[date] = 1;
            }
        }

        for (const item of traites) {
            const date = item.dueDate.split('T')[0];

            if (traiteDailyDataMap[date]) {
                traiteDailyDataMap[date]++;
            } else {
                traiteDailyDataMap[date] = 1;
            }
        }

        setStartDate(new Date(earliest));
        setEndDate(new Date(latest));

        const checkProcessedData = Object.keys(checkDailyDataMap).map(date => ({
            date,
            totalChecks: checkDailyDataMap[date],
        }));

        const traiteProcessedData = Object.keys(traiteDailyDataMap).map(date => ({
            date,
            totalChecks: traiteDailyDataMap[date],
        }));

        setCheckDailyData(checkProcessedData);
        setTraiteDailyData(traiteProcessedData);
    };

    useEffect(() => {
        processData();
    }, [allChecks]);

    const [formattedData] = useMemo(() => {
        if (!allChecks) return [];

        // console.log("dailyData", dailyData);
        const checksLine = {
            id: "Checks",
            color: "#2663a9",
            data: [
                {x: '0', y: '0'},
            ],
        };
        const traitesLine = {
            id: "Traites",
            color: "#ee8432",
            data: [
                {x: '0', y: '0'},
            ],
        };

        Object.values(checkDailyData).forEach(({ date, totalChecks }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date//.substring(date.indexOf("-") + 1);

                checksLine.data = [
                    ...checksLine.data,
                    { x: splitDate, y: `${Number(totalChecks).toFixed(0)}` },
                ];
            }
        });
        Object.values(traiteDailyData).forEach(({ date, totalChecks }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date//.substring(date.indexOf("-") + 1);

                traitesLine.data = [
                    ...traitesLine.data,
                    { x: splitDate, y: `${Number(totalChecks).toFixed(0)}` },
                ];
            }
        });

        checksLine.data = checksLine.data.sort((a, b) => { return a.x.localeCompare(b.x) })/*.map(item => {
            return {
                ...item,
                x: item.x != '0' ? moment(item.x).format('DD MMM') : '0',
            }
        })*/
        traitesLine.data = traitesLine.data.sort((a, b) => { return a.x.localeCompare(b.x) })/*.map(item => {
            return {
                ...item,
                x: item.x != '0' ? moment(item.x).format('DD MMM') : '0',
            }
        })*/

        const formattedData = [
            checksLine, 
            traitesLine
        ];

        let allDates = [];
        formattedData.forEach(item => {
            allDates = allDates.concat(item.data.map(d => d.x));
        });
        allDates = [...new Set(allDates)].sort();

        formattedData.forEach(item => {
            allDates.forEach(date => {
                if (!item.data.some(d => d.x === date)) {
                    item.data.push({ x: date, y: "0" });
                }
            });
            item.data.sort((a, b) => a.x.localeCompare(b.x));
            item.data = item.data.map(item => {
                return {
                    ...item,
                    x: item.x != '0' ? moment(item.x).format('DD MMM YYYY') : '0',
                }
            })
        });

        console.log('formattedData', formattedData)
        return [formattedData];
    }, [allChecks, checkDailyData, traiteDailyData, startDate, endDate]);

    const yTickValues = formattedData[0].data.map(entry => Math.round(entry.y)); // Assuming data[0].data is your y-axis data

    return (
        <div style={{
            height: '360px',
        }}>
            <Header title="DAILY Chèques" subtitle="Nombre de Chèques/Traites par Date" />
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            </div>

            {allChecks ? (
                <ResponsiveLine
                    data={formattedData}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: "#6ea8cc",
                                },
                            },
                            legend: {
                                text: {
                                    fill: "#000000",
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: "#6ea8cc",
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: "#6ea8cc",
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: "#2663a9",
                            },
                        },
                        tooltip: {
                            container: {
                                color: "#000000",
                            },
                        },
                    }}
                    colors={{ datum: "color" }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat={value => Math.round(value)} // This formats y-axis values as integers
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend: "",
                        legendOffset: 60,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Nombre de Chèques/Traites",
                        legendOffset: -50,
                        legendPosition: "middle",
                        tickValues: yTickValues,
                    }}
                    enableGridX={false}
                    enableGridY={true}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    lineWidth={2}
                    legends={[
                        {
                            anchor: "top-left",
                            direction: "column",
                            justify: false,
                            translateX: 50,
                            translateY: -50,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            ) : (
                <>Chargement...</>
            )}
        </div>
    );
};

export default DailyChart;
