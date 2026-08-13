import Layout from '../components/Layout';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BusPass() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto pb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">{t.busPass.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{t.busPass.subtitle}</p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-primary"></div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-6 rounded-2xl flex items-start group">
                                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-4 shrink-0 mt-0.5 group-hover:rotate-12 transition-transform" />
                                    <p className="text-xs text-amber-800 dark:text-amber-500/80 font-bold uppercase tracking-wide leading-relaxed">
                                        {t.busPass.notice}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-primary transition-colors">{t.busPass.name}</label>
                                        <input
                                            type="text"
                                            placeholder={t.busPass.namePlaceholder}
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-primary transition-colors">{t.busPass.roll}</label>
                                        <input
                                            type="text"
                                            placeholder={t.busPass.rollPlaceholder}
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold dark:text-white uppercase"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-primary transition-colors">{t.busPass.route}</label>
                                        <select className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold dark:text-white appearance-none">
                                            {t.college.routes?.map((route: string, idx: number) => (
                                                <option key={idx}>{route}</option>
                                            )) || (
                                                    <>
                                                        <option>Route 1: Kakinada Main</option>
                                                        <option>Route 2: Samalkot</option>
                                                        <option>Route 3: Rajahmundry</option>
                                                    </>
                                                )}
                                        </select>
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-primary transition-colors">{t.busPass.upload}</label>
                                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group shadow-inner bg-gray-50/50 dark:bg-gray-900/50 relative overflow-hidden">
                                            <Upload className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4 group-hover:text-primary group-hover:scale-110 transition-all" />
                                            <p className="text-xs text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest mb-1">{t.busPass.uploadDesc}</p>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tight">{t.busPass.uploadLimit}</p>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/30 hover:bg-emerald-600 transition-all transform active:scale-[0.98]">
                                    {t.busPass.submit}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 p-16 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 rotate-3 group hover:rotate-0 transition-transform shadow-xl">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{t.busPass.successTitle}</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-10 font-bold leading-relaxed">{t.busPass.successDesc}</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-8 py-4 bg-gray-50 dark:bg-gray-900 text-primary dark:text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all border border-primary/20"
                            >
                                {t.busPass.applyAnother}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
