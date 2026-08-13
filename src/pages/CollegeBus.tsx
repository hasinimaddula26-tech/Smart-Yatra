import { useState, useEffect } from 'react';
import SmartMap from '../components/SmartMap';
import Layout from '../components/Layout';
import { School, Search, IdCard, CheckCircle2, XCircle, AlertTriangle, Bus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const COLLEGE_ROUTES = [
    { id: 'c1', name: 'Route 1: Kakinada Main', stops: ['Jaggannaickpur', 'Main Road', 'Bhanugudi', 'Madhavpatnam'], eta: '08:45 AM' },
    { id: 'c2', name: 'Route 2: Samalkot', stops: ['Railway Station', 'Bus Stand', 'Peddapuram Road'], eta: '08:50 AM' },
    { id: 'c3', name: 'Route 3: Rajahmundry', stops: ['Kambala Cheruvu', 'Lala Cheruvu', 'Rajanagaram'], eta: '08:30 AM' },
];

const COLLEGE_LOCATION = { lat: 17.0549, lng: 82.1706 };

export default function CollegeBus() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoute, setSelectedRoute] = useState(COLLEGE_ROUTES[0]);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
    const [busLocation, setBusLocation] = useState(COLLEGE_LOCATION);

    const verifyPass = () => {
        setVerificationStatus('pending');
        setTimeout(() => {
            setVerificationStatus(Math.random() > 0.2 ? 'verified' : 'failed');
        }, 1500);
    };

    const ROUTE_PATH = [
        { lat: 17.0549, lng: 82.1706 }, // Pragati College
        { lat: 17.0600, lng: 82.1650 },
        { lat: 17.0650, lng: 82.1600 },
        { lat: 17.0700, lng: 82.1550 },
        { lat: 17.0650, lng: 82.1600 },
        { lat: 17.0600, lng: 82.1650 },
    ];

    const [progress, setProgress] = useState(0);
    const [passengers, setPassengers] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p + 0.002) % 2); // Goes from 0 to 2 for bounce
            if (Math.random() > 0.98) {
                setPassengers(p => Math.max(10, Math.min(60, p + (Math.random() > 0.5 ? 1 : -1))));
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let p = progress % 2;
        if (p > 1) p = 2 - p; // Bounce back

        const totalPoints = ROUTE_PATH.length - 1;
        let index = Math.floor(p * totalPoints);
        let segmentProgress = (p * totalPoints) % 1;

        if (index >= totalPoints) {
            index = totalPoints - 1;
            segmentProgress = 1;
        }

        const start = ROUTE_PATH[index];
        const end = ROUTE_PATH[index + 1];
        if (start && end) {
            setBusLocation({
                lat: start.lat + (end.lat - start.lat) * segmentProgress,
                lng: start.lng + (end.lng - start.lng) * segmentProgress,
            });
        }
    }, [progress]);

    const filteredRoutes = COLLEGE_ROUTES.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout>
            <div className="page-bg-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08759dfc1fd?q=80&w=1920&auto=format&fit=crop')" }}></div>

            <div className="max-w-7xl mx-auto pb-20 px-6 space-y-12 relative z-10">
                <div className="flex items-center gap-6 mb-8 mt-20">
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
                        <Bus className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none mb-2">{t.college.title}</h1>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] leading-none">{t.college.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="relative group">
                            <Search className="absolute left-6 top-6 text-gray-400 w-6 h-6 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder={t.college.searchPlaceholder}
                                className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-2xl font-bold uppercase tracking-widest text-xs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredRoutes.map(route => (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={route.id}
                                    onClick={() => setSelectedRoute(route)}
                                    className={`p-8 rounded-[40px] border-2 text-left transition-all relative overflow-hidden group ${selectedRoute.id === route.id
                                        ? 'border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]'
                                        : 'futuristic-card border-transparent hover:border-primary/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-black text-xl uppercase tracking-tighter italic">{route.name}</h3>
                                        <div className={`p-3 rounded-2xl ${selectedRoute.id === route.id ? 'bg-white/20' : 'bg-primary/10'}`}>
                                            <School className={`w-6 h-6 ${selectedRoute.id === route.id ? 'text-white' : 'text-primary'}`} />
                                        </div>
                                    </div>
                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${selectedRoute.id === route.id ? 'text-white/70' : 'text-gray-400'}`}>
                                        {route.stops.slice(0, 2).join(' • ')}...
                                    </p>
                                    <div className={`inline-flex items-center px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${selectedRoute.id === route.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-gray-300'
                                        }`}>
                                        {t.college.eta}: {route.eta}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="futuristic-card h-[400px] relative overflow-hidden group"
                        >
                            <SmartMap
                                center={busLocation}
                                zoom={15}
                                path={ROUTE_PATH}
                                markers={[{ id: 'college_bus', lat: busLocation.lat, lng: busLocation.lng, title: selectedRoute.name, passengers, status: passengers > 55 ? 'crowded' : passengers > 40 ? 'full' : 'available' }]}
                            />
                            <div className="absolute top-8 left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl px-6 py-4 rounded-3xl shadow-2xl border border-white/20">
                                <p className="text-[10px] font-black text-primary flex items-center uppercase tracking-[0.2em]">
                                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-4 animate-pulse"></span>
                                    {t.college.liveTracking}: {selectedRoute.name}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="futuristic-card overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-primary via-emerald-600 to-emerald-800 h-32 relative">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            </div>
                            <div className="px-10 pb-12 relative">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[40px] p-2 shadow-2xl absolute -top-16 left-1/2 transform -translate-x-1/2 rotate-3 hover:rotate-0 transition-transform">
                                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-[35px] flex items-center justify-center overflow-hidden">
                                        <img src="https://i.pravatar.cc/150?img=12" alt="Student" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className="mt-20 text-center">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">M. Hasini</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{t.college.studentInfo}</p>
                                    <div className="mt-4 inline-block px-6 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                                        <p className="text-primary font-black text-[10px] uppercase tracking-widest">{t.college.studentId}</p>
                                    </div>
                                </div>

                                <div className="mt-12 border-t border-slate-100 dark:border-white/5 pt-12">
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{t.college.passNodeState || "Pass Node State"}</span>
                                        <span className="bg-green-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">{t.status.online || "Active"}</span>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[40px] border border-slate-100 dark:border-white/5 text-center relative overflow-hidden group">
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-8 font-black">{t.college.iotSignatureGrid}</p>

                                        <AnimatePresence mode="wait">
                                            {verificationStatus === 'pending' && (
                                                <motion.button
                                                    key="verify"
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    onClick={verifyPass}
                                                    className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-primary/30 flex items-center justify-center transform active:scale-95"
                                                >
                                                    <IdCard className="w-6 h-6 mr-4" /> {t.college.tapToVerify}
                                                </motion.button>
                                            )}

                                            {verificationStatus === 'verified' && (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                                    className="flex flex-col items-center text-green-600 dark:text-green-400"
                                                >
                                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mb-6">
                                                        <CheckCircle2 className="w-12 h-12" />
                                                    </div>
                                                    <span className="font-black uppercase tracking-[0.1em] text-sm italic">{t.college.accessGranted}</span>
                                                    <button onClick={() => setVerificationStatus('pending')} className="text-[8px] mt-6 font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">{t.college.scanAgain}</button>
                                                </motion.div>
                                            )}

                                            {verificationStatus === 'failed' && (
                                                <motion.div
                                                    key="fail"
                                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                                    className="flex flex-col items-center text-red-600 dark:text-red-400"
                                                >
                                                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mb-6">
                                                        <XCircle className="w-12 h-12" />
                                                    </div>
                                                    <span className="font-black uppercase tracking-[0.1em] text-sm italic">{t.college.verificationFailed}</span>
                                                    <span className="text-[8px] text-gray-400 uppercase tracking-widest mt-2">{t.college.contactAdmin}</span>
                                                    <button onClick={() => setVerificationStatus('pending')} className="text-[8px] mt-6 font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">{t.college.retry}</button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="futuristic-card p-8 bg-gradient-to-br from-amber-600/10 to-transparent border-l-4 border-l-amber-500"
                        >
                            <div className="flex items-start">
                                <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-2xl mr-5">
                                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-amber-400 text-sm mb-2 uppercase tracking-tight">{t.college.feeTitle}</h3>
                                    <p className="text-[10px] text-gray-600 dark:text-amber-500/80 leading-relaxed font-bold uppercase tracking-wider">
                                        {t.college.feeMessage}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
