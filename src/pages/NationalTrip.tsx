import Layout from '../components/Layout';
import { Bus, Train, Car, Clock, Users, AlertTriangle, Star, Zap, IndianRupee, ArrowRight, ThumbsUp, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NationalTrip() {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-20 space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Alternative Transport</h1>
                    <p className="text-gray-500 mt-1">Smart suggestions based on current conditions</p>
                </div>

                {/* 1. CURRENT BUS STATUS ALERT (Red) */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Current Bus Status</h3>
                        <p className="text-gray-600 mt-1 mb-3">
                            Bus <span className="font-bold text-gray-900">AP 39 Z 5678</span> is currently overcrowded (52/50 passengers) and running 15 minutes late.
                        </p>
                        <div className="flex gap-2">
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-lg flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div> Overcrowded
                            </span>
                            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-lg flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div> Delayed
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. RECOMMENDED BANNER (Blue) */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Train className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-yellow-300 fill-current" /> Recommended: Guntur Intercity Train
                            </h3>
                            <p className="text-blue-100 text-sm mt-1">Faster, cheaper, and comfortable with 45 seats available</p>
                        </div>
                    </div>
                    <Link to="/trains-flights" className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm">
                        Book Now
                    </Link>
                </div>

                {/* 3. AVAILABLE OPTIONS GRID */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">All Available Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Option 1: RTC Deluxe */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-teal-50 p-3 rounded-xl">
                                        <Bus className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">RTC Deluxe</h4>
                                        <p className="text-xs text-gray-500 font-bold">10:30 AM <ArrowRight className="w-3 h-3 inline mx-1" /> 11:15 AM</p>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div> On Time
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-gray-500 pl-16">
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 45 min</span>
                                <span className="flex items-center text-gray-900"><IndianRupee className="w-4 h-4" /> 45</span>
                                <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> 12 seats</span>
                            </div>
                        </div>

                        {/* Option 2: Train (Best Option) */}
                        <div className="bg-blue-50 p-6 rounded-2xl shadow-card border border-blue-100 hover:shadow-lg transition-all relative overflow-hidden">
                            <div className="absolute top-0 left-0 bg-teal-700 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl flex items-center">
                                <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" /> Best Option
                            </div>
                            <div className="flex justify-between items-start mb-4 mt-2">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <Train className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Guntur Intercity</h4>
                                        <p className="text-xs text-gray-500 font-bold">10:45 AM <ArrowRight className="w-3 h-3 inline mx-1" /> 11:20 AM</p>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div> On Time
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-gray-500 pl-16">
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 35 min</span>
                                <span className="flex items-center text-gray-900"><IndianRupee className="w-4 h-4" /> 35</span>
                                <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> 45 seats</span>
                            </div>
                        </div>

                        {/* Option 3: Cab */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-50 p-3 rounded-xl">
                                        <Car className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Ola/Uber</h4>
                                        <p className="text-xs text-gray-500 font-bold">Now <ArrowRight className="w-3 h-3 inline mx-1" /> ~11:00 AM</p>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div> On Time
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-gray-500 pl-16">
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 30 min</span>
                                <span className="flex items-center text-gray-900"><IndianRupee className="w-4 h-4" /> 350</span>
                            </div>
                        </div>

                        {/* Option 4: RTC Ordinary */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-50 p-3 rounded-xl">
                                        <Bus className="w-6 h-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">RTC Ordinary</h4>
                                        <p className="text-xs text-gray-500 font-bold">11:00 AM <ArrowRight className="w-3 h-3 inline mx-1" /> 12:00 PM</p>
                                    </div>
                                </div>
                                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center">
                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div> Delayed
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-gray-500 pl-16">
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 60 min</span>
                                <span className="flex items-center text-gray-900"><IndianRupee className="w-4 h-4" /> 30</span>
                                <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> 5 seats</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 4. QUICK DECISION FOOTER */}
                <div>
                    <h3 className="font-bold text-gray-900 flex items-center mb-4">
                        <div className="bg-yellow-100 p-1 rounded mr-2"><Zap className="w-4 h-4 text-yellow-600" /></div>
                        Quick Decision
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                                <Timer className="w-5 h-5" />
                            </div>
                            <div className="font-bold text-gray-900">Fastest</div>
                            <div className="text-xs text-gray-500">Cab (30 min)</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                                <IndianRupee className="w-5 h-5" />
                            </div>
                            <div className="font-bold text-gray-900">Cheapest</div>
                            <div className="text-xs text-gray-500">RTC Ordinary (₹30)</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 mx-auto bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-3">
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <div className="font-bold text-gray-900">Best Value</div>
                            <div className="text-xs text-gray-500">Train (₹35, 35min)</div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}
