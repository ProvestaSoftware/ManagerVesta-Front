/* eslint-disable react-hooks/exhaustive-deps */
import { ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
}

function TopMonths() {

    const checks = useSelector((state) => state.checks);


    // const [monthlyData, setMonthlyData] = useState([]);
    const [topMonths, setTopMonths] = useState([]);

    useEffect(() => {
        processData();
    }, [checks]);
    const formatNumberWithSpaces = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      };
    const processData = () => {
        const monthlyDataMap = {};

        for (const item of checks) {
            const date = item.dueDate.split('T')[0];
            const month = date.substr(0, 7);

            if (monthlyDataMap[month]) {
                monthlyDataMap[month].montant += item.montant;
            } else {
                monthlyDataMap[month] = {
                    month: formatDate(month),
                    montant: 1,
                    montantColor: '#6ea8cc',
                };
            }
        }

        const processedMonthlyData = Object.values(monthlyDataMap);

console.log('formatNumberWithSpaces',monthlyDataMap)
        const sortedTopMonths = [...processedMonthlyData]
            .sort((a, b) => b.montant - a.montant)
            .slice(0, 12);
        setTopMonths(sortedTopMonths);
    };

    return (
        <div style={{ height: '460px', width: '100%', marginBottom: '50px' }}>
            <Header title={"TOP  Mois"} subtitle={"Par Montant de Ch/Tr"} />
            <ResponsiveBar
                data={topMonths}
                keys={['montant']}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 100, left: 90 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id, data }) => data[`${id}Color`]}
                // defs={[
                //     {
                //         id: 'dots',
                //         type: 'patternDots',
                //         background: 'inherit',
                //         color: '#38bcb2',
                //         size: 4,
                //         padding: 1,
                //         stagger: true
                //     },
                //     {
                //         id: 'lines',
                //         type: 'patternLines',
                //         background: 'inherit',
                //         color: '#eed312',
                //         rotation: -45,
                //         lineWidth: 6,
                //         spacing: 10
                //     }
                // ]}
                // fill={[
                //     {
                //         match: {
                //             id: 'cheque'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'traite'
                //         },
                //         id: 'lines'
                //     }
                // ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: '',
                    legendPosition: 'center',
                    legendOffset: 40,
                    
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'montant en DT',
                    legendPosition: 'middle',
                    legendOffset: -80,
                    format: value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') 
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ],

                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nombre des Ch/Tr par Mois (TOP 5)"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " DT for month: " + e.indexValue}
                label={e => e.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}

            />
        </div>
    );
}

export default TopMonths;
