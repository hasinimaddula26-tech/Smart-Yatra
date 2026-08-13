import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmartMap from '../components/SmartMap';
import Layout from '../components/Layout';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ROUTE_PATH = [
    { lat: 16.9891, lng: 82.2475 },
    { lat: 17.005, lng: 82.23 },
    { lat: 17.02, lng: 82.21 },
    { lat: 17.035, lng: 82.19 },
    { lat: 17.05, lng: 82.17 },
    { lat: 17.065, lng: 82.15 },
    { lat: 17.08, lng: 82.13 },
];

export default function StateBus() {
    const { t } = useLanguage();
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(42);
    const [passengers, setPassengers] = useState(38);
    const [isSimulating, setIsSimulating] = useState(true);
    const [fuel, setFuel] = useState(78);
    const [temp, setTemp] = useState(82);
    const [selectedBus, setSelectedBus] = useState('AP 39 Z 1234');

    useEffect(() => {
        let interval: any;
        if (isSimulating) {
            interval = setInterval(() => {
                setProgress((prev) => (prev + 0.001) % 2); // Goes from 0 to 2 for bounce
                setSpeed((prev) => Math.max(20, Math.min(70, prev + (Math.random() - 0.5) * 10)));
                setFuel((prev) => Math.max(10, prev - 0.001));
                setTemp((prev) => Math.max(80, Math.min(98, prev + (Math.random() - 0.5) * 3)));
                if (Math.random() > 0.98) {
                    setPassengers((p) => Math.max(0, Math.min(50, p + (Math.random() > 0.5 ? 1 : -1))));
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isSimulating]);

    const getPos = (offset: number = 0) => {
        let p = (progress + offset) % 2;
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
        if (!start || !end) return ROUTE_PATH[0];

        return {
            lat: start.lat + (end.lat - start.lat) * segmentProgress,
            lng: start.lng + (end.lng - start.lng) * segmentProgress,
        };
    };

    const buses = [
        {
            id: 'bus-1',
            ...getPos(0),
            title: 'AP 39 Z 1234',
            status: (passengers > 45 ? 'crowded' : passengers > 35 ? 'full' : 'available') as any,
            passengers,
            seats: 50 - passengers,
            driver: 'Ravi Teja',
            route: '45B',
        },
        { id: 'bus-2', ...getPos(0.3), title: 'AP 39 Z 9012', status: 'full' as const, passengers: 42, seats: 4, driver: 'M. Prasad', route: '12A' },
        { id: 'bus-3', ...getPos(0.6), title: 'AP 39 Z 5678', status: 'crowded' as const, passengers: 55, seats: 0, driver: 'K. Satya', route: '77C' },
    ];

    const seatMatrix = Array.from({ length: 50 }, (_, i) => i < passengers);

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto pb-20 px-6 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 border-b border-gray-100 dark:border-white/5">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.nav.stateBus}</h1>
                        <p className="text-sm text-gray-500 font-medium tracking-tight">{t.bus.telemetry || "Real-time Location & Telemetry"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm relative">
                        <SmartMap center={{ lat: 17.02, lng: 82.21 }} zoom={13} path={ROUTE_PATH} markers={buses} isDarkMode={false} />
                        <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100 shadow-xl">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <LucideIcons.Navigation className="w-3.5 h-3.5 text-primary" /> {t.bus.tracking}
                            </span>
                        </div>
                        <div className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-xl text-right min-w-[180px]">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">{t.bus.gpsStatus}</p>
                            <p className="text-lg font-black text-gray-900 leading-none mb-1">Vijayawada</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">35 km • 9 stops</p>
                        </div>
                        <div className="absolute bottom-10 left-6 z-10 bg-white/95 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-2xl min-w-[240px]">
                            <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-6">{t.bus.monitoring}</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-[11px] font-bold text-gray-700 uppercase">{t.status.available} ({'<'}60%)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    <span className="text-[11px] font-bold text-gray-700 uppercase">{t.status.full} (60-90%)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-[11px] font-bold text-gray-700 uppercase">{t.status.crowded} ({'>'}90%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">{t.bus.availableBuses}</h3>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                            {buses.map((bus) => (
                                <motion.div
                                    key={bus.id}
                                    whileHover={{ y: -3 }}
                                    onClick={() => setSelectedBus(bus.title)}
                                    className={`p-6 cursor-pointer rounded-2xl border transition-all ${selectedBus === bus.title ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-gray-800/50 shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-black text-lg text-gray-900 dark:text-white uppercase tracking-tighter">{bus.title}</h4>
                                        <div
                                            className={`w-3 h-3 rounded-full ${bus.status === 'available' ? 'bg-emerald-500' : bus.status === 'full' ? 'bg-amber-500' : 'bg-red-500'
                                                } shadow-sm`}
                                        ></div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <LucideIcons.MapPin className="w-3 h-3 text-gray-400" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Route {bus.route}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-4 text-[11px] font-bold uppercase tracking-tight text-gray-500">
                                        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                            Driver: <span className="text-gray-900 dark:text-white ml-1">{bus.driver}</span>
                                        </div>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                            Seats: <span className="text-emerald-500 ml-1">{bus.seats} {t.bus.seatsOpen}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-gray-100 dark:border-white/5">
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <LucideIcons.Gauge className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Live Dashboard</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: t.bus.speed, value: `${speed.toFixed(0)} KM/H`, icon: <LucideIcons.Navigation className="w-5 h-5" /> },
                                    { label: t.bus.occupancy || 'Occupancy', value: `${passengers}/50`, icon: <LucideIcons.Users className="w-5 h-5" /> },
                                    { label: t.bus.engine, value: `${temp.toFixed(0)}°C`, icon: <LucideIcons.Thermometer className="w-5 h-5" /> },
                                    { label: t.bus.energy, value: `${fuel.toFixed(0)}%`, icon: <LucideIcons.Battery className="w-5 h-5" /> },
                                ].map((stat) => (
                                    <div key={stat.label} className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400">{stat.icon}</div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter leading-none">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 bg-gray-900 dark:bg-black rounded-[3rem] shadow-2xl text-white space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[.4em] text-gray-500 mb-8">{t.bus.simulationHub}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setPassengers((p) => Math.max(0, p - 1))}
                                    className="py-5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-inner"
                                >
                                    {t.bus.exit} (-1)
                                </button>
                                <button
                                    onClick={() => setPassengers((p) => Math.min(50, p + 1))}
                                    className="py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95 text-white"
                                >
                                    {t.bus.board} (+1)
                                </button>
                            </div>
                            <button
                                onClick={() => setIsSimulating(!isSimulating)}
                                className={`w-full py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${isSimulating ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-primary text-white shadow-2xl shadow-primary/40 underline decoration-2 underline-offset-8'
                                    }`}
                            >
                                {isSimulating ? <LucideIcons.Pause className="w-4 h-4" /> : <LucideIcons.Play className="w-4 h-4" />}
                                {isSimulating ? t.bus.stopSim : t.bus.autoSim}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-gray-900 p-12 rounded-[4rem] border border-gray-100 dark:border-white/10 shadow-sm h-full">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Seat Occupancy Matrix</h3>
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-md bg-red-500 shadow-sm"></div>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Occupied</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm"></div>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Available</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-10 gap-4">
                                {seatMatrix.map((isOccupied, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={false}
                                        animate={{ backgroundColor: isOccupied ? '#ef4444' : '#10b981', scale: isOccupied ? [1, 1.1, 1] : 1 }}
                                        className="aspect-square rounded-2xl shadow-inner transition-colors duration-500"
                                    />
                                ))}
                            </div>

                            <div className="mt-14 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl flex items-center gap-8 border border-gray-100 dark:border-white/5">
                                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-sm text-primary">
                                    <LucideIcons.Info className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] mb-2">{t.bus.diagReport || "Diagnostic Report"}</p>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed italic">Live matrix link active for {selectedBus}. Sensor processing verified at 36ms latency.</p>
                                </div>
                                <button className="flex items-center gap-3 text-[11px] font-black uppercase text-primary tracking-widest hover:translate-x-1 transition-transform group">
                                    {t.bus.analyticsHub || "Analytics Hub"} <LucideIcons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
