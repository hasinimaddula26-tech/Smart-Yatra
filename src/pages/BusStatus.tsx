import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Wifi, Activity, ArrowRight, ArrowLeft, Zap, Server, CheckCircle, Signal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BusStatus() {
    const { t } = useLanguage();
    // Simulation State
    const [passengers, setPassengers] = useState(38);
    const capacity = 50;
    const [boarded, setBoarded] = useState(127);
    const [exited, setExited] = useState(89);

    // Animation states for door sensors
    const [entryActive, setEntryActive] = useState(false);
    const [exitActive, setExitActive] = useState(false);

    // Simulate random entry/exit
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7 && passengers < 50) {
                setEntryActive(true);
                setTimeout(() => setEntryActive(false), 1000);
                setPassengers(p => p + 1);
                setBoarded(b => b + 1);
            } else if (Math.random() > 0.8 && passengers > 0) {
                setExitActive(true);
                setTimeout(() => setExitActive(false), 1000);
                setPassengers(p => p - 1);
                setExited(e => e + 1);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [passengers]);

    // Seat Map Generation (Pseudo-random based on count)
    const seats = Array.from({ length: 50 }, (_, i) => i < passengers);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-20 space-y-8">

                {/* HEADLINE & STATUS */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                            <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3"><Wifi className="w-6 h-6" /></span>
                            {t.iotStatus.title}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1 ml-14">{t.iotStatus.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.iotStatus.transmission}</p>
                            <div className="flex items-center justify-end text-primary font-bold">
                                <Signal className="w-4 h-4 mr-1 animate-pulse" /> 4G LTE
                            </div>
                        </div>
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-600 mr-2 animate-pulse"></div> {t.iotStatus.online}
                        </div>
                    </div>
                </div>

                {/* MAIN VISUAL: DOOR SENSORS (Screenshot 1 & 2) */}
                <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-3 rounded-xl">
                                    <div className="h-10 w-1 bg-green-500 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{t.iotStatus.frontDoor}</h3>
                                    <p className="text-xs text-green-600 font-bold flex items-center">
                                        <Activity className="w-3 h-3 mr-1" /> {t.iotStatus.irActive}
                                    </p>
                                    {entryActive && <span className="text-xs font-bold text-primary animate-bounce absolute mt-1">+1 {t.iotStatus.boarding}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="bg-gray-50 rounded-3xl px-12 py-6 border border-gray-100 text-center relative z-10">
                                    <div className="text-6xl font-black text-gray-900">{passengers}</div>
                                    <div className="text-sm font-bold text-gray-400 mt-1">/ {capacity} {t.iotStatus.seats}</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200 -mt-2"></div>
                                <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-primary/30 z-20">
                                    <Zap className="w-3 h-3 inline mr-1" /> {t.iotStatus.liveSync}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-right">
                                <div>
                                    <h3 className="font-bold text-gray-900">{t.iotStatus.rearDoor}</h3>
                                    <p className="text-xs text-green-600 font-bold flex items-center justify-end">
                                        <Activity className="w-3 h-3 mr-1" /> {t.iotStatus.irActive}
                                    </p>
                                    {exitActive && <span className="text-xs font-bold text-red-500 animate-bounce absolute mt-1 right-0">-1 {t.iotStatus.exiting}</span>}
                                </div>
                                <div className="bg-amber-50 p-3 rounded-xl">
                                    <div className="h-10 w-1 bg-amber-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Capacity Bar */}
                        <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden mb-4">
                            <div
                                className={`h-full transition-all duration-500 ease-out rounded-full ${passengers > 45 ? 'bg-red-500' : passengers > 35 ? 'bg-yellow-400' : 'bg-green-500'}`}
                                style={{ width: `${(passengers / capacity) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>{t.iotStatus.comfortable}</span>
                            <span>{t.iotStatus.nearlyFull}</span>
                            <span>{t.iotStatus.overcrowded}</span>
                        </div>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-green-800 uppercase">{t.iotStatus.boardingStats}</p>
                                    <p className="text-xs text-green-600">{t.iotStatus.entrySensor} Count</p>
                                </div>
                                <div className="text-2xl font-black text-green-700">+{boarded}</div>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-yellow-800 uppercase">{t.iotStatus.exitingStats}</p>
                                    <p className="text-xs text-yellow-600">{t.iotStatus.exitSensor} Count</p>
                                </div>
                                <div className="text-2xl font-black text-yellow-700">-{exited}</div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-blue-800 uppercase">{t.iotStatus.busCapacity}</p>
                                    <p className="text-xs text-blue-600">{Math.round((passengers / capacity) * 100)}% Full</p>
                                </div>
                                <div className="text-2xl font-black text-blue-700">{capacity}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SENSOR DETAIL CARDS (Screenshot 2) */}
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
                            {/* Visual for sensor beam */}
                            <div className="w-full h-px bg-green-200 absolute"></div>
                            <div className={`w-2 h-2 rounded-full bg-green-500 absolute transition-all duration-300 ${entryActive ? 'left-1/2 scale-150' : 'left-0'}`}></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-500">{t.iotStatus.todayCount}</p>
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
                        <p className="text-xs font-bold text-gray-400">{t.iotStatus.latency}</p>
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
                            {/* Visual for sensor beam */}
                            <div className="w-full h-px bg-yellow-200 absolute"></div>
                            <div className={`w-2 h-2 rounded-full bg-yellow-500 absolute transition-all duration-300 ${exitActive ? 'right-1/2 scale-150' : 'right-0'}`}></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-500">Today's Count</p>
                            <p className="text-2xl font-bold text-yellow-600">-{exited}</p>
                        </div>
                    </div>
                </div>

                {/* SEAT MAP (Screenshot 3) */}
                <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-primary" /> {t.iotStatus.seatMap}
                    </h3>

                    <div className="flex justify-end gap-6 mb-4 text-xs font-bold">
                        <div className="flex items-center"><div className="w-4 h-4 rounded bg-gray-100 mr-2"></div> {t.iotStatus.empty}</div>
                        <div className="flex items-center"><div className="w-4 h-4 rounded bg-primary mr-2"></div> {t.iotStatus.occupied}</div>
                    </div>

                    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                        {seats.map((isOccupied, idx) => (
                            <div
                                key={idx}
                                className={`aspect-square rounded-lg transition-all duration-500 ${isOccupied ? 'bg-primary shadow-sm scale-100' : 'bg-gray-100 scale-90'}`}
                            ></div>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
}
