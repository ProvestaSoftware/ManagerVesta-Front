/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Header from "../Header";

const DailyChart = () => {

    const allChecks = useSelector((state) => state.checks);

    const checks = allChecks.filter(item => item.type === "Chèque");
    const traites = allChecks.filter(item => item.type === "Traite");

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
            data: [],
        };
        const traitesLine = {
            id: "Traites",
            color: "#6ea8cc",
            data: [],
        };

        Object.values(checkDailyData).forEach(({ date, totalChecks }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1);

                checksLine.data = [
                    ...checksLine.data,
                    { x: splitDate, y: `${Number(totalChecks).toFixed(0)}` },
                ];
            }
        });
        Object.values(traiteDailyData).forEach(({ date, totalChecks }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1);

                traitesLine.data = [
                    ...traitesLine.data,
                    { x: splitDate, y: `${Number(totalChecks).toFixed(0)}` },
                ];
            }
        });

        const formattedData = [checksLine, traitesLine];
        return [formattedData];
    }, [allChecks, checkDailyData, traiteDailyData, startDate, endDate]);

    const yTickValues = formattedData[0].data.map(entry => Math.round(entry.y)); // Assuming data[0].data is your y-axis data

    return (
        <div style={{
            height: '360px',
        }}>
            <Header title="DAILY Checks" subtitle="Checks Count By Date" />
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
                                    stroke: "#ff7e86",
                                },
                            },
                            legend: {
                                text: {
                                    fill: "#000000",
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: "#ff7e86",
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: "#ff7e86",
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
                        legend: "Mois",
                        legendOffset: 60,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Nombre de chèques",
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
                <>Loading...</>
            )}
        </div>
    );
};

export default DailyChart;
