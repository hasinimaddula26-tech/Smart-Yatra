import { Bus, Train, Car, AlertTriangle, Star, Zap, IndianRupee, ArrowRight, Timer, Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import transitBg from '../assets/transit_bg.png';

export default function NationalTrip() {
    const { t } = useLanguage();

    return (
        <Layout>
            <div
                className="min-h-screen -mt-20 pt-32 pb-20 px-6 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${transitBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90 backdrop-blur-[3px]"></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4 drop-shadow-2xl">
                                {t.alternatives.title}
                            </h1>
                            <p className="text-sm font-black text-gray-300 uppercase tracking-[0.4em] drop-shadow-md">
                                {t.norms.analytics || "AI-Powered Multi-Modal Transit Optimization"}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/10 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <Search className="w-5 h-5 text-primary" />
                                <span className="text-xs font-black text-white uppercase tracking-widest italic">{t.alternatives.optimizingFor} Vijayawada → Guntur</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 backdrop-blur-2xl border border-red-500/30 rounded-[3.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-red-500/10 group overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <AlertTriangle className="w-40 h-40 text-red-500 -rotate-12" />
                                </div>
                                <div className="w-24 h-24 bg-red-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-red-500/40 shrink-0">
                                    <AlertTriangle className="w-12 h-12 text-white animate-pulse" />
                                </div>
                                <div className="flex-1 text-center md:text-left relative z-10">
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">{t.alternatives.busStatus}</h3>
                                    <p className="text-gray-300 font-medium leading-relaxed italic text-lg opacity-80 mb-6">
                                        Bus <span className="text-white font-black underline decoration-red-500 decoration-4 underline-offset-8">AP 39 Z 5678</span> is currently <span className="text-red-400 font-black italic">{t.status.crowded}</span> and running <span className="text-red-400 font-black italic">15 minutes late</span>.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <span className="bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl border border-red-500/30 flex items-center shadow-inner">
                                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-3 animate-ping"></div> {t.status.crowded} (95%)
                                        </span>
                                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl border border-amber-500/30 flex items-center shadow-inner">
                                            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-3"></div> 15m Delay
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-8 space-y-8">
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] italic mb-4 px-2">{t.alternatives.modes}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl group hover:border-primary transition-all">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all">
                                                <Bus className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-2xl italic tracking-tighter uppercase">RTC Deluxe</h4>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                    10:30 AM <ArrowRight className="w-3 h-3" /> 11:15 AM
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                            Active
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Time</p>
                                            <p className="text-lg font-black text-white italic tracking-tighter">45m</p>
                                        </div>
                                        <div className="text-center border-x border-white/5">
                                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Fare</p>
                                            <p className="text-lg font-black text-white italic tracking-tighter">₹45</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Seats</p>
                                            <p className="text-lg font-black text-emerald-400 italic tracking-tighter">12</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/20 backdrop-blur-2xl p-10 rounded-[3.5rem] border-2 border-primary shadow-2xl group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-black px-8 py-3 rounded-br-[1.5rem] uppercase tracking-widest flex items-center shadow-2xl">
                                        <Star className="w-3 h-3 mr-2 fill-current" /> {t.alternatives.bestValue}
                                    </div>
                                    <div className="flex justify-between items-start mb-10 mt-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/40">
                                                <Train className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-2xl italic tracking-tighter uppercase leading-none mb-1">Guntur Intercity</h4>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                                    10:45 AM <ArrowRight className="w-3 h-3" /> 11:20 AM
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-2 rounded-full border border-primary/40 bg-primary/10 text-white text-[10px] font-black uppercase tracking-widest">
                                            On Time
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/10">
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-1">Time</p>
                                            <p className="text-lg font-black text-white italic tracking-tighter">35m</p>
                                        </div>
                                        <div className="text-center border-x border-white/10">
                                            <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-1">Fare</p>
                                            <p className="text-lg font-black text-white italic tracking-tighter">₹35</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-1">Seats</p>
                                            <p className="text-lg font-black text-amber-400 italic tracking-tighter">45</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl group hover:border-orange-500/50 transition-all">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-orange-500/20 rounded-[1.5rem] flex items-center justify-center border border-white/10 group-hover:bg-orange-500 transition-all">
                                                <Car className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-2xl italic tracking-tighter uppercase">Ola / Uber</h4>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                    Now <ArrowRight className="w-3 h-3" /> Doorstep
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/5">
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Est. Arrival</p>
                                            <p className="text-lg font-black text-white italic tracking-tighter">30m</p>
                                        </div>
                                        <div className="text-center border-l border-white/5">
                                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Fare (Min)</p>
                                            <p className="text-lg font-black text-orange-400 italic tracking-tighter">₹350</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/10">
                                                <Bus className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-2xl italic tracking-tighter uppercase">RTC Ordinary</h4>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                    Low Frequency View
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest">
                                            Delayed
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-white/5 text-center px-4">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                                            Not recommended for immediate travel. Estimated wait time exceeds 40 minutes.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-10">
                            <div className="bg-slate-950/80 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-3xl space-y-12">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-primary/20 rounded-[2rem] shadow-2xl shadow-primary/20">
                                        <Zap className="w-8 h-8 text-primary animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mb-1">{t.alternatives.quickDecision}</h3>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.alternatives.comparison}</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: t.alternatives.fastest, value: 'Cab (30 min)', icon: <Timer className="w-5 h-5" />, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
                                        { label: t.alternatives.cheapest, value: 'RTC Ordinary (₹30)', icon: <IndianRupee className="w-5 h-5" />, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
                                        { label: 'Reliability', value: 'Train (98%)', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
                                    ].map((stat) => (
                                        <div key={stat.label} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className={`p-3 rounded-xl border ${stat.color}`}>
                                                    {stat.icon}
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                                    <p className="text-sm font-black text-white italic tracking-tight">{stat.value}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))}
                                </div>
                                <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-3xl shadow-primary/40 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-20 rotate-12 group-hover:rotate-0 transition-transform">
                                        <Zap className="w-20 h-20" />
                                    </div>
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter mb-4 relative z-10">{t.alternatives.recommendation}</h4>
                                    <p className="text-xs font-bold leading-relaxed opacity-90 relative z-10">
                                        Based on your profile, the **Guntur Intercity Train (10:45 AM)** is the most efficient choice today.
                                    </p>
                                    <Link to="/trains-flights" className="mt-8 px-8 py-4 bg-white text-primary rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-3 relative z-10 hover:scale-105 active:scale-95 transition-all">
                                        {t.alternatives.executeBooking} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
