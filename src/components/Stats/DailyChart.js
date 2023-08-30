/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Header from "../Header";

const DailyChart = () => {

    const allChecks = useSelector((state) => state.checks);

    const [dailyData, setDailyData] = useState([]);

    const [startDate, setStartDate] = useState(new Date("2023-07-01"));
    const [endDate, setEndDate] = useState(new Date("2023-09-31"));

    const processData = () => {
        const dailyDataMap = {};

        for (const item of allChecks) {
            const date = item.dueDate.split('T')[0];
            if (dailyDataMap[date]) {
                dailyDataMap[date]++;
            } else {
                dailyDataMap[date] = 1;
            }
        }

        const processedData = Object.keys(dailyDataMap).map(date => ({
            date,
            totalChecks: dailyDataMap[date],
        }));

        setDailyData(processedData);
        if (dailyData.length > 0) {
          const sortedDates = dailyData.map(data => data.date).sort();
          setStartDate(sortedDates[0]);
          setEndDate(sortedDates[sortedDates.length - 1]);
        }
    };

    useEffect(() => {
        processData();
    }, [allChecks]);

    const [formattedData] = useMemo(() => {
        if (!allChecks) return [];

        // console.log("dailyData", dailyData);
        const totalChecksLine = {
            id: "Checks",
            color: "#2663a9",
            data: [],
        };

        Object.values(dailyData).forEach(({ date, totalChecks }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1);

                totalChecksLine.data = [
                    ...totalChecksLine.data,
                    { x: splitDate, y: `${Number(totalChecks).toFixed(0)}` },
                ];
            }
        });

        const formattedData = [totalChecksLine];
        return [formattedData];
    }, [allChecks, dailyData, startDate, endDate]);

    return (
        <div style={{
            margin: '1.5rem 2.5rem',
        }}>
            <Header title="DAILY Checks" subtitle="Checks Count By Date" />
            <div style={{
                height: '400px',
            }}>
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
                        yFormat=" >-.0f"
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
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: "top-right",
                                direction: "column",
                                justify: false,
                                translateX: 50,
                                translateY: 0,
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
        </div>
    );
};

export default DailyChart;
