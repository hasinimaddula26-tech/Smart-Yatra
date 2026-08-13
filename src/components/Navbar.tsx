import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Plane, Menu, X, User, ShieldCheck, BookOpen, Train, IdCard, AlertTriangle, Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    const navItems = [
        { name: t.nav.stateBus, path: '/state', icon: <Bus className="w-4 h-4" /> },
        { name: t.nav.trainsFlights, path: '/trains-flights', icon: <Train className="w-4 h-4" /> },
        { name: t.nav.alternatives, path: '/alternatives', icon: <Plane className="w-4 h-4" /> },
        { name: t.nav.busPass, path: '/bus-pass', icon: <IdCard className="w-4 h-4" /> },
        { name: t.nav.complaints, path: '/complaints', icon: <ShieldCheck className="w-4 h-4" /> },
        { name: t.nav.norms, path: '/norms', icon: <BookOpen className="w-4 h-4" /> },
    ];

    return (
        <nav className="sticky top-0 z-[100] transition-all duration-500">
            {/* Holographic Border Top */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

            <div className="bg-white/70 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 dark:border-teal-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                    <div className="flex justify-between h-20 items-center">

                        {/* Logo Section */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform">
                                    <Bus className="w-7 h-7 text-slate-100" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl dark:holographic-text text-slate-900 dark:text-white tracking-tighter italic">
                                        {t.home.title}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-5 py-2.5 rounded-2xl transition-all group ${location.pathname === item.path
                                        ? 'text-primary'
                                        : 'text-gray-500 hover:text-primary transition-colors'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    {location.pathname === item.path && (
                                        <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"></motion.div>
                                    )}
                                </Link>
                            ))}

                            {/* SPECIAL SOS BUTTON */}
                            <Link
                                to="/sos"
                                className={`ml-4 flex items-center gap-2 px-6 py-2.5 rounded-2xl border transition-all ${location.pathname === '/sos'
                                    ? 'bg-red-500 text-white border-red-500 shadow-[0_10px_20px_rgba(255,0,60,0.3)]'
                                    : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white'}`}
                            >
                                <AlertTriangle className={`w-4 h-4 ${location.pathname !== '/sos' && 'animate-pulse'}`} />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">{t.nav.sos}</span>
                            </Link>
                        </div>

                        {/* Controls Section */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* Language Toggle */}
                            <div className="relative group">
                                <button className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary transition-all">
                                    <Globe className="w-5 h-5" />
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-900 backdrop-blur-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 z-50">
                                    {(['en', 'te', 'hi'] as const).map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => setLanguage(lang)}
                                            className={`w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${language === lang ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 dark:hover:text-white'}`}
                                        >
                                            {lang === 'en' ? 'English' : lang === 'te' ? 'Telugu' : 'Hindi'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/50 transition-all"
                            >
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>

                            <div className="h-10 w-[1px] bg-white/10 mx-2"></div>

                            {/* Auth Button */}
                            {currentUser ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/30 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,60,0.1)]"
                                >
                                    <LogOut className="w-4 h-4 mr-2 inline" />
                                    {t.nav.logout}
                                </button>
                            ) : (
                                <Link to="/auth" className="px-8 py-3 rounded-2xl bg-teal-500 text-slate-900 text-xs font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(0,242,255,0.3)] hover:scale-105 transition-all">
                                    <User className="w-4 h-4 mr-2 inline" />
                                    {t.auth.signIn}
                                </Link>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex lg:hidden items-center gap-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden bg-slate-900 border-t border-white/10 overflow-hidden"
                        >
                            <div className="p-6 space-y-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${location.pathname === item.path
                                            ? 'text-teal-400 bg-teal-500/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="mr-4">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                                <Link onClick={() => setIsOpen(false)} to="/sos" className="flex items-center px-5 py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/30 text-xs font-black uppercase tracking-widest">
                                    <AlertTriangle className="mr-4 w-4 h-4 animate-pulse" />
                                    {t.nav.sos}
                                </Link>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <button onClick={toggleTheme} className="py-4 rounded-2xl bg-white/5 text-teal-400 flex items-center justify-center">
                                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    </button>
                                    {currentUser ? (
                                        <button onClick={handleLogout} className="py-4 rounded-2xl bg-red-500/10 text-red-500 font-black uppercase text-xs tracking-widest">
                                            Logout
                                        </button>
                                    ) : (
                                        <Link to="/auth" onClick={() => setIsOpen(false)} className="py-4 rounded-2xl bg-teal-500 text-slate-900 font-black uppercase text-xs tracking-widest text-center">
                                            Login
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
