import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Mic, Phone, ShieldAlert, MapPin, Siren } from 'lucide-react';

export default function SOS() {
    const [isListening, setIsListening] = useState(false);
    const [sosActive, setSosActive] = useState(false);

    const toggleListening = () => {
        setIsListening(!isListening);
        // Simulate voice detection logic
        if (!isListening) {
            setTimeout(() => {
                alert("Voice Simulated: 'HELP' detected!");
                setSosActive(true);
            }, 3000);
        }
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto pb-12 text-center">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-red-600 mb-2 flex items-center justify-center">
                        <Siren className="w-8 h-8 mr-3 animate-pulse" /> Emergency Help
                    </h1>
                    <p className="text-gray-500">Quick access to emergency services</p>
                </div>

                {/* Voice SOS Section */}
                <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Voice Activated SOS</h2>
                    <p className="text-sm text-gray-500 mb-6">Say "HELP" or "BACHAO" to activate</p>

                    <button
                        onClick={toggleListening}
                        className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all ${isListening ? 'bg-red-100 animate-pulse ring-4 ring-red-200' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        <Mic className={`w-10 h-10 ${isListening ? 'text-red-600' : 'text-gray-400'}`} />
                    </button>
                    <button onClick={toggleListening} className="px-6 py-2 bg-gray-900 text-white rounded-full font-bold text-sm">
                        {isListening ? 'Listening...' : 'Start Voice SOS'}
                    </button>

                    <div className="mt-8 flex justify-center gap-2 flex-wrap">
                        {['HELP', 'BACHAO', 'MADAD', 'SOS', 'EMERGENCY'].map(word => (
                            <span key={word} className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500 border border-gray-200">{word}</span>
                        ))}
                    </div>
                </div>

                {/* Main SOS Button */}
                <div className="bg-red-50 p-8 rounded-2xl border border-red-100 mb-8">
                    <button
                        onClick={() => setSosActive(true)}
                        className="w-40 h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-red-300 mx-auto transform transition-transform hover:scale-105 active:scale-95 border-4 border-red-200"
                    >
                        <span className="text-4xl font-black text-white tracking-widest">SOS</span>
                        <span className="text-[10px] text-white/80 font-bold mt-1 uppercase">Press for Help</span>
                    </button>
                    {sosActive && (
                        <div className="mt-6 animate-fade-in">
                            <p className="text-red-600 font-bold mb-4 animate-pulse">Sending Emergency Alert...</p>
                            <div className="flex gap-4 justify-center">
                                <button className="flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg shadow-sm border border-gray-200 font-bold text-sm">
                                    <MapPin className="w-4 h-4 mr-2" /> Share Location
                                </button>
                                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm font-bold text-sm">
                                    <Phone className="w-4 h-4 mr-2" /> Call Emergency
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Helplines Grid */}
                <h3 className="font-bold text-gray-900 mb-4 text-left">Emergency Helplines</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: 'Police', num: '100', icon: '👮' },
                        { name: 'Women Helpline', num: '181', icon: '👩' },
                        { name: 'Ambulance', num: '108', icon: '🚑' },
                        { name: 'Fire', num: '101', icon: '🚒' },
                        { name: 'RTC Control', num: '1800-425-0099', icon: '🚌' },
                        { name: 'Emergency', num: '112', icon: '🚨' },
                    ].map(item => (
                        <a href={`tel:${item.num}`} key={item.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-red-200 transition-colors">
                            <div className="text-left">
                                <p className="text-xs text-gray-500 font-bold uppercase">{item.name}</p>
                                <p className="text-lg font-black text-gray-900">{item.num}</p>
                            </div>
                            <span className="text-2xl">{item.icon}</span>
                        </a>
                    ))}
                </div>

                {/* Safety Tips */}
                <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 text-left">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                        <ShieldAlert className="w-5 h-5 mr-2" /> Safety Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>1. Stay calm and assess the situation</li>
                        <li>2. Move to a safe location if possible</li>
                        <li>3. Share your live location with family</li>
                        <li>4. Note bus number and current location</li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
