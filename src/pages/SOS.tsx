import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { Siren, Zap, X, Shield, Mic, User, PlusCircle, Flame, MicOff, MapPin, Bus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function SOS() {
    const { t } = useLanguage();
    const { currentUser } = useAuth();
    const [sosStage, setSosStage] = useState<'idle' | 'countdown' | 'triggered'>('idle');
    const [countdown, setCountdown] = useState(5);
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef<any>(null);
    const recIntervalRef = useRef<any>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => console.error("Location error:", err)
            );
        }
    }, []);

    useEffect(() => {
        if (isRecording) {
            recIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            if (recIntervalRef.current) clearInterval(recIntervalRef.current);
            setRecordingTime(0);
        }
        return () => { if (recIntervalRef.current) clearInterval(recIntervalRef.current); };
    }, [isRecording]);

    const handleOneTapCall = (number: string) => {
        triggerSOS(`Direct Call initiated to ${number}`);
        window.location.href = `tel:${number}`;
    };

    const startPanicSequence = () => {
        setSosStage('countdown');
        setCountdown(5);

        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    triggerSOS("Auto-Panic Triggered");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const cancelSOS = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSosStage('idle');
        setCountdown(5);
    };

    const triggerSOS = async (reason: string = "Emergency SOS Triggered") => {
        setSosStage('triggered');
        try {
            await supabase
                .from('complaints')
                .insert([
                    {
                        user_id: currentUser?.id,
                        title: 'EMERGENCY SOS',
                        description: `${reason}. HELP REQUIRED IMMEDIATELY. User: ${currentUser?.email}`,
                        status: 'High Priority',
                        category: 'Emergency',
                        location: location ? `${location.lat.toFixed(4)}° N, ${location.lng.toFixed(4)}° E` : 'Kakinada Sector'
                    }
                ]);
        } catch (err) {
            console.error("SOS Log Error:", err);
        }
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
    };

    const helplines = [
        { name: 'Police', num: '100', icon: <User className="w-6 h-6" />, color: 'blue' },
        { name: 'Women Helpline', num: '181', icon: <User className="w-6 h-6" />, color: 'pink' },
        { name: 'Ambulance', num: '108', icon: <PlusCircle className="w-6 h-6" />, color: 'red' },
        { name: 'Fire', num: '101', icon: <Flame className="w-6 h-6" />, color: 'orange' },
    ];

    return (
        <Layout>
            {/* CIEMATIC BACKGROUND - SOFT PINK/SKY CLOUDS */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-pink-50/50 to-white -z-10 bg-fixed">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/30 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-sky-200/30 blur-[120px] rounded-full animate-pulse-slow delay-1000"></div>
            </div>

            <div className="max-w-[1400px] mx-auto pt-4 pb-20 px-6 space-y-12 relative z-10 font-sans">

                {/* 1. APP-LIKE HEADER */}
                <div className="flex items-center justify-between mb-8 overflow-hidden">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center border border-red-200 shadow-2xl shadow-red-500/10">
                            <Siren className="w-8 h-8 text-red-500 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase leading-none mb-1">{t.sos.title}</h1>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] leading-none">{t.sos.subtitle}</p>
                        </div>
                    </div>
                    <button className="w-12 h-12 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center border border-gray-100 text-gray-300 hover:text-red-500 transition-all hover:scale-110 active:scale-95">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN (8/12) - VOICE & CORE ACTIONS */}
                    <div className="xl:col-span-8 space-y-10">
                        {/* 2. VOICE ACTIVATED SOS CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-16 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] border border-white relative overflow-hidden text-center group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Zap className="w-64 h-64 text-blue-500 -rotate-12" />
                            </div>

                            <AnimatePresence mode="wait">
                                {sosStage === 'idle' ? (
                                    <motion.div key="idle" className="space-y-12 py-10">
                                        <div>
                                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">{t.sos.voiceTitle}</h2>
                                            <p className="text-sm font-black text-gray-400 italic uppercase tracking-[0.3em] bg-slate-100/50 inline-block px-10 py-3 rounded-full">{t.sos.voiceSubtitle}</p>
                                        </div>

                                        <div className="relative flex justify-center py-10 scale-125">
                                            <div className="absolute inset-0 bg-red-500 blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
                                            <button
                                                onClick={startPanicSequence}
                                                className="w-56 h-56 rounded-full bg-white shadow-[0_25px_60px_-10px_rgba(220,38,38,0.25)] flex items-center justify-center relative z-10 border border-gray-100 group/btn transition-transform active:scale-95"
                                            >
                                                <div className="w-32 h-32 bg-red-50 text-red-100 rounded-full flex items-center justify-center group-hover/btn:bg-red-500/10 transition-colors">
                                                    <Mic className="w-16 h-16 text-red-500 group-hover/btn:scale-110 transition-transform" />
                                                </div>
                                            </button>
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                onClick={startPanicSequence}
                                                className="px-20 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-2xl shadow-slate-950/30 active:scale-95 transition-all hover:bg-red-600"
                                            >
                                                {t.sos.initiate}
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : sosStage === 'countdown' ? (
                                    <motion.div key="countdown" className="space-y-12 py-16">
                                        <div>
                                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">{t.sos.sending} <span className="text-red-600 underline underline-offset-8 font-black">0{countdown}</span> {t.common.seconds}...</h2>
                                        </div>
                                        <div className="w-64 h-64 bg-white border border-red-500 text-red-100 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/20 relative scale-110">
                                            <div className="absolute inset-2 border-2 border-red-500 border-dashed rounded-full animate-spin-slow"></div>
                                            <Mic className="w-20 h-20 text-red-500 animate-pulse" />
                                        </div>
                                        <button
                                            onClick={cancelSOS}
                                            className="px-16 py-6 bg-white border-2 border-red-500 text-red-600 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] active:scale-95 transition-all shadow-xl shadow-red-500/10 hover:bg-red-50"
                                        >
                                            {t.sos.cancel}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div key="triggered" className="space-y-12 py-16">
                                        <div className="w-40 h-40 bg-green-50 text-green-100 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-2xl shadow-green-500/10">
                                            <Shield className="w-20 h-20 text-green-500 animate-bounce" />
                                        </div>
                                        <div>
                                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">{t.sos.completed}</h2>
                                            <p className="text-sm font-black text-gray-500 max-w-md mx-auto italic uppercase tracking-[0.2em] leading-relaxed">{t.sos.notify}</p>
                                        </div>
                                        <button
                                            onClick={() => setSosStage('idle')}
                                            className="px-12 py-4 bg-slate-50 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:text-red-500 transition-colors border border-slate-100"
                                        >
                                            {t.sos.terminate}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {helplines.map((help, idx) => (
                                <motion.button
                                    key={help.name}
                                    onClick={() => handleOneTapCall(help.num)}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                    className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-xl shadow-slate-200/40 flex flex-col items-center justify-center group hover:scale-105 transition-all outline-none"
                                >
                                    <div className={`w-16 h-16 bg-${help.color}-50 text-${help.color}-600 rounded-[1.5rem] flex items-center justify-center mb-4 group-hover:bg-${help.color}-500 group-hover:text-white transition-all shadow-inner`}>
                                        {help.icon}
                                    </div>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none">{help.num}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 text-center">{help.name}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN (4/12) - ACTION BUTTONS & TIPS */}
                    <div className="xl:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="w-full bg-white/70 backdrop-blur-2xl p-8 rounded-[3rem] border border-white flex items-center gap-6 shadow-xl shadow-slate-200/40 group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all text-left"
                            >
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-100 rounded-[1.8rem] flex items-center justify-center shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <MapPin className="w-8 h-8 text-emerald-600 group-hover:text-white" />
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-black text-slate-800 text-xl leading-none mb-2 italic">{t.sos.shareLocation}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{t.sos.secureGps} ...</p>
                                </div>
                            </motion.button>

                            <motion.button
                                onClick={toggleRecording}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`w-full p-8 rounded-[3rem] border flex items-center gap-6 shadow-xl transition-all text-left overflow-hidden ${isRecording ? 'bg-red-50 border-red-200 shadow-red-500/10' : 'bg-white/70 backdrop-blur-2xl border-white shadow-slate-200/40 hover:shadow-2xl hover:shadow-red-500/10 group'}`}
                            >
                                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-inner transition-all flex-shrink-0 ${isRecording ? 'bg-red-500 text-white' : 'bg-red-50 text-red-100 group-hover:bg-red-500 group-hover:text-white'}`}>
                                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8 text-red-600 group-hover:text-white" />}
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-xl leading-none mb-2 italic">{t.sos.voiceEvidence}</h4>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                                        {isRecording ? `${t.sos.recording} (${recordingTime}${t.common.seconds.substring(0, 1)}) - Active` : t.sos.startAudio}
                                    </p>
                                </div>
                            </motion.button>

                            <motion.button
                                onClick={() => handleOneTapCall('1800-425-0099')}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-full bg-white/70 backdrop-blur-2xl p-8 rounded-[3rem] border border-white flex items-center gap-6 shadow-xl shadow-slate-200/40 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all text-left"
                            >
                                <div className="w-16 h-16 bg-sky-50 text-sky-100 rounded-[1.8rem] flex items-center justify-center shadow-inner group-hover:bg-sky-500 group-hover:text-white transition-all overflow-hidden p-2">
                                    <Bus className="w-10 h-10 text-sky-600 group-hover:text-white -rotate-12 transition-transform group-hover:rotate-0" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-xl leading-none mb-2 italic">{t.sos.rtcControl}</h4>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.sos.tollFree}:</p>
                                        <p className="text-[11px] font-black text-slate-900 uppercase">1800-425-0099</p>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-sky-50/50 backdrop-blur-3xl rounded-[3rem] p-10 border border-sky-100/50 shadow-inner"
                        >
                            <h4 className="flex items-center gap-4 text-sm font-black text-slate-800 uppercase tracking-widest mb-8">
                                <Shield className="w-6 h-6 text-sky-600" /> {t.sos.helpline}
                            </h4>
                            <ul className="space-y-6">
                                {t.sos.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="text-xs font-black text-sky-600 bg-sky-100 w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-sky-200/50">{i + 1}</span>
                                        <p className="text-base font-medium text-slate-600 italic leading-snug">{tip}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>

                <div className="fixed bottom-12 left-0 right-0 px-6 flex justify-center pointer-events-none">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startPanicSequence}
                        className="px-24 py-7 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.3em] italic shadow-[0_30px_70px_-15px_rgba(220,38,38,0.6)] pointer-events-auto border-t border-white/30 active:shadow-inner transition-all"
                    >
                        {t.sos.trigger}
                    </motion.button>
                </div>

            </div>

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>
        </Layout>
    );
}
