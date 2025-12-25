import { useState, useEffect } from 'react';
import SmartMap from '../components/SmartMap';
import Layout from '../components/Layout';
import { School, MapPin, Search, IdCard, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const COLLEGE_ROUTES = [
    { id: 'c1', name: 'Route 1: Kakinada Main', stops: ['Jaggannaickpur', 'Main Road', 'Bhanugudi', 'Madhavpatnam'], eta: '08:45 AM' },
    { id: 'c2', name: 'Route 2: Samalkot', stops: ['Railway Station', 'Bus Stand', 'Peddapuram Road'], eta: '08:50 AM' },
    { id: 'c3', name: 'Route 3: Rajahmundry', stops: ['Kambala Cheruvu', 'Lala Cheruvu', 'Rajanagaram'], eta: '08:30 AM' },
];

// Mock Location for Bus (Near Pragati)
const COLLEGE_LOCATION = { lat: 17.0549, lng: 82.1706 };

export default function CollegeBus() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoute, setSelectedRoute] = useState(COLLEGE_ROUTES[0]);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
    const [busLocation, setBusLocation] = useState(COLLEGE_LOCATION);

    // Simulate "IoT" Verification Scan
    const verifyPass = () => {
        setVerificationStatus('pending');
        setTimeout(() => {
            setVerificationStatus(Math.random() > 0.2 ? 'verified' : 'failed');
        }, 1500);
    };

    // Simulate Bus Movement (Jittering around college)
    useEffect(() => {
        const interval = setInterval(() => {
            setBusLocation(prev => ({
                lat: prev.lat + (Math.random() - 0.5) * 0.001,
                lng: prev.lng + (Math.random() - 0.5) * 0.001
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filteredRoutes = COLLEGE_ROUTES.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Routes & Map */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search your bus route..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Route Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredRoutes.map(route => (
                            <button
                                key={route.id}
                                onClick={() => setSelectedRoute(route)}
                                className={`p-5 rounded-xl border text-left transition-all group ${selectedRoute.id === route.id
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                        : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg group-hover:underline decoration-2 underline-offset-4">{route.name}</h3>
                                    <School className={`w-5 h-5 ${selectedRoute.id === route.id ? 'text-white' : 'text-primary'}`} />
                                </div>
                                <p className={`text-xs mb-2 ${selectedRoute.id === route.id ? 'text-teal-100' : 'text-gray-500'}`}>
                                    Stops: {route.stops.slice(0, 2).join(', ')}...
                                </p>
                                <div className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${selectedRoute.id === route.id ? 'bg-white/20' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    ETA: {route.eta}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Live Tracker Map */}
                    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden h-80 relative">
                        <SmartMap
                            center={busLocation}
                            zoom={15}
                            markers={[{ id: 'college_bus', lat: busLocation.lat, lng: busLocation.lng, title: selectedRoute.name }]}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow border border-gray-200">
                            <p className="text-xs font-bold text-primary flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                Live Tracking: {selectedRoute.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Student Profile & IoT Pass */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                        <div className="bg-gradient-to-r from-primary to-emerald-600 h-24"></div>
                        <div className="px-6 pb-6 relative">
                            <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg absolute -top-10 left-1/2 transform -translate-x-1/2">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=12" alt="Student" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <h2 className="text-xl font-bold text-gray-900">M. Hasini</h2>
                                <p className="text-gray-500 text-sm">CSE - 3rd Year</p>
                                <p className="text-primary font-bold text-xs mt-1">ID: 21A31A05H5</p>
                            </div>

                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-medium text-gray-600">Bus Pass Status</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">ACTIVE</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">IoT Verification</p>

                                    {verificationStatus === 'pending' && (
                                        <button onClick={verifyPass} className="w-full py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-teal-700 transition flex items-center justify-center">
                                            <IdCard className="w-4 h-4 mr-2" /> Tap to Verify
                                        </button>
                                    )}

                                    {verificationStatus === 'verified' && (
                                        <div className="animate-fade-in flex flex-col items-center text-green-600">
                                            <CheckCircle2 className="w-10 h-10 mb-2" />
                                            <span className="font-bold">Access Granted</span>
                                            <button onClick={() => setVerificationStatus('pending')} className="text-xs mt-2 underline text-gray-400 hover:text-gray-600">Scan Again</button>
                                        </div>
                                    )}

                                    {verificationStatus === 'failed' && (
                                        <div className="animate-fade-in flex flex-col items-center text-red-600">
                                            <XCircle className="w-10 h-10 mb-2" />
                                            <span className="font-bold">Verification Failed</span>
                                            <span className="text-xs text-gray-500">Please contact admin</span>
                                            <button onClick={() => setVerificationStatus('pending')} className="text-xs mt-2 underline text-gray-400 hover:text-gray-600">Retry</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                        <div className="flex items-start">
                            <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-amber-800 text-sm mb-1">Fee Reminder</h3>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                    Your 2nd Term bus fee is due by <span className="font-bold">Jan 15, 2025</span>. Please pay at the college counter to avoid pass suspension.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
