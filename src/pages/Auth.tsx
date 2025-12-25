import { useState } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // MOCK AUTH for Demo
        // In real app: signInWithEmailAndPassword(auth, email, password)
        alert("Demo Login Successful!");
        navigate('/');
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <User className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p className="text-gray-500 text-sm mt-2">
                            {isLogin ? 'Sign in to access your saved routes' : 'Join Smart Yatra today'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    placeholder="student@pragati.ac.in"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center group">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        {/* Google Sign In Fake Button for Points */}
                        <button className="w-full flex items-center justify-center border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors mb-4">
                            <div className="font-bold text-primary mr-1">G</div>
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>

                        <p className="text-sm text-gray-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
