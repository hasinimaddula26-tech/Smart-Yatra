import { Link } from 'react-router-dom';
import { Bus, Train, Plane, MapPin, Navigation, Search, ShieldCheck, User, School, Clock, Users, Shield, ArrowRight } from 'lucide-react';
import LayoutComponent from '../components/Layout';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState('bus');

    return (
        <LayoutComponent>
            <div className="flex flex-col space-y-20 pb-20">

                {/* HERO SECTION + GENERAL SEARCH (Screenshot 1) */}
                <div className="relative pt-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Travel Smarter With
                        <div className="text-primary mt-2">Smart Yatra</div>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg">
                        Real-time bus tracking, passenger crowd info, and intelligent alternatives. Never wait for an overcrowded bus again.
                    </p>

                    {/* General Search Card */}
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex justify-center p-4 gap-4 border-b border-gray-50">
                            <button
                                onClick={() => setActiveTab('bus')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm flex items-center transition-all ${activeTab === 'bus' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Bus className="w-4 h-4 mr-2" /> Bus
                            </button>
                            <button
                                onClick={() => setActiveTab('train')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm flex items-center transition-all ${activeTab === 'train' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Train className="w-4 h-4 mr-2" /> Train
                            </button>
                            <button
                                onClick={() => setActiveTab('flight')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm flex items-center transition-all ${activeTab === 'flight' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Plane className="w-4 h-4 mr-2" /> Flight
                            </button>
                        </div>

                        {/* Inputs */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" /> From
                                </label>
                                <div className="relative">
                                    <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none transition-all">
                                        <option>Select departure</option>
                                        <option>Kakinada</option>
                                        <option>Rajahmundry</option>
                                        <option>Vijayawada</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <Navigation className="w-3 h-3 mr-1" /> To
                                </label>
                                <div className="relative">
                                    <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none transition-all">
                                        <option>Select destination</option>
                                        <option>Visakhapatnam</option>
                                        <option>Hyderabad</option>
                                        <option>Guntur</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="px-8 pb-8">
                            <Link to="/state" state={{ tab: 'public' }} className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center">
                                <Search className="w-5 h-5 mr-2" /> Search Buses
                            </Link>
                        </div>
                    </div>
                </div>

                {/* PRAGATI COLLEGE BUS ROUTES (Screenshot 2) */}
                <div className="px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                        {/* Green Header */}
                        <div className="bg-primary p-6 text-white text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mr-3">
                                    <School className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">Pragati College Bus Routes</h2>
                            </div>
                            <p className="text-primary-foreground/80 font-medium">Quick access to Pragati Engineering College bus routes</p>
                        </div>

                        {/* Form */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" /> From
                                </label>
                                <select className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none transition-all shadow-sm">
                                    <option>Select your pickup point</option>
                                    <option>Peddapuram</option>
                                    <option>Samalkot</option>
                                    <option>Kakinada</option>
                                    <option>Rajahmundry</option>
                                    <option>Amalapuram</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <School className="w-3 h-3 mr-1" /> To
                                </label>
                                <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 flex items-center">
                                    <School className="w-5 h-5 mr-3 text-gray-400" />
                                    Pragati Engineering College
                                </div>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <Link to="/state" state={{ tab: 'college' }} className="w-full py-4 bg-[#6EE7B7] text-teal-900 rounded-xl font-bold text-lg hover:bg-[#5CD6A6] transition-colors shadow-lg shadow-teal-100 flex items-center justify-center">
                                View Bus Status <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* WHY SMART YATRA (Screenshot 3) */}
                <div className="text-center px-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Why Smart Yatra?</h2>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-card border border-gray-50 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Live GPS tracking of all buses with accurate ETA predictions using IoT sensors.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-card border border-gray-50 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Crowd Detection</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Know passenger count before boarding. Avoid overcrowded buses automatically.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-card border border-gray-50 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Emergency SOS, safety norms, and direct complaint filing to authorities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STATS FOOTER (Screenshot 3 Bottom) */}
                <div className="bg-gray-50/50 py-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-extrabold text-primary mb-1">500+</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Buses Tracked</div>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold text-primary mb-1">50K+</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Daily Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold text-primary mb-1">98%</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Accuracy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold text-primary mb-1">24/7</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Support</div>
                        </div>
                    </div>
                </div>

            </div>
        </LayoutComponent>
    );
}
