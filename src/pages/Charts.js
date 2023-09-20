/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import BreakdownCheckTypeChart from '../components/Stats/BreakdownCheckTypeChart'
import DailyChart from '../components/Stats/DailyChart'
import { useDispatch, useSelector } from 'react-redux'
import TopFournisseursTable from '../components/Stats/TopFournisseursTable'
import TopIcomesFournisseurs from '../components/Stats/TopIcomesFournisseurs'
import TopMonths from '../components/Stats/TopMonths'
import BreakdownCheckStatusChart from '../components/Stats/BreakdownCheckStatusChart'
import { getChecks} from '../actions/checks';
import { getFournisseurs } from '../actions/fournisseurs';
import { useEffect } from 'react'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const Charts = () => {
    
    const fournisseurs = useSelector((state) => state.fournisseurs);
    const checks = useSelector((state) => state.checks);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoader(true);
          await dispatch(getChecks());
          await dispatch(getFournisseurs());
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoader(false);
        }
      };
      fetchData();
    }, [dispatch]);
  
    console.log('checks', checks);
    console.log('fournisseurs', fournisseurs);
    console.log('loooder', loader);
  
    return (
      <ContentWrapper>
        <div className='stat-wrapper'>
          <div>
            <PageTitle>KPIs</PageTitle>
          </div>
          <RegularDivider />
          {loader ? (
            <div>
              {loader} 
              <Skeleton count={5} />
            </div>
          ) : (
            <div className='kpis-container'>
    
                  <BreakdownCheckTypeChart isDashboard={true} />
                  <DailyChart />
                  {fournisseurs && fournisseurs.length > 0 && checks && checks.length > 0 && (
                    <>
                      <TopFournisseursTable fournisseurs={fournisseurs} checks={checks} />
                      {/* <TimeRangeChart checks={checks} /> */}
                      <TopIcomesFournisseurs checks={checks} fournisseurs={fournisseurs} /> 
                    </>
                  )}
                  <TopMonths />
                  <BreakdownCheckStatusChart isDashboard={true} />
            </div>
          )}
        </div>
      </ContentWrapper>
    );
  }
  
  export default Charts;