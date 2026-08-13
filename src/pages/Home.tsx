import { Link } from 'react-router-dom';
import { Bus, Train, Plane, MapPin, Navigation, Search, Clock, Users, Shield, ArrowRight, Zap, ChevronLeft, ChevronRight, School } from 'lucide-react';
import LayoutComponent from '../components/Layout';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const STOPS = [
    "Kakinada Main Bus Stand",
    "Samalkot Junction",
    "Peddapuram",
    "Rajahmundry Pushkar Ghat",
    "Guntur RTC Complex",
    "Vijayawada PNBS",
    "Visakhapatnam (Rtc complex)",
    "Amalapuram",
    "Kakinada Port",
    "Bhanugudi Center",
    "Thimmapuram",
    "Vakalapudi",
    "Sarpavaram Junction",
    "Annavaram",
    "Tuni",
    "Ravulapalem",
    "Tanuku",
    "Eluru",
    "Hanuman Junction",
    "Jagampeta",
    "Rampachodavaram",
    "Addateegala",
    "Prathipadu",
    "Gollaprolu",
    "Pithapuram",
    "Yeleswaram",
    "Jaggampeta",
    "Mandapeta",
    "Ramachandrapuram",
    "Draksharamam",
    "Kotipalli",
    "Mummivaram",
    "Indupalli",
    "P.Gannavaram",
    "Malkipuram",
    "Razole",
    "Palakollu",
    "Narasapuram",
    "Bhimavaram",
    "Tadepalligudem",
    "Nidadavole",
    "Kovvur",
    "Dowleswaram",
    "Bomruru",
    "Diwancheruvu"
];

const COLLEGE_STOPS = [
    "Kakinada (JNTU)",
    "Pithapuram",
    "Yeleswaram",
    "Samalkot",
    "Bhanugudi",
    "Peddapuram",
    "Achampeta",
    "Kakinada Port",
    "Gollaprolu",
    "Prathipadu",
    "Annavaram",
    "Tuni",
    "Jaggampeta",
    "Gandepalli",
    "Ranganaikula Peta",
    "Sarpavaram",
    "Vakalapudi",
    "Thimmapuram",
    "Uppada",
    "Kothapalli"
];

// Carousel Data
const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop", // RTC Bus
        title: "Sthri Shakti - Empowering Journeys",
        subtitle: "Safe, secure, and dignified travel for every woman."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1920&auto=format&fit=crop", // Modern Transport
        title: "Next-Gen Public Transport",
        subtitle: "Real-time tracking and crowd analytics at your fingertips."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1474487059221-3c1d5d766e44?q=80&w=1920&auto=format&fit=crop", // Train
        title: "Seamless Multimodal Connectivity",
        subtitle: "Integrate Bus, Train, and Flight travel in one app."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1520105072000-f44fc083e50b?q=80&w=1920&auto=format&fit=crop", // Smart Station
        title: "Smart Stations - The Future of Commute",
        subtitle: "Experience high-tech boarding and real-time station diagnostics."
    }
];

export default function Home() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('bus');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const translatedSlides = slides.map((slide, index) => ({
        ...slide,
        title: t.home.slides[index].title,
        subtitle: t.home.slides[index].subtitle
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <LayoutComponent>
            {/* Immersive Background */}
            <div className="page-bg-overlay" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop')",
                opacity: 0.25
            }}></div>

            <div className="flex flex-col pb-20 space-y-16 relative z-10">

                {/* 1. HOLOGRAPHIC HERO CAROUSEL */}
                <div className="relative h-[550px] w-full rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] group border border-white/10 mx-auto">
                    {translatedSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                        >
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover brightness-[0.4]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-16">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={index === currentSlide ? { opacity: 1, x: 0 } : {}}
                                    className="max-w-3xl"
                                >
                                    <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-primary text-white text-[10px] font-black mb-6 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,180,255,0.4)]">
                                        <Zap className="w-3 h-3" /> {t.home.systemLive}
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6 drop-shadow-2xl">
                                        {slide.title}
                                    </h1>
                                    <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <Link to="/state" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20">
                                        {t.home.explore} <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    ))}

                    {/* Controls */}
                    <div className="absolute bottom-10 right-16 flex gap-4">
                        <button onClick={prevSlide} className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 transition-all flex items-center justify-center">
                            <ChevronLeft className="w-7 h-7" />
                        </button>
                        <button onClick={nextSlide} className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 transition-all flex items-center justify-center">
                            <ChevronRight className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                {/* 2. SEARCHABLE COMMAND CONSOLE */}
                <div className="max-w-6xl mx-auto w-full px-6">
                    <div className="futuristic-card p-1 shadow-2xl bg-white/95 dark:bg-slate-900/90 border-white/20">
                        <div className="scan-line opacity-20"></div>

                        {/* Tab HUD */}
                        <div className="flex bg-slate-100 dark:bg-slate-950/50 rounded-[2.2rem] p-2 gap-2">
                            {[
                                { id: 'bus', label: t.nav.stateBus, icon: <Bus className="w-4 h-4 mr-3" /> },
                                { id: 'college', label: t.nav.collegeBus, icon: <School className="w-4 h-4 mr-3" /> },
                                { id: 'train', label: t.nav.trainsFlights, icon: <Train className="w-4 h-4 mr-3" /> },
                                { id: 'flight', label: t.nav.alternatives, icon: <Plane className="w-4 h-4 mr-3" /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 dark:text-white/60 hover:text-primary dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search HUD */}
                        <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-5">
                                <label className="flex items-center gap-3 text-[11px] font-black text-primary uppercase tracking-[0.3em]">
                                    <MapPin className="w-4 h-4" /> {t.home.fromStation}
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        list="from-stops"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        placeholder={t.home.typeToSearch}
                                        className="w-full p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-3xl font-bold text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                    <datalist id="from-stops">
                                        {(activeTab === 'college' ? COLLEGE_STOPS : STOPS).map(stop => <option key={stop} value={stop} />)}
                                    </datalist>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <label className="flex items-center gap-3 text-[11px] font-black text-primary uppercase tracking-[0.3em]">
                                    <Navigation className="w-4 h-4" /> {t.home.toDestination}
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        list="to-stops"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        placeholder={t.home.typeToSearch}
                                        className="w-full p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-3xl font-bold text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                    <datalist id="to-stops">
                                        {(activeTab === 'college' ? ["Pragati Engineering College"] : STOPS).map(stop => <option key={stop} value={stop} />)}
                                    </datalist>
                                </div>
                            </div>
                        </div>

                        {/* Trigger HUD */}
                        <div className="px-12 pb-12">
                            <Link
                                to={activeTab === 'college' ? '/college' : activeTab === 'bus' ? '/state' : '/trains-flights'}
                                className="w-full py-7 bg-primary text-white rounded-3xl font-black text-xl hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/20 transition-all flex items-center justify-center group uppercase tracking-widest italic"
                            >
                                <Search className="w-7 h-7 mr-5 group-hover:scale-125 transition-transform" /> {t.home.search}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. CORE ANALYTICS CARDS */}
                <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: t.home.why.realtime.title, desc: t.home.why.realtime.desc, icon: <Clock />, color: 'primary' },
                        { title: t.home.why.crowd.title, desc: t.home.why.crowd.desc, icon: <Users />, color: 'indigo' },
                        { title: t.home.why.safety.title, desc: t.home.why.safety.desc, icon: <Shield />, color: 'red' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -12 }}
                            className="futuristic-card p-12 group bg-white/95 dark:bg-slate-900/90 shadow-xl"
                        >
                            <div className={`w-16 h-16 rounded-3xl bg-${feature.color}/10 flex items-center justify-center text-${feature.color} mb-10 border border-${feature.color}/20 group-hover:bg-primary group-hover:text-white transition-all`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-5 italic uppercase tracking-tighter">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-black text-xs leading-relaxed uppercase tracking-[0.2em]">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 4. PERFORMANCE GRID */}
                <div className="bg-white/50 dark:bg-slate-950/50 py-24 border-y border-slate-200 dark:border-white/5 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { val: '500+', label: t.home.stats.buses },
                            { val: '50K+', label: t.home.stats.users },
                            { val: '98%', label: t.home.stats.accuracy },
                            { val: '24/7', label: t.home.stats.support }
                        ].map((stat, i) => (
                            <div key={i} className="group cursor-default">
                                <div className="text-6xl font-black text-slate-900 dark:text-white italic mb-4 transition-transform group-hover:scale-110 tracking-widest">{stat.val}</div>
                                <div className="text-[11px] font-black text-primary dark:text-gray-500 uppercase tracking-[0.4em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </LayoutComponent>
    );
}
