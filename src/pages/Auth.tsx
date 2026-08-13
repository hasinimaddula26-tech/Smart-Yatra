import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { currentUser, login } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Mock login bypass
            await login(email);
            navigate('/');
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            // Mock google login
            await login('google_user@gmail.com');
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Google Sign In Failed');
            setLoading(false);
        }
    }

    return (
        <Layout>
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                    style={{
                        backgroundImage: "url('/transit_bg.png')",
                        filter: "brightness(0.6)"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-black/60 pointer-events-none" />

                {/* Motion Blur Shapes */}
                <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg"
                >
                    <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden group">
                        {/* Decorative glass shine */}
                        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-10 transition-transform duration-1000" />

                        <div className="text-center mb-10 relative">
                            <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                                <User className="w-10 h-10 text-white shadow-sm" />
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
                                {isLogin ? t.auth.welcome : t.auth.createAccount}
                            </h1>
                            <p className="text-white/70 text-lg mt-3 font-medium">
                                {isLogin ? 'Your smart travel starts here' : 'Join the future of urban transit'}
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-red-500/20 backdrop-blur-md text-red-100 rounded-2xl text-sm font-semibold border border-red-500/30 flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-6 relative">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-white/80 ml-1 uppercase tracking-wider">{t.auth.email}</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <Mail className="text-white/40 group-focus-within:text-white transition-colors w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-white/30 focus:bg-white/10 focus:ring-0 transition-all outline-none text-lg font-medium"
                                        placeholder="user@smart-yatra.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-white/80 ml-1 uppercase tracking-wider">{t.auth.password}</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <Lock className="text-white/40 group-focus-within:text-white transition-colors w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-white/30 focus:bg-white/10 focus:ring-0 transition-all outline-none text-lg font-medium"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-primary py-4 rounded-2xl font-black text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group mt-8 overflow-hidden relative"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        <span className="relative z-10">{isLogin ? t.auth.signIn : t.auth.signUp}</span>
                                        <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1 relative z-10" />
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center relative">
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl transition-all mb-6 text-white font-bold"
                            >
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary text-xs font-black shadow-sm">G</div>
                                <span>{t.auth.continueGoogle}</span>
                            </button>

                            <p className="text-white/60 font-medium">
                                {isLogin ? t.auth.noAccount : t.auth.haveAccount}{' '}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-white font-black hover:underline underline-offset-4"
                                >
                                    {isLogin ? t.auth.signUp : t.auth.signIn}
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
