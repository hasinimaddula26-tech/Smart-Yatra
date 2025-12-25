import Layout from '../components/Layout';
import { IdCard, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function BusPass() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto pb-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Apply for Bus Pass</h1>
                    <p className="text-gray-500">Students must have a verified bus pass to board college buses.</p>
                </div>

                {!submitted ? (
                    <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Notice */}
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800 text-sm mb-6 flex items-start">
                                <div className="min-w-fit mt-0.5 mr-3">⚠️</div>
                                <p>Upload your fee receipt for verification. Only students with confirmed payments can board.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Student Name</label>
                                <input type="text" placeholder="Enter your full name" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Roll Number</label>
                                <input type="text" placeholder="e.g., 21A91A0501" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Route</label>
                                <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium">
                                    <option>Kakinada Route (Route 1)</option>
                                    <option>Samalkot Route (Route 2)</option>
                                    <option>Rajahmundry Route (Route 3)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Attach Fee Receipt</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4 group-hover:text-primary transition-colors" />
                                    <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG up to 5MB</p>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-teal-700 transition-colors">
                                Submit Application
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-2xl shadow-card border border-gray-100 text-center animate-fade-in-down">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                        <p className="text-gray-500 mb-8">Your bus pass request is under review. You will be notified once approved.</p>
                        <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline">Submit another application</button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
