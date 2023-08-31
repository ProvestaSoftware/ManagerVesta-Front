/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownCheckTypeChart from '../components/Stats/BreakdownCheckTypeChart'
import DailyChart from '../components/Stats/DailyChart'
import { useSelector } from 'react-redux'
import TopFournisseursTable from '../components/Stats/TopFournisseursTable'
import TimeRangeChart from '../components/Stats/TimeRangeChart'
import TopIcomesFournisseurs from '../components/Stats/TopIcomesFournisseurs'
import TopMonths from '../components/Stats/TopMonths'
// import TimeRangeChart from '../components/Stats/TimeRangeChart'

const Charts = () => {

    const fournisseurs = useSelector((state) => state.fournisseurs);
    const checks = useSelector((state) => state.checks);

    const [rangeData, setRangeData] = useState([]);

    // if (!fournisseurs || !checks) {
    //     // Data is not available yet, you can display a loading message or spinner
    //     return <p>Loading...</p>;
    // }

    const processData = () => {
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
        processData();
        // console.log("rangeData", rangeData);
    }, [checks]);

    // Transform data
    const transformedData = fournisseurs.map((fournisseur) => {
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
            TraitesColor: '#6ea8cc',
        };
    });

    // console.log("transformedData", transformedData);

    const sortedData = transformedData.sort((a, b) => {
        const aTotal = a.Cheques + a.Traites;
        const bTotal = b.Cheques + b.Traites;
        return bTotal - aTotal;
    });

    const top5Data = sortedData.slice(0, 5);

    // console.log("top5Data", top5Data);

    // console.log("transformedData", transformedData);

    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>KPIs</PageTitle>
                </div>
                <RegularDivider />
                <div className='kpis-container'>
                    <BreakdownCheckTypeChart isDashboard={true} />
                    <DailyChart />
                    <TopFournisseursTable fournisseurs={fournisseurs} checks={checks} />
                    <TimeRangeChart data={rangeData} />
                    <TopIcomesFournisseurs data={top5Data} />
                    <TopMonths />
                </div>
            </div>
        </ContentWrapper>
    );
}


export default Charts