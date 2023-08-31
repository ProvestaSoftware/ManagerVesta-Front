/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownChart from '../components/Stats/BreakdownChart'
import DailyChart from '../components/Stats/DailyChart'
import { useSelector } from 'react-redux'
import TopFournisseursTable from '../components/Stats/TopFournisseursTable'
// import TopFournisseursChart from '../components/Stats/TopFournisseursChart'
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
        console.log("rangeData", rangeData);
    }, [checks]);

    // const data = [
    //     {
    //       "value": 305,
    //       "day": "2018-07-25"
    //     },
    //     {
    //       "value": 321,
    //       "day": "2018-07-16"
    //     },
    //     {
    //       "value": 37,
    //       "day": "2018-04-30"
    //     },
    //     {
    //       "value": 225,
    //       "day": "2018-05-04"
    //     },
    //     {
    //       "value": 207,
    //       "day": "2018-06-09"
    //     },
    //     {
    //       "value": 75,
    //       "day": "2018-05-06"
    //     },
    //     {
    //       "value": 48,
    //       "day": "2018-07-28"
    //     },
    //     {
    //       "value": 259,
    //       "day": "2018-08-06"
    //     },
    //     {
    //       "value": 96,
    //       "day": "2018-06-12"
    //     },
    //     {
    //       "value": 379,
    //       "day": "2018-06-20"
    //     },
    //     {
    //       "value": 78,
    //       "day": "2018-07-21"
    //     },
    //     {
    //       "value": 301,
    //       "day": "2018-05-07"
    //     },
    //     {
    //       "value": 74,
    //       "day": "2018-08-10"
    //     },
    //     {
    //       "value": 98,
    //       "day": "2018-07-02"
    //     },
    //     {
    //       "value": 250,
    //       "day": "2018-08-09"
    //     },
    //     {
    //       "value": 1,
    //       "day": "2018-07-06"
    //     },
    //     {
    //       "value": 217,
    //       "day": "2018-06-18"
    //     },
    //     {
    //       "value": 352,
    //       "day": "2018-08-03"
    //     },
    //     {
    //       "value": 318,
    //       "day": "2018-06-08"
    //     },
    //     {
    //       "value": 273,
    //       "day": "2018-05-14"
    //     },
    //     {
    //       "value": 357,
    //       "day": "2018-06-01"
    //     },
    //     {
    //       "value": 129,
    //       "day": "2018-05-20"
    //     },
    //     {
    //       "value": 209,
    //       "day": "2018-07-13"
    //     },
    //     {
    //       "value": 66,
    //       "day": "2018-04-05"
    //     },
    //     {
    //       "value": 123,
    //       "day": "2018-06-14"
    //     },
    //     {
    //       "value": 346,
    //       "day": "2018-06-23"
    //     },
    //     {
    //       "value": 99,
    //       "day": "2018-07-12"
    //     },
    //     {
    //       "value": 293,
    //       "day": "2018-07-14"
    //     },
    //     {
    //       "value": 35,
    //       "day": "2018-05-26"
    //     },
    //     {
    //       "value": 116,
    //       "day": "2018-07-30"
    //     },
    //     {
    //       "value": 20,
    //       "day": "2018-04-19"
    //     },
    //     {
    //       "value": 13,
    //       "day": "2018-07-04"
    //     },
    //     {
    //       "value": 225,
    //       "day": "2018-04-22"
    //     },
    //     {
    //       "value": 324,
    //       "day": "2018-07-26"
    //     },
    //     {
    //       "value": 358,
    //       "day": "2018-08-04"
    //     },
    //     {
    //       "value": 188,
    //       "day": "2018-07-31"
    //     },
    //     {
    //       "value": 342,
    //       "day": "2018-04-15"
    //     },
    //     {
    //       "value": 20,
    //       "day": "2018-05-28"
    //     },
    //     {
    //       "value": 130,
    //       "day": "2018-06-16"
    //     },
    //     {
    //       "value": 28,
    //       "day": "2018-05-22"
    //     },
    //     {
    //       "value": 137,
    //       "day": "2018-05-03"
    //     },
    //     {
    //       "value": 332,
    //       "day": "2018-07-19"
    //     },
    //     {
    //       "value": 130,
    //       "day": "2018-04-27"
    //     },
    //     {
    //       "value": 301,
    //       "day": "2018-05-05"
    //     },
    //     {
    //       "value": 122,
    //       "day": "2018-04-10"
    //     },
    //     {
    //       "value": 187,
    //       "day": "2018-04-21"
    //     },
    //     {
    //       "value": 287,
    //       "day": "2018-07-20"
    //     },
    //     {
    //       "value": 201,
    //       "day": "2018-08-11"
    //     },
    //     {
    //       "value": 370,
    //       "day": "2018-06-27"
    //     },
    //     {
    //       "value": 95,
    //       "day": "2018-05-11"
    //     },
    //     {
    //       "value": 209,
    //       "day": "2018-04-03"
    //     },
    //     {
    //       "value": 289,
    //       "day": "2018-04-07"
    //     },
    //     {
    //       "value": 69,
    //       "day": "2018-07-29"
    //     },
    //     {
    //       "value": 347,
    //       "day": "2018-05-16"
    //     },
    //     {
    //       "value": 113,
    //       "day": "2018-05-31"
    //     },
    //     {
    //       "value": 157,
    //       "day": "2018-07-22"
    //     },
    //     {
    //       "value": 199,
    //       "day": "2018-08-01"
    //     },
    //     {
    //       "value": 333,
    //       "day": "2018-07-01"
    //     },
    //     {
    //       "value": 361,
    //       "day": "2018-05-15"
    //     },
    //     {
    //       "value": 111,
    //       "day": "2018-05-17"
    //     },
    //     {
    //       "value": 27,
    //       "day": "2018-04-06"
    //     },
    //     {
    //       "value": 399,
    //       "day": "2018-04-14"
    //     },
    //     {
    //       "value": 340,
    //       "day": "2018-05-19"
    //     },
    //     {
    //       "value": 133,
    //       "day": "2018-07-18"
    //     },
    //     {
    //       "value": 76,
    //       "day": "2018-05-30"
    //     },
    //     {
    //       "value": 221,
    //       "day": "2018-04-23"
    //     },
    //     {
    //       "value": 272,
    //       "day": "2018-04-16"
    //     },
    //     {
    //       "value": 391,
    //       "day": "2018-06-11"
    //     },
    //     {
    //       "value": 88,
    //       "day": "2018-06-26"
    //     },
    //     {
    //       "value": 102,
    //       "day": "2018-04-13"
    //     },
    //     {
    //       "value": 351,
    //       "day": "2018-07-24"
    //     },
    //     {
    //       "value": 205,
    //       "day": "2018-04-20"
    //     },
    //     {
    //       "value": 282,
    //       "day": "2018-04-24"
    //     },
    //     {
    //       "value": 159,
    //       "day": "2018-07-09"
    //     },
    //     {
    //       "value": 168,
    //       "day": "2018-07-11"
    //     },
    //     {
    //       "value": 67,
    //       "day": "2018-04-09"
    //     },
    //     {
    //       "value": 40,
    //       "day": "2018-06-19"
    //     },
    //     {
    //       "value": 88,
    //       "day": "2018-08-08"
    //     },
    //     {
    //       "value": 233,
    //       "day": "2018-08-07"
    //     },
    //     {
    //       "value": 380,
    //       "day": "2018-06-04"
    //     },
    //     {
    //       "value": 195,
    //       "day": "2018-04-28"
    //     },
    //     {
    //       "value": 164,
    //       "day": "2018-07-05"
    //     },
    //     {
    //       "value": 28,
    //       "day": "2018-06-02"
    //     },
    //     {
    //       "value": 188,
    //       "day": "2018-04-17"
    //     },
    //     {
    //       "value": 196,
    //       "day": "2018-06-10"
    //     },
    //     {
    //       "value": 302,
    //       "day": "2018-06-03"
    //     },
    //     {
    //       "value": 133,
    //       "day": "2018-05-21"
    //     },
    //     {
    //       "value": 158,
    //       "day": "2018-07-08"
    //     },
    //     {
    //       "value": 133,
    //       "day": "2018-07-17"
    //     },
    //     {
    //       "value": 338,
    //       "day": "2018-04-04"
    //     },
    //     {
    //       "value": 335,
    //       "day": "2018-06-06"
    //     },
    //     {
    //       "value": 298,
    //       "day": "2018-04-25"
    //     },
    //     {
    //       "value": 387,
    //       "day": "2018-06-30"
    //     },
    //     {
    //       "value": 196,
    //       "day": "2018-07-27"
    //     },
    //     {
    //       "value": 181,
    //       "day": "2018-06-15"
    //     },
    //     {
    //       "value": 28,
    //       "day": "2018-06-28"
    //     },
    //     {
    //       "value": 367,
    //       "day": "2018-04-02"
    //     },
    //     {
    //       "value": 349,
    //       "day": "2018-06-07"
    //     },
    //     {
    //       "value": 272,
    //       "day": "2018-04-18"
    //     },
    //     {
    //       "value": 397,
    //       "day": "2018-04-08"
    //     },
    //     {
    //       "value": 7,
    //       "day": "2018-05-29"
    //     },
    //     {
    //       "value": 371,
    //       "day": "2018-05-27"
    //     },
    //     {
    //       "value": 298,
    //       "day": "2018-05-13"
    //     },
    //     {
    //       "value": 19,
    //       "day": "2018-07-15"
    //     },
    //     {
    //       "value": 50,
    //       "day": "2018-06-21"
    //     },
    //     {
    //       "value": 83,
    //       "day": "2018-06-24"
    //     },
    //     {
    //       "value": 331,
    //       "day": "2018-06-25"
    //     },
    //     {
    //       "value": 245,
    //       "day": "2018-06-13"
    //     },
    //     {
    //       "value": 272,
    //       "day": "2018-06-29"
    //     },
    //     {
    //       "value": 222,
    //       "day": "2018-05-09"
    //     },
    //     {
    //       "value": 84,
    //       "day": "2018-05-08"
    //     },
    //     {
    //       "value": 233,
    //       "day": "2018-04-11"
    //     },
    //     {
    //       "value": 261,
    //       "day": "2018-05-25"
    //     },
    //     {
    //       "value": 143,
    //       "day": "2018-05-18"
    //     },
    //     {
    //       "value": 99,
    //       "day": "2018-05-23"
    //     },
    //     {
    //       "value": 82,
    //       "day": "2018-05-12"
    //     },
    //     {
    //       "value": 2,
    //       "day": "2018-06-05"
    //     },
    //     {
    //       "value": 261,
    //       "day": "2018-04-29"
    //     },
    //     {
    //       "value": 323,
    //       "day": "2018-07-07"
    //     }
    //   ]

    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>KPIs</PageTitle>
                </div>
                <RegularDivider />
                <div className='kpis-container'>
                    <BreakdownChart isDashboard={true} />
                    <DailyChart />
                    {
                        // fournisseurs && fournisseurs.length > 0 && checks && checks.length > 0 &&
                            // <TopFournisseursChart fournisseurs={fournisseurs} checks={checks} />
                    }
                    {/* <TimeRangeChart data={data} /> */}
                    <TopFournisseursTable fournisseurs={fournisseurs} checks={checks} />
                </div>
            </div>
        </ContentWrapper>
    );
}


export default Charts