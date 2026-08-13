import { useState } from 'react';
import Layout from '../components/Layout';
import { Train, Plane, Calendar, MapPin, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import trainsBg from '../assets/trains_bg.png';

const TRAINS = [
    { id: 't1', name: 'Guntur Intercity Express', number: '12739', type: '2S', from: 'Vijayawada', to: 'Guntur', dep: '06:15 AM', arr: '07:00 AM', duration: '45 min', seats: 120, status: 'On Time', price: 55 },
    { id: 't2', name: 'Amaravati Express', number: '17225', type: 'SL', from: 'Hyderabad', to: 'Guntur', dep: '05:30 AM', arr: '11:00 AM', duration: '5h 30m', seats: 85, status: 'On Time', price: 245 },
    { id: 't3', name: 'Vijayawada Express', number: '12727', type: '3A', from: 'Chennai', to: 'Vijayawada', dep: '10:00 PM', arr: '06:30 AM', duration: '8h 30m', seats: 45, status: 'Delayed', price: 420 },
    { id: 't4', name: 'Godavari Express', number: '12727', type: 'CC', from: 'Visakhapatnam', to: 'Vijayawada', dep: '07:00 AM', arr: '12:30 PM', duration: '5h 30m', seats: 65, status: 'On Time', price: 310 },
    { id: 't5', name: 'Satavahana Express', number: '17205', type: '2S', from: 'Secunderabad', to: 'Guntur', dep: '06:00 AM', arr: '11:45 AM', duration: '5h 45m', seats: 95, status: 'On Time', price: 195 },
    { id: 't6', name: 'Krishna Express', number: '12785', type: 'SL', from: 'Tirupati', to: 'Vijayawada', dep: '09:30 PM', arr: '05:00 AM', duration: '7h 30m', seats: 30, status: 'On Time', price: 380 },
];

export default function TrainsFlights() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'trains' | 'flights'>('trains');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


    const handleToday = () => setSelectedDate(new Date().toISOString().split('T')[0]);
    const handleTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
    };

    return (
        <Layout>
            <div
                className="min-h-screen -mt-20 pt-32 pb-20 px-6 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${trainsBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 backdrop-blur-[2px]"></div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex flex-col md:flex-row justify-between items-end gap-10"
                    >
                        <div>
                            <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-2 drop-shadow-2xl">
                                {t.trains.title}
                            </h1>
                            <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.4em] drop-shadow-md">
                                {t.trains.intelligenceHub}
                            </p>
                        </div>
                        <div className="flex bg-white/5 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <button
                                onClick={() => setActiveTab('trains')}
                                className={`px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center gap-4 ${activeTab === 'trains' ? 'bg-white text-gray-900 shadow-2xl' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Train className="w-5 h-5" /> {t.trains.trainsTab}
                            </button>
                            <button
                                onClick={() => setActiveTab('flights')}
                                className={`px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center gap-4 ${activeTab === 'flights' ? 'bg-white text-gray-900 shadow-2xl' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Plane className="w-5 h-5" /> {t.trains.flightsTab}
                            </button>
                        </div>
                    </motion.div>

                    {/* TOP SEARCH BAR ARRANGEMENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-3xl p-8 rounded-[4rem] border border-white/20 shadow-2xl mb-12 flex flex-col lg:flex-row items-center gap-10"
                    >
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-8 w-full">
                            <div className="flex-1 space-y-2 w-full">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">{t.trains.dateLabel}</label>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/10">
                                    <Calendar className="w-6 h-6 text-primary ml-2" />
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="bg-transparent text-white font-bold outline-none w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <button onClick={handleToday} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedDate === new Date().toISOString().split('T')[0] ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{t.trains.today}</button>
                                <button onClick={handleTomorrow} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedDate === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{t.trains.tomorrow}</button>
                            </div>
                        </div>
                        <div className="h-20 w-[1px] bg-white/10 hidden lg:block"></div>
                        <div className="flex items-center gap-6 pr-6">
                            <div className="p-4 bg-amber-500/20 rounded-[1.5rem] border border-amber-500/30">
                                <Info className="w-6 h-6 text-amber-500" />
                            </div>
                            <div className="max-w-[200px]">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{t.trains.advisory}</p>
                                <p className="text-[9px] font-medium text-gray-400 leading-tight italic">{t.trains.advisoryDesc}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'trains' ? (
                            <motion.div
                                key="trains"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 gap-8"
                            >
                                {TRAINS.map((train) => (
                                    <motion.div
                                        key={train.id}
                                        whileHover={{ y: -5, scale: 1.01 }}
                                        className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl group overflow-hidden relative"
                                    >
                                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Train className="w-40 h-40 text-white -rotate-12" />
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 relative z-10">
                                            <div className="flex-1 w-full space-y-10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-inner">
                                                            <Train className="w-8 h-8 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mb-1">{train.name}</h3>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">#{train.number}</span>
                                                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{train.type} CLASS</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${train.status === 'On Time' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}>
                                                        {train.status === 'On Time' ? t.trains.onTime : t.trains.delayed}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="text-center lg:text-left">
                                                        <p className="text-3xl font-black text-white italic tracking-tighter mb-1">{train.dep}</p>
                                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                            <MapPin className="w-3 h-3" /> {train.from}
                                                        </p>
                                                    </div>
                                                    <div className="flex-1 flex flex-col items-center gap-2 px-10">
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{train.duration}</span>
                                                        <div className="w-full h-[2px] bg-white/10 rounded-full relative">
                                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-slate-900 shadow-xl shadow-teal-500/50"></div>
                                                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-slate-900 shadow-xl shadow-primary/50"></div>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-white/20" />
                                                    </div>
                                                    <div className="text-center lg:text-right">
                                                        <p className="text-3xl font-black text-white italic tracking-tighter mb-1">{train.arr}</p>
                                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center justify-end gap-2">
                                                            {train.to} <MapPin className="w-3 h-3" />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{train.seats} {t.trains.seatsLeft}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.trains.pantry}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-48 lg:border-l border-white/10 lg:pl-10 space-y-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
                                                <div className="text-center">
                                                    <p className="text-4xl font-black text-white italic tracking-tighter leading-none mb-1">₹{train.price}</p>
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{t.trains.inclusiveTaxes}</p>
                                                </div>
                                                <button className="px-10 py-5 bg-primary hover:bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-primary/30 transition-all active:scale-95 flex-1 lg:w-full">
                                                    {t.trains.bookNow}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="flights"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-40 bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10 shadow-2xl"
                            >
                                <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-white/5">
                                    <Plane className="w-16 h-16 text-white/20 -rotate-12" />
                                </div>
                                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">{t.trains.noFlights}</h3>
                                <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed italic">{t.trains.noFlightsDesc}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
