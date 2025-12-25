import { useState } from 'react';
import Layout from '../components/Layout';
import { Shield, BookOpen, UserCheck, AlertTriangle, CheckCircle2, User, Truck } from 'lucide-react';

export default function Norms() {
    const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');

    return (
        <Layout>
            <div className="max-w-5xl mx-auto pb-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Safety Norms & Guidelines</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Rules and regulations for safe travel. Ensure compliance to avoid penalties.
                    </p>
                </div>

                {/* Emergency Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                    {[
                        { name: 'Police', num: '100', color: 'bg-blue-50 text-blue-700' },
                        { name: 'Women Helpline', num: '181', color: 'bg-pink-50 text-pink-700' },
                        { name: 'Ambulance', num: '108', color: 'bg-red-50 text-red-700' },
                        { name: 'Fire', num: '101', color: 'bg-orange-50 text-orange-700' },
                        { name: 'RTC Control', num: '1800-425-0099', color: 'bg-green-50 text-green-700' },
                    ].map(item => (
                        <div key={item.name} className={`${item.color} p-4 rounded-xl text-center border border-white shadow-sm`}>
                            <p className="text-xs font-bold uppercase opacity-80">{item.name}</p>
                            <p className="text-lg font-black">{item.num}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setActiveTab('passenger')}
                            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center ${activeTab === 'passenger' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <User className="w-4 h-4 mr-2" /> Passenger Guidelines
                        </button>
                        <button
                            onClick={() => setActiveTab('driver')}
                            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center ${activeTab === 'driver' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Truck className="w-4 h-4 mr-2" /> Driver Guidelines
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTab === 'passenger' ? (
                        <>
                            <NormCard number="1" title="Queue Discipline" desc="Board bus in proper queue formation." penalty="Denied entry" type="warning" />
                            <NormCard number="2" title="Reserved Seats" desc="Priority seats for elderly, disabled, pregnant women." penalty="Fine: ₹500" type="danger" />
                            <NormCard number="3" title="No Overcrowding" desc="Do not board if bus is full." penalty="Safety hazard" type="warning" />
                            <NormCard number="4" title="Valid Ticket/Pass" desc="Always carry valid ticket or college bus pass." penalty="Fine: ₹500 + Fare" type="danger" />
                            <NormCard number="5" title="No Smoking" desc="Smoking strictly prohibited on bus." penalty="Fine: ₹1000" type="danger" />
                            <NormCard number="6" title="Emergency Exit" desc="Keep emergency exits clear at all times." penalty="Fine: ₹500" type="warning" />
                            <NormCard number="7" title="Student ID" desc="Students boarding college bus must have ID." penalty="Denied entry" type="info" />
                        </>
                    ) : (
                        <>
                            <NormCard number="1" title="Speed Limit" desc="Do not exceed 50 km/h in restricted zones." penalty="License Suspension" type="danger" />
                            <NormCard number="2" title="Uniform" desc="Must wear proper uniform while on duty." penalty="Fine: ₹200" type="warning" />
                            <NormCard number="3" title="No Alcohol" desc="Strict zero tolerance policy for alcohol." penalty="Termination" type="danger" />
                            <NormCard number="4" title="Stops" desc="Stop only at designated bus stops." penalty="Fine: ₹500" type="warning" />
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

function NormCard({ number, title, desc, penalty, type }: { number: string, title: string, desc: string, penalty: string, type: 'warning' | 'danger' | 'info' }) {
    const colors = {
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        danger: 'bg-red-50 text-red-700 border-red-200',
        info: 'bg-blue-50 text-blue-700 border-blue-200'
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 flex flex-col relative overflow-hidden group hover:border-gray-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold ${colors[type].split(' ')[0]} ${colors[type].split(' ')[1]}`}>{number}</span>
                {title}
            </h3>
            <p className="text-gray-500 mb-4 flex-1 text-sm">{desc}</p>
            <div className={`text-xs font-bold px-3 py-2 rounded-lg border inline-block self-start ${colors[type]}`}>
                Violation: {penalty}
            </div>
        </div>
    );
}
