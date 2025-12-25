import { useState, useEffect } from 'react';
import SmartMap from '../components/SmartMap';
import Layout from '../components/Layout';
import { db } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Bus, School, Clock, Wifi, Activity, ArrowRight, ArrowLeft, Zap, Server, Database, CheckCircle, Smartphone, Signal, Info, MapPin, Navigation, User, ShieldCheck, AlertTriangle, Search, Play, StopCircle } from 'lucide-react';

// --- MOCK DATA ---
const PUBLIC_BUSES = [
    { id: '1', number: 'AP 39 Z 1234', route: 'Vijayawada → Guntur', status: 'Nearly Full', seats: '38/50', time: '8 min', bg: 'bg-[#16A286]', text: 'text-white', icon: 'text-white' },
    { id: '2', number: 'AP 39 Z 5678', route: 'Vijayawada → Guntur', status: 'Overcrowded', seats: '52/50', time: '15 min', bg: 'bg-white', text: 'text-gray-900', icon: 'text-gray-400' },
    { id: '3', number: 'AP 39 Z 9012', route: 'Vijayawada → Guntur', status: 'Seats Available', seats: '22/50', time: '25 min', bg: 'bg-white', text: 'text-gray-900', icon: 'text-gray-400' },
];

const COLLEGE_ROUTES = [
    { id: '1', name: 'PEC-01', route: 'Peddapuram Route', stops: 'Jaggannaickpur, Main Road', eta: '12 min', seats: '42/56', color: 'bg-[#16A386]', text: 'text-white', badge: 'Seats Available' },
    { id: '2', name: 'PEC-02', route: 'Samalkot Route', stops: 'Railway Station, Bus Stand', eta: '8 min', seats: '48/56', color: 'bg-white', text: 'text-gray-900', badge: 'Seats Available' },
    { id: '3', name: 'PEC-03', route: 'Kakinada Route', stops: 'Kambala Cheruvu, Lala Cheruvu', eta: '18 min', seats: '52/56', color: 'bg-white', text: 'text-gray-900', badge: 'Nearly Full' },
];

import { useLocation } from 'react-router-dom';

