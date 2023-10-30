import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Header from '../Header'

const TopIcomesFournisseurs = ({ fournisseurs, checks }) => {

    // Transform data
    const transformedData = fournisseurs?.map((fournisseur) => {
        const dataForFournisseur = checks.filter(
            (check) => check.fournisseur_id === fournisseur.id
        );

        const montantByType = dataForFournisseur.reduce(
            (sums, check) => {
                if (check.type === 'Chèque') {
                    sums.cheque += check.montant;
                } else if (check.type === 'Traite') {
                    sums.traite += check.montant;
                }
                return sums;
            },
            { cheque: 0, traite: 0 }
        );

        return {
            fournisseur: fournisseur.nom,
            "Cheques": montantByType.cheque,
            ChequesColor: '#2663a9',
            "Traites": montantByType.traite,
            TraitesColor: '#ee8432',
        };
    });

    // console.log("transformedData", transformedData);

    const sortedData = transformedData.sort((a, b) => {
        const aTotal = a.Cheques + a.Traites;
        const bTotal = b.Cheques + b.Traites;
        return bTotal - aTotal;
    });

    const top5Data = sortedData.slice(0, 10);

    // console.log("top5Data", top5Data);

    // console.log("transformedData", transformedData);

    return (
        <div style={{ height: '460px', width: '100%', marginBottom: '50px' }}>
            <Header title={"TOP 10 Fournisseurs"} subtitle={"Par Montant Ch/Tr"} />
            <ResponsiveBar
                data={top5Data}
                keys={['Cheques', 'Traites']}
                indexBy="fournisseur"
                margin={{ top: 50, right: 130, bottom: 50, left: 90 }}
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
                    tickRotation: 0,
                    legend: 'Fournisseur',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Montant en DT',
                    legendPosition: 'middle',
                    legendOffset: -80
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
                    ]
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
                ariaLabel="Ch/Tr par fournisseur (TOP 5)"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " for fournisseur: " + e.indexValue}
            />
        </div>
    )
}

export default TopIcomesFournisseurs