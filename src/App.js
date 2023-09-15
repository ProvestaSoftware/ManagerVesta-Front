/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Accueil from './pages/Accueil';
import Print from './pages/Print';
import Calendrier from './pages/Calendrier';
import CheckFournisseur from './pages/CheckFournisseur';
import Fournisseurs from './pages/Fournisseurs';
import CheckClient from './pages/CheckClient';
import Clients from './pages/Clients';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { BsCoin, BsFillLightningChargeFill } from 'react-icons/bs';
import RegularDivider from './components/RegularDivider';
import { FaArrowsAltV } from 'react-icons/fa';
import { ImDroplet } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import Charts from './pages/Charts';

function App() {

    const allChecks = useSelector((state) => state.checks);

    const checks = allChecks?.filter(item => item?.type === "Chèque");
    const traites = allChecks?.filter(item => item?.type === "Traite");
    
    const allChecksSumAmount = allChecks.reduce((sum, item) => sum + item.montant, 0);
    
    const checksSumAmount = checks.reduce((sum, item) => sum + item.montant, 0);
    const traitesSumAmount = traites.reduce((sum, item) => sum + item.montant, 0);
    
    const [overallAverageMontant, setOverallAverageMontant] = useState(null);
    const [checksOverallAverageMontant, setChecksOverallAverageMontant] = useState(null);
    const [traitesOverallAverageMontant, setTraitesOverallAverageMontant] = useState(null);

    const processData = () => {
        let totalMontant = 0;
        let totalCount = 0;

        let checksMontant = 0;
        let checksCount = 0;

        let traitesMontant = 0;
        let traitesCount = 0;

        for (const item of allChecks) {
            totalMontant += item.montant;
            totalCount++;
        }
        
        for (const item of checks) {
            checksMontant += item.montant;
            checksCount++;
        }
        
        for (const item of traites) {
            traitesMontant += item.montant;
            traitesCount++;
        }

        if (totalCount > 0) {
            const calculatedAverage = totalMontant / totalCount;
            setOverallAverageMontant(calculatedAverage);
        }

        if (checksCount > 0) {
            const calculatedAverage = checksMontant / checksCount;
            setChecksOverallAverageMontant(calculatedAverage);
        }

        if (traitesCount > 0) {
            const calculatedAverage = traitesMontant / traitesCount;
            setTraitesOverallAverageMontant(calculatedAverage);
        }
    };


    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getChecks());
        // dispatch(getFournisseurs());
        // processData();
    }, [allChecks, checks, traites]);

    const statsData = [
        {
            id: 1,
            title: 'Impressions Total',
            amount: checks.length + traites.length,
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
            amount: checks.length,
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
            amount: traites.length,
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
            amount: `${allChecksSumAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            amount: `${checksSumAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            title: 'Montant des Traites',
            amount: `${traitesSumAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            title: 'Montant Moy. par Mois',
            amount: `${overallAverageMontant?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            title: 'Montant Moy. des Chèques Par Mois',
            amount: `${checksOverallAverageMontant?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            title: 'Montant Moy. des Traites Par Mois',
            amount: `${traitesOverallAverageMontant?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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

    const userProfile = useState(JSON.parse(localStorage.getItem("profile")));
    const user = userProfile[0]?.data?.user;
    // console.log(user);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={user ? (
                            <Navigate to="/accueil" replace />
                        ) : <Navigate to="/login" replace />
                        } />
                        <Route path="/accueil" element={user ? <Accueil /> : <Navigate to="/login" replace />} />
                        <Route path="/imprimer" element={user ? <Print /> : <Navigate to="/login" replace />} />
                        <Route path="/cheques-fournisseurs" element={user ? <CheckFournisseur /> : <Navigate to="/login" replace />} />
                        <Route path="/calendrier" element={user ? <Calendrier /> : <Navigate to="/login" replace />} />
                        <Route path="/fournisseurs" element={user ? <Fournisseurs /> : <Navigate to="/login" replace />} />
                        <Route path="/cheques-clients" element={user ? <CheckClient /> : <Navigate to="/login" replace />} />
                        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" replace />} />
                        <Route path="/stats" element={user ? <Stats data={statsData} /> : <Navigate to="/login" replace />} />
                        <Route path="/kpis" element={user ? <Charts /> : <Navigate to="/login" replace />} />
                        <Route path="/parametres" element={user ? <Settings /> : <Navigate to="/login" replace />} />
                    </Route>
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
