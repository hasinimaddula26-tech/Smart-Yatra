import { useState } from 'react';
import Layout from '../components/Layout';
import { Train, Plane, Calendar, ArrowRight, User } from 'lucide-react';

const TRAINS = [
    { id: 't1', name: 'Guntur Intercity Express', number: '12739', type: '2S', from: 'Vijayawada', to: 'Guntur', dep: '06:15 AM', arr: '07:00 AM', duration: '45 min', seats: 120, status: 'On Time', price: 55 },
    { id: 't2', name: 'Amaravati Express', number: '17225', type: 'SL', from: 'Hyderabad', to: 'Guntur', dep: '05:30 AM', arr: '11:00 AM', duration: '5h 30m', seats: 85, status: 'On Time', price: 245 },
    { id: 't3', name: 'Vijayawada Express', number: '12727', type: '3A', from: 'Chennai', to: 'Vijayawada', dep: '10:00 PM', arr: '06:30 AM', duration: '8h 30m', seats: 45, status: 'Delayed', price: 420 },
    { id: 't4', name: 'Godavari Express', number: '12727', type: 'CC', from: 'Visakhapatnam', to: 'Vijayawada', dep: '07:00 AM', arr: '12:30 PM', duration: '5h 30m', seats: 65, status: 'On Time', price: 310 },
    { id: 't5', name: 'Satavahana Express', number: '17205', type: '2S', from: 'Secunderabad', to: 'Guntur', dep: '06:00 AM', arr: '11:45 AM', duration: '5h 45m', seats: 95, status: 'On Time', price: 195 },
    { id: 't6', name: 'Krishna Express', number: '12785', type: 'SL', from: 'Tirupati', to: 'Vijayawada', dep: '09:30 PM', arr: '05:00 AM', duration: '7h 30m', seats: 30, status: 'On Time', price: 380 },
];

export default function TrainsFlights() {
    const [activeTab, setActiveTab] = useState<'trains' | 'flights'>('trains');

    return (
        <Layout>
            <div className="max-w-5xl mx-auto pb-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Trains & Flights</h1>
                    <p className="text-gray-500">Book trains and flights for your journey</p>
                </div>

                {/* Date Picker Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Calendar className="text-primary w-5 h-5" />
                        <span className="font-bold text-gray-700">Travel Date:</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg border border-primary/20">Today</button>
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 font-bold rounded-lg border border-gray-200 hover:bg-gray-100">Tomorrow</button>
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 font-bold rounded-lg border border-gray-200 hover:bg-gray-100">Choose Date</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex mb-8 bg-gray-100 p-1 rounded-xl w-full md:w-fit mx-auto">
                    <button
                        onClick={() => setActiveTab('trains')}
                        className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center ${activeTab === 'trains' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Train className="w-4 h-4 mr-2" /> Trains
                    </button>
                    <button
                        onClick={() => setActiveTab('flights')}
                        className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center ${activeTab === 'flights' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Plane className="w-4 h-4 mr-2" /> Flights
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'trains' ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h2 className="font-bold text-gray-900">Available Trains</h2>
                            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">6 trains available for today</span>
                        </div>

                        {TRAINS.map(train => (
                            <div key={train.id} className="bg-white rounded-xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-all group">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    {/* Left: Info */}
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between mb-2">
                                            <h3 className="font-bold text-lg text-gray-900">{train.name}</h3>
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">{train.number}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{train.dep}</p>
                                                <p className="text-xs">{train.from}</p>
                                            </div>
                                            <div className="flex flex-col items-center px-4">
                                                <span className="text-xs text-gray-400 mb-1">{train.duration}</span>
                                                <div className="w-20 h-[1px] bg-gray-300 relative">
                                                    <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-gray-300"></div>
                                                    <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-gray-300"></div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900 text-lg">{train.arr}</p>
                                                <p className="text-xs">{train.to}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-xs font-bold">
                                            <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">{train.type}</span>
                                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">{train.seats} seats</span>
                                            <span className={`${train.status === 'On Time' ? 'text-green-600' : 'text-red-500'}`}>{train.status}</span>
                                        </div>
                                    </div>

                                    {/* Right: Price & Action */}
                                    <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto gap-4 pl-0 md:pl-6 md:border-l border-gray-100">
                                        <div className="text-center">
                                            <span className="text-2xl font-bold text-primary">₹{train.price}</span>
                                            <p className="text-xs text-gray-400">per person</p>
                                        </div>
                                        <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-teal-700 transition-colors w-full md:w-auto">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <Plane className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No Flights Available</h3>
                        <p className="text-gray-500">There are no direct flights for this route today.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
