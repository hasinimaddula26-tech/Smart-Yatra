import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, Shield, Heart, Siren, AlertCircle, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GlobalSOS() {
    const [isOpen, setIsOpen] = useState(false);

    const emergencyContacts = [
        { name: 'Police', number: '100', icon: <Shield className="w-5 h-5" />, color: 'bg-blue-600' },
        { name: 'Women Help', number: '181', icon: <Heart className="w-5 h-5" />, color: 'bg-pink-600' },
        { name: 'Ambulance', number: '108', icon: <Siren className="w-5 h-5" />, color: 'bg-red-600' }
    ];

    return (
        <div className="fixed bottom-[136px] right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
                        className="mb-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(220,38,38,0.3)] border border-red-500/10 p-8 min-w-[320px] overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Siren className="w-32 h-32 text-red-600 -rotate-12" />
                        </div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-500/40 text-white">
                                    <AlertCircle className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-1">Safety Hub</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rapid response enabled</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {emergencyContacts.map((contact) => (
                                <a
                                    key={contact.name}
                                    href={`tel:${contact.number}`}
                                    className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group border border-transparent hover:border-gray-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl text-white shadow-lg ${contact.color}`}>
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{contact.name}</p>
                                            <p className="text-lg font-black text-gray-900 italic tracking-tighter">{contact.number}</p>
                                        </div>
                                    </div>
                                    <Phone className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
                                </a>
                            ))}

                            <Link
                                to="/sos"
                                onClick={() => setIsOpen(false)}
                                className="w-full mt-4 py-6 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-xl shadow-red-500/30 transition-all hover:scale-[1.02] active:scale-95 text-xs"
                            >
                                <MapPin className="w-5 h-5 animate-pulse" /> Launch Console
                            </Link>
                        </div>

                        <div className="mt-6 text-center relative z-10">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Live GPS Syncing (Kakinada)
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all relative group shadow-red-500/20 ${isOpen ? 'bg-gray-900 text-white' : 'bg-white text-red-600 border border-red-500/20'}`}
            >
                <div className={`relative ${!isOpen && 'animate-bounce'}`}>
                    {isOpen ? <X className="w-6 h-6" /> : <LifeBuoy className="w-6 h-6" />}
                    {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>}
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] italic">SOS</span>

                {!isOpen && (
                    <div className="absolute -top-12 right-0 bg-red-600 text-white text-[9px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest shadow-xl whitespace-nowrap">
                        Emergency Help
                        <div className="absolute -bottom-1 right-8 w-2 h-2 bg-red-600 rotate-45"></div>
                    </div>
                )}
            </motion.button>
        </div>
    );
}
