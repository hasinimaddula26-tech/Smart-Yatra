import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/state" element={
          <ProtectedRoute>
            <StateBus />
          </ProtectedRoute>
        } />
        <Route path="/alternatives" element={
          <ProtectedRoute>
            <NationalTrip />
          </ProtectedRoute>
        } />
        <Route path="/trains-flights" element={
          <ProtectedRoute>
            <TrainsFlights />
          </ProtectedRoute>
        } />
        <Route path="/bus-pass" element={
          <ProtectedRoute>
            <BusPass />
          </ProtectedRoute>
        } />
        <Route path="/college" element={
          <ProtectedRoute>
            <CollegeBus />
          </ProtectedRoute>
        } />
        <Route path="/complaints" element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        } />
        <Route path="/norms" element={
          <ProtectedRoute>
            <Norms />
          </ProtectedRoute>
        } />
        <Route path="/sos" element={
          <ProtectedRoute>
            <SOS />
          </ProtectedRoute>
        } />
        <Route path="/bus-status" element={
          <ProtectedRoute>
            <BusStatus />
          </ProtectedRoute>
        } />

        {/* Catch-all redirect to auth */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