export default function StateBus() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'public' | 'college'>(location.state?.tab || 'public');

    // Update tab if navigation state changes
    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    // IoT State & Simulation
    const [passengers, setPassengers] = useState(38);
    const capacity = 50;
    const [boarded, setBoarded] = useState(127);
    const [exited, setExited] = useState(89);
    const [entryActive, setEntryActive] = useState(false);
    const [exitActive, setExitActive] = useState(false);

    // Bus Movement Simulation
    const [publicBusLocation, setPublicBusLocation] = useState({ lat: 16.5062, lng: 80.6480 });
    const [collegeBusLocation, setCollegeBusLocation] = useState({ lat: 17.0500, lng: 82.1700 });

    const handleAutoSimulate = () => {
        // Generate a realistic random occupancy between 20 and 50
        const randomOccupancy = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        setPassengers(randomOccupancy);

        // Update boarded/exited counts to reflect the change realistically
        if (randomOccupancy > passengers) {
            setBoarded(b => b + (randomOccupancy - passengers));
            setEntryActive(true);
            setTimeout(() => setEntryActive(false), 500);
        } else {
            setExited(e => e + (passengers - randomOccupancy));
            setExitActive(true);
            setTimeout(() => setExitActive(false), 500);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            // Move Public Bus (Vijayawada -> Guntur direction)
            setPublicBusLocation(prev => ({
                lat: prev.lat + (Math.random() * 0.001 - 0.0005),
                lng: prev.lng + (Math.random() * 0.001 - 0.0005)
            }));
            // Move College Bus (Peddapuram area)
            setCollegeBusLocation(prev => ({
                lat: prev.lat + (Math.random() * 0.001 - 0.0005),
                lng: prev.lng + (Math.random() * 0.001 - 0.0005)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Existing IoT Simulation
    // Hybrid IoT Simulation: Real Database OR Mock Simulation
    useEffect(() => {
        // If API Key exists, try to connect to Firebase
        if (import.meta.env.VITE_FIREBASE_API_KEY) {
            console.log("Connecting to Firebase Realtime Database...");
            const busRef = ref(db, 'buses/bus_01');
            const unsubscribe = onValue(busRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (data.passenger_count !== undefined) setPassengers(data.passenger_count);
                    // Add other real-time updates here
                }
            });
            return () => unsubscribe();
        } else {
            // Fallback: Use Simulation if no keys are found
            const interval = setInterval(() => {
                if (passengers < 50 && Math.random() > 0.7) {
                    setEntryActive(true);
                    setTimeout(() => setEntryActive(false), 1000);
                    setPassengers(p => p + 1);
                    setBoarded(b => b + 1);
                } else if (passengers > 0 && Math.random() > 0.8) {
                    setExitActive(true);
                    setTimeout(() => setExitActive(false), 1000);
                    setPassengers(p => p - 1);
                    setExited(e => e + 1);
                }
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [passengers]);

    const seats = Array.from({ length: 50 }, (_, i) => i < passengers);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-20 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Live Bus Status</h1>
                        <p className="text-gray-500">Track buses in real-time</p>
                    </div>
                </div>

                {/* TABS (Toggle between Public & College) */}
                <div className="bg-gray-100 p-1 rounded-2xl inline-flex w-full md:w-auto mb-6">
                    <button
                        onClick={() => setActiveTab('public')}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-all ${activeTab === 'public' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Bus className="w-5 h-5 mr-2" /> Public Buses
                    </button>
                    <button
                        onClick={() => setActiveTab('college')}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-all ${activeTab === 'college' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <School className="w-5 h-5 mr-2" /> College Buses
                    </button>
                </div>

                {/* TOP GRID: Map (Left) + List (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* LEFT: MAP (Spans 2 cols) */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden h-[550px] relative z-0">
                        <SmartMap
                            center={activeTab === 'public' ? publicBusLocation : collegeBusLocation}
                            zoom={13}
                            markers={activeTab === 'public'
                                ? [{ id: '1', lat: publicBusLocation.lat, lng: publicBusLocation.lng, title: 'AP 39 Z 1234' }, { id: '2', lat: 16.5200, lng: 80.6200, title: 'AP 39 Z 5678' }]
                                : [{ id: '1', lat: collegeBusLocation.lat, lng: collegeBusLocation.lng, title: 'PEC-01' }]
                            }
                        />
                        <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-xl text-sm font-bold shadow text-gray-900 flex items-center backdrop-blur-md">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            LIVE TRACKING
                        </div>

                        {/* Map Overlay Legend */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-200 z-[1000] text-xs">
                            <p className="font-bold mb-2 uppercase text-gray-400">Live Status</p>
                            <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Seats Available (&lt;60%)</div>
                            <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div> Nearly Full (60-90%)</div>
                            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div> Overcrowded (&gt;90%)</div>
                        </div>
                    </div>

                    {/* RIGHT: LIST (Spans 1 col) */}
                    <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 h-[550px] overflow-y-auto">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                            {activeTab === 'public' ? <Bus className="w-5 h-5 mr-2" /> : <School className="w-5 h-5 mr-2" />}
                            {activeTab === 'public' ? 'Available Buses' : 'College Buses'}
                        </h3>

                        <div className="space-y-4">
                            {activeTab === 'public' ? (
                                PUBLIC_BUSES.map(bus => (
                                    <div key={bus.id} className={`${bus.bg} rounded-2xl p-5 border border-gray-100 shadow-sm transition-all hover:scale-[1.02]`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className={`text-lg font-black ${bus.text}`}>{bus.number}</h4>
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${bus.status === 'Nearly Full' ? 'bg-black/20 text-white' : bus.status === 'Overcrowded' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                                {bus.status}
                                            </span>
                                        </div>
                                        <div className={`flex items-center gap-4 text-xs font-bold ${bus.text === 'text-white' ? 'text-white/80' : 'text-gray-500'}`}>
                                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {bus.time}</span>
                                            <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {bus.seats}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                COLLEGE_ROUTES.map(bus => (
                                    <div key={bus.id} className={`${bus.color} rounded-2xl p-5 border border-gray-100 shadow-sm transition-all hover:scale-[1.02]`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-lg font-black ${bus.text}`}>{bus.name}</h4>
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${bus.badge === 'Nearly Full' ? 'bg-yellow-100 text-yellow-700' : 'bg-black/20 text-white'}`}>
                                                {bus.badge}
                                            </span>
                                        </div>
                                        <p className={`text-sm font-bold mb-4 ${bus.text === 'text-white' ? 'text-white/90' : 'text-gray-500'}`}>{bus.route}</p>
                                        <div className={`flex items-center gap-4 text-xs font-bold ${bus.text === 'text-white' ? 'text-white/80' : 'text-gray-500'}`}>
                                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {bus.eta}</span>
                                            <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {bus.seats}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. RECENT ACTIVITY (SIMULATION) - NEW SECTION FROM SCREENSHOT 0 */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center">
                        <Info className="w-4 h-4 mr-2" /> Recent Activity
                    </h3>

                    <div className="bg-white rounded-xl p-8 text-center border bordered-dashed border-gray-300 mb-8">
                        <p className="text-gray-400 text-sm font-medium">No activity yet. Use the buttons below to simulate.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => { setPassengers(p => p + 1); setBoarded(b => b + 1); setEntryActive(true); setTimeout(() => setEntryActive(false), 500); }}
                            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center transition-all active:scale-95"
                        >
                            <User className="w-5 h-5 mr-2" /> Board Passenger (+1)
                        </button>
                        <button
                            onClick={() => { if (passengers > 0) { setPassengers(p => p - 1); setExited(e => e + 1); setExitActive(true); setTimeout(() => setExitActive(false), 500); } }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-200 flex items-center justify-center transition-all active:scale-95"
                        >
                            <User className="w-5 h-5 mr-2" /> Exit Passenger (-1)
                        </button>
                        <button
                            onClick={handleAutoSimulate}
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all"
                        >
                            <Bus className="w-5 h-5 mr-2 text-primary" /> Auto Simulate
                        </button>
                    </div>
                </div>

                {/* 3. HOW SMART SENSORS WORK (Screenshot 0 Cards) */}
                <div className="bg-white rounded-3xl shadow-card p-8 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                        <Wifi className="w-5 h-5 mr-2 text-primary" /> How Smart Sensors Work
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-blue-600">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">IR Sensors</h4>
                            <p className="text-xs text-gray-500">Detect passengers at doors</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 text-green-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Edge Processing</h4>
                            <p className="text-xs text-gray-500">Count & process on-device</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 text-purple-600">
                                <Wifi className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">4G/LTE Upload</h4>
                            <p className="text-xs text-gray-500">Real-time cloud sync</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3 text-orange-600">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Passenger App</h4>
                            <p className="text-xs text-gray-500">See availability at stops</p>
                        </div>
                    </div>
                </div>

                {/* 4. DETAILED IOT DASHBOARD (User Loved This) */}
                {/* HEADLINE */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-12">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
                            <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3"><Server className="w-6 h-6" /></span>
                            Real-time Sensor Data
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 ml-14">Live feed from Bus AP39 Z 1234</p>
                    </div>
                </div>

                {/* SENSOR DETAIL CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Entry Sensor */}
                    <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Entry Sensor</p>
                                <h3 className="text-lg font-bold text-gray-900">Front Door</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                <ArrowRight className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 relative mb-4 overflow-hidden flex items-center justify-center">
                            <div className="w-full h-px bg-green-200 absolute"></div>
                            <div className={`w-2 h-2 rounded-full bg-green-500 absolute transition-all duration-300 ${entryActive ? 'left-1/2 scale-150' : 'left-0'}`}></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-500">Today's Count</p>
                            <p className="text-2xl font-bold text-green-600">+{boarded}</p>
                        </div>
                    </div>

                    {/* Cloud Sync */}
                    <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary rounded-b-full"></div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Processing Unit</p>
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Cloud Sync</h3>
                        <div className="w-20 h-20 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-4 relative">
                            <Server className="w-8 h-8 text-primary" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className="text-xs font-bold text-gray-400">Latency</p>
                        <p className="text-xl font-bold text-gray-900">36ms</p>
                    </div>

                    {/* Exit Sensor */}
                    <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1 h-full bg-yellow-500"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Exit Sensor</p>
                                <h3 className="text-lg font-bold text-gray-900">Rear Door</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                                <ArrowLeft className="w-5 h-5 text-yellow-600" />
                            </div>
                        </div>
                        <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 relative mb-4 overflow-hidden flex items-center justify-center">
                            <div className="w-full h-px bg-yellow-200 absolute"></div>
                            <div className={`w-2 h-2 rounded-full bg-yellow-500 absolute transition-all duration-300 ${exitActive ? 'right-1/2 scale-150' : 'right-0'}`}></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-500">Today's Count</p>
                            <p className="text-2xl font-bold text-yellow-600">-{exited}</p>
                        </div>
                    </div>
                </div>

                {/* CAPACITY BAR & DASHBOARD */}
                <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-5xl font-black text-gray-900">{passengers} <span className="text-lg text-gray-400 font-medium">/ 50</span></h3>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${passengers > 45 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                    {passengers > 45 ? 'OVERCROWDED' : 'COMFORTABLE'}
                                </div>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ease-out rounded-full ${passengers > 45 ? 'bg-red-500' : passengers > 35 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${(passengers / capacity) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* SEAT MAP */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center text-sm uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4 mr-2 text-primary" /> Real-time Seat Map
                        </h4>
                        <div className="grid grid-cols-10 gap-2">
                            {seats.map((isOccupied, idx) => (
                                <div key={idx} className={`aspect-square rounded-md transition-all duration-500 ${isOccupied ? 'bg-primary' : 'bg-gray-100'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
