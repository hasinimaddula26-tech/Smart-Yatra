import { useState } from 'react';
import Layout from '../components/Layout';
import { ShieldCheck, AlertTriangle, Building2, Phone, Mail, Upload, Send, MessageSquare } from 'lucide-react';

export default function Complaints() {
    const [issueType, setIssueType] = useState('Overcrowded Bus');
    const [reportTo, setReportTo] = useState('RTC Authority');

    const issueTypes = [
        "Overcrowded Bus", "Driver Rash Driving", "Bus Delay",
        "Conductor Misbehavior", "Unclean Bus", "Bus Breakdown",
        "Fare Overcharge", "Safety Concern", "Other"
    ];

    const authorities = [
        { name: "RTC Authority", phone: "1800-425-0099", icon: Building2 },
        { name: "Traffic Police", phone: "100", icon: ShieldCheck },
        { name: "Women Helpline", phone: "181", icon: Phone },
        { name: "Transport Ministry", phone: "1800-111-555", icon: Building2 },
    ];

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        // Using a timeout to clear it or just keeping it open
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-20 space-y-8">
                {/* SUCCESS POPUP MODAL */}
                {submitted && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative animate-in fade-in zoom-in duration-200">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Complaint Registered</h2>
                            <p className="text-gray-500 font-medium mb-8">
                                Ok, it submitted and action should be taken.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">File a Complaint</h1>
                    <p className="text-gray-500 mt-1">Report issues to the concerned authorities</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: COMPLAINT FORM (2 Cols wide) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Issue Type */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
                            <label className="block text-sm font-bold text-gray-900 mb-4">Issue Type *</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {issueTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setIssueType(type)}
                                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all text-left ${issueType === type ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Report To */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
                            <label className="block text-sm font-bold text-gray-900 mb-4">Report To *</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {authorities.map(auth => (
                                    <div
                                        key={auth.name}
                                        onClick={() => setReportTo(auth.name)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${reportTo === auth.name ? 'border-gray-800 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reportTo === auth.name ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            <auth.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{auth.name}</h4>
                                            <p className="text-xs text-gray-500">{auth.phone}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Details Form */}
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Bus Number (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., AP39 Z 1234"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Description *</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe the issue in detail..."
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Attach Photo (Optional)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Click to upload or drag and drop</p>
                                </div>
                            </div>

                            <button onClick={handleSubmit} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center">
                                <Send className="w-5 h-5 mr-2" /> Submit Complaint
                            </button>
                        </div>

                    </div>

                    {/* RIGHT: DIRECT CONTACT SIDEBAR (1 Col wide) */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-6">Direct Contact</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">RTC Authority</h4>
                                    <div className="space-y-1 text-sm text-gray-500 font-medium">
                                        <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-600" /> 1800-425-0099</p>
                                        <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-teal-600" /> complaints@apsrtc.gov.in</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-gray-900 mb-1">Traffic Police</h4>
                                    <div className="space-y-1 text-sm text-gray-500 font-medium">
                                        <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-600" /> 100</p>
                                        <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-teal-600" /> traffic@appolice.gov.in</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-gray-900 mb-1">Women Helpline</h4>
                                    <div className="space-y-1 text-sm text-gray-500 font-medium">
                                        <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-600" /> 181</p>
                                        <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-teal-600" /> shebox@ap.gov.in</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-gray-900 mb-1">Transport Ministry</h4>
                                    <div className="space-y-1 text-sm text-gray-500 font-medium">
                                        <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-600" /> 1800-111-555</p>
                                        <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-teal-600" /> transport@ap.gov.in</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                            <h4 className="font-bold text-amber-900 flex items-center mb-2">
                                <AlertTriangle className="w-5 h-5 mr-2" /> Important
                            </h4>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                For immediate emergencies, please call 112 or use the SOS feature. Complaints are typically addressed within 24-48 hours.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
