import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StateBus from './pages/StateBus';
import CollegeBus from './pages/CollegeBus';
import NationalTrip from './pages/NationalTrip';
import Complaints from './pages/Complaints';
import Norms from './pages/Norms';
import Auth from './pages/Auth';
import TrainsFlights from './pages/TrainsFlights';
import BusPass from './pages/BusPass';

import SOS from './pages/SOS';
import BusStatus from './pages/BusStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state" element={<StateBus />} />
        <Route path="/alternatives" element={<NationalTrip />} />
        <Route path="/trains-flights" element={<TrainsFlights />} />
        <Route path="/bus-pass" element={<BusPass />} />
        <Route path="/college" element={<CollegeBus />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/norms" element={<Norms />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/bus-status" element={<BusStatus />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
