import { Navigate, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/accueil" />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/imprimer" element={<Print />} />
          <Route path="/cheques-fournisseurs" element={<CheckFournisseur />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/fournisseurs" element={<Fournisseurs />} />
          <Route path="/cheques-clients" element={<CheckClient />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/stats" element={<Stats data={statsData} />} />
          <Route path="/parametres" element={<Settings />} />
          {/* <Route path="/performance" element={user ? <Performance /> : <Navigate to="/login" replace />} /> */}
        </Route>
        {/* <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
