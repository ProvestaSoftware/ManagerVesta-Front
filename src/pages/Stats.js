import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Stats.css'
import StatCard from '../components/Cards/StatCard'
import { StatistiqueService } from '../_services/statistique.service'


import { BsCoin, BsFillLightningChargeFill } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { ImDroplet } from "react-icons/im";


const Stats = () => {

const [stats,setStats]=useState([]);
const[loader ,setLoader ] = useState (false)

    const getData = () => {
        setLoader(true);
        StatistiqueService.index()
          .then(res => {
            console.log('API response:', res.data);
            setStats(res.data);
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
          });
    }
      useEffect(() => {
        getData();
      }, []);
    const statsData = [
        {
            id: 1,
            title: 'Impressions Total',
            amount: stats ? stats.totalImpressions : 'N/A',
            unity: '',
            icon: <BsFillLightningChargeFill style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: '#599FCA',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#ffffff',
            backgroundColor: '#ee8432',
            divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
        },
        {
            id: 2,
            title: 'Chèques',
            amount: stats ? stats.Chèques : 'N/A',
            unity: '',
            icon: <FaArrowsAltV style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(255, 126, 134, 0.10)',
                color: '#6ea8cc',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
        {
            id: 3,
            title: 'Traites',
            amount: stats ? stats.Traites : 'N/A',
            unity: '',
            icon: <ImDroplet style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(161, 98, 247, 0.10)',
                color: '#A162F7',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
        {
            id: 4,
            title: 'Montant Sortant',
            amount: stats ? stats.MontantSortant : 'N/A',
            unity: 'DT',
            icon: <BsFillLightningChargeFill style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: '#1A569B',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#ffffff',
            backgroundColor: '#2663a9',
            divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
        },
        {
            id: 5,
            title: 'Montant des Chèques',
            amount: stats ? stats.MontantdesChèques : 'N/A',
            unity: 'DT',
            icon: <BsCoin style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(246, 204, 13, 0.10)',
                color: '#F6CC0D',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
        {
            id: 6,
            title: 'Montant des Traits',
            amount: stats ? stats.MontantdesTraites : 'N/A',
            unity: 'DT',
            icon: <BsCoin style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(246, 204, 13, 0.10)',
                color: '#F6CC0D',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
        {
            id: 7,
            title: 'Montant Entrant',
            amount: stats ? stats.MontantEntrant : 'N/A',
            unity: 'DT',
            icon: <BsFillLightningChargeFill style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: '#599FCA',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#ffffff',
            backgroundColor: '#ee8432',
            divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
        },
        {
            id: 8,
            title: 'Montant des Chèques',
            amount: stats ? stats.MontantEntrantdesChèques : 'N/A',
            unity: 'DT',
            icon: <BsCoin style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(246, 204, 13, 0.10)',
                color: '#F6CC0D',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
        {
            id: 9,
            title: 'Montant des Traits ',
            amount: stats ? stats.MontantEntrantdesTraites : 'N/A',
            unity: 'DT',
            icon: <BsCoin style={{
                margin: 'auto',
                display: 'block',
                backgroundColor: 'rgba(246, 204, 13, 0.10)',
                color: '#F6CC0D',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '6px'
            }} />,
            color: '#000000',
            backgroundColor: '#ffffff',
            divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
        },
    ]   
      

    return (
        <ContentWrapper>
            <div className='stat-wrapper'>
                <div>
                    <PageTitle>Statistiques</PageTitle>
                </div>
                <RegularDivider />
                {loader ? (
                    <div className="fixed-loader-container">
                        <div className="fixed-loader"></div>
                    </div>
                ) : (
                    <div className='stats-container'>
                        {statsData.map((item, index) => (
                            <StatCard
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </ContentWrapper>
    )
}

export default Stats