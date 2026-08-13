import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Shield, User, Truck, Phone, AlertCircle, Zap, Moon, Heart, UserCheck, FlameKindling, VolumeX, Users, DoorClosed, QrCode, Gauge, MapPin, Plus, AlertTriangle, PlusCircle, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import normsBg from '../assets/norms_bg.png';

export default function Norms() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');

    return (
        <Layout>
            <div
                className="min-h-screen -mt-20 pt-32 pb-20 px-6 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${normsBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center justify-center p-5 bg-red-500/20 rounded-[2rem] mb-8 border border-red-500/30 shadow-2xl shadow-red-500/10">
                            <Shield className="w-12 h-12 text-red-500" />
                        </div>
                        <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4 drop-shadow-2xl">
                            {t.norms.normsHeader}
                        </h1>
                        <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[11px] drop-shadow-md">
                            {t.norms.normsSubtitle}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
                        {[
                            { name: t.norms.helplines.police, num: '100', icon: <Shield className="w-4 h-4" />, color: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
                            { name: t.norms.helplines.women, num: '181', icon: <Heart className="w-4 h-4" />, color: 'bg-pink-500/10 border-pink-500/30 text-pink-400' },
                            { name: t.norms.helplines.ambulance, num: '108', icon: <PlusCircle className="w-4 h-4" />, color: 'bg-red-500/10 border-red-500/30 text-red-400' },
                            { name: t.norms.helplines.fire, num: '101', icon: <Flame className="w-4 h-4" />, color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
                            { name: t.norms.helplines.rtc, num: '1800-425-0099', icon: <Phone className="w-4 h-4" />, color: 'bg-teal-500/10 border-teal-500/30 text-teal-400' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`${item.color} p-6 rounded-[2rem] text-center border backdrop-blur-md shadow-xl flex flex-col items-center justify-center group hover:-translate-y-1 transition-all`}
                            >
                                <div className="mb-2 opacity-50">{item.icon}</div>
                                <p className="text-[9px] font-black uppercase tracking-widest mb-1">{item.name}</p>
                                <p className="text-lg font-black italic tracking-tighter">{item.num}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center mb-16">
                        <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[2.5rem] flex border border-white/10 shadow-2xl overflow-hidden">
                            <button
                                onClick={() => setActiveTab('passenger')}
                                className={`px-16 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 ${activeTab === 'passenger' ? 'bg-white text-gray-900 shadow-2xl' : 'text-gray-400 hover:text-white'}`}
                            >
                                <User className="w-5 h-5" /> {t.norms.passengerTab}
                            </button>
                            <button
                                onClick={() => setActiveTab('driver')}
                                className={`px-16 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 ${activeTab === 'driver' ? 'bg-white text-gray-900 shadow-2xl' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Truck className="w-5 h-5" /> {t.norms.driverTab}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-20"
                        >
                            {activeTab === 'passenger' ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <NormCard number="01" title="In-Bus Behavior" desc="No loud music, no foot-board travel, and strictly no littering. Maintain cabin silence." penalty="Fine: ₹200" type="warning" icon={<VolumeX className="w-5 h-5" />} />
                                        <NormCard number="02" title="Reserved Zones" desc="Front rows are strictly reserved for women. Keep them clear even if empty." penalty="Mandatory Compliance" type="danger" icon={<Users className="w-5 h-5" />} />
                                        <NormCard number="03" title="Boarding IoT" desc="IoT sensors track entry/exit. Do not obstruct automatic door mechanisms." penalty="Maintenance Fine: ₹1000" type="warning" icon={<DoorClosed className="w-5 h-5" />} />
                                        <NormCard number="04" title="Smart Pass" desc="Digital passes must be kept ready for NFC/Scan validation on every trip." penalty="Blacklist Warning" type="info" icon={<QrCode className="w-5 h-5" />} />
                                    </div>

                                    {/* Sthri Shakthi Priority Heading */}
                                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="pt-10 border-t border-white/10">
                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="w-16 h-16 bg-pink-500/20 rounded-3xl flex items-center justify-center border border-pink-500/30 shadow-2xl shadow-pink-500/10">
                                                <Sparkles className="w-8 h-8 text-pink-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{t.norms.sthriShakthi.title}</h2>
                                                <p className="text-[10px] font-black text-pink-400 uppercase tracking-[0.4em]">{t.norms.sthriShakthi.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <NormCard number="05" title="Free Travel" desc="Zero-fare eligibility across all Palle Velugu & Express ordinary buses for women." penalty="Empowerment Eligibility" type="info" icon={<Heart className="w-5 h-5" />} />
                                            <NormCard number="06" title="IoT Panic Buttons" desc="Under-seat panic buttons linked directly to nearest interceptor and RTC control hub." penalty="Instant Police Alert" type="danger" icon={<Shield className="w-5 h-5" />} />
                                            <NormCard number="07" title="Night Stop Protocol" desc="Post 10PM, women can request stops anywhere on the route for safety (even if no bus stop)." penalty="Safety Requirement" type="warning" icon={<Moon className="w-5 h-5" />} />
                                        </div>
                                    </motion.div>

                                    {/* Safety / Emergency Heading */}
                                    <div className="pt-10 border-t border-white/10">
                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="w-16 h-16 bg-red-500/20 rounded-3xl flex items-center justify-center border border-red-500/30 shadow-2xl shadow-red-500/10">
                                                <AlertTriangle className="w-8 h-8 text-red-500" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{t.norms.emergency.title}</h2>
                                                <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em]">{t.norms.emergency.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <NormCard number="08" title="Fire Safety System" desc="Automatic fire suppression sensors and manual extinguishers available at front and rear." penalty="Emergency Only" type="danger" icon={<FlameKindling className="w-5 h-5" />} />
                                            <NormCard number="09" title="First Aid Hub" desc="Basic medical trauma kit located behind driver seat. Includes OTC medication." penalty="Accessible for All" type="info" icon={<Plus className="w-5 h-5" />} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <NormCard number="01" title="Speed Telemetry" desc="Real-time speed monitoring via GPS. Maintain 40km/h in congested city limits." penalty="Auto-Suspend" type="danger" icon={<Gauge className="w-5 h-5" />} />
                                    <NormCard number="02" title="Duty Hygiene" desc="Professional attire and valid transport ID visible to IoT dash cam at all times." penalty="Incentive Deduction" type="warning" icon={<UserCheck className="w-5 h-5" />} />
                                    <NormCard number="03" title="Stoppage Protocol" desc="Buses must align exactly with the curb sensor at designated stops for safe passenger flow." penalty="Route Penalty" type="danger" icon={<MapPin className="w-5 h-5" />} />
                                    <NormCard number="04" title="Emergency Prep" desc="Drivers must verify all IoT safety sensors and panic buttons before starting the daily trip." penalty="Compliance Check" type="warning" icon={<Zap className="w-5 h-5" />} />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}

function NormCard({ number, title, desc, penalty, type, icon }: { number: string, title: string, desc: string, penalty: string, type: 'warning' | 'danger' | 'info', icon?: ReactNode }) {
    const { t } = useLanguage();
    const colors = {
        warning: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
        danger: 'border-red-500/30 text-red-400 bg-red-500/10',
        info: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl flex flex-col relative overflow-hidden group hover:border-primary/50 transition-all duration-500"
        >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-9xl font-black italic tracking-tighter">{number}</span>
            </div>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border shadow-2xl ${colors[type]}`}>
                        {icon || <Shield className="w-8 h-8" />}
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{title}</h3>
                    </div>
                </div>
                <p className="text-gray-400 mb-10 flex-1 font-medium leading-relaxed italic text-sm">{desc}</p>
                <div className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 self-start ${colors[type]}`}>
                    <AlertCircle className="w-4 h-4" /> {t.norms.violation}: {penalty}
                </div>
            </div>
        </motion.div>
    );
}
