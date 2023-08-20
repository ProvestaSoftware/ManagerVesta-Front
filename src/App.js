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
import { statsData } from './data/MockData';
import { useState } from 'react';
import Login from './pages/Login';

function App() {

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
            <Route path="/parametres" element={user ? <Settings /> : <Navigate to="/login" replace />} />
          </Route>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
