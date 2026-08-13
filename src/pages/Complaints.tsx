import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import {
    MessageSquare,
    ShieldCheck,
    RefreshCw,
    Mail,
    Bus,
    User,
    Trash2,
    CheckCircle,
    Upload,
    AlertTriangle,
    CheckCircle2,
    Phone,
    ShieldAlert,
    PhoneCall,
    Building2,
    Send,
    Loader2
} from 'lucide-react';
import circuitBg from '../assets/circuit_bg.png';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Complaints() {
    const { currentUser } = useAuth();
    const { t } = useLanguage();
    const isAuthority = currentUser?.email === 'hasinimaddula26@gmail.com';

    const [selectedIssue, setSelectedIssue] = useState('Overcrowded Bus');
    const [selectedAuthority, setSelectedAuthority] = useState('RTC Authority');
    const [busNumber, setBusNumber] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);
    const [ticketId, setTicketId] = useState('');

    const issueTypes = [
        t.complaints.issues.overcrowded, t.complaints.issues.rashDriving, t.complaints.issues.delay,
        t.complaints.issues.misbehavior, t.complaints.issues.unclean, t.complaints.issues.breakdown,
        t.complaints.issues.fare, t.complaints.issues.safety, t.complaints.issues.other
    ];

    const reportTo = [
        { name: t.complaints.authorities.rtc, phone: '1800-425-0099', icon: <Bus className="w-5 h-5" /> },
        { name: t.complaints.authorities.traffic, phone: '100', icon: <ShieldAlert className="w-5 h-5" /> },
        { name: t.complaints.authorities.women, phone: '181', icon: <PhoneCall className="w-5 h-5" /> },
        { name: t.complaints.authorities.transport, phone: '1800-111-355', icon: <Building2 className="w-5 h-5" /> }
    ];

    useEffect(() => {
        if (isAuthority) {
            fetchComplaints();
        }
    }, [isAuthority]);

    const fetchComplaints = async () => {
        setFetching(true);
        try {
            const { data, error } = await supabase
                .from('complaints')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComplaints(data || []);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newTicketId = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
            const { error } = await supabase
                .from('complaints')
                .insert([{
                    ticket_id: newTicketId,
                    issue_type: selectedIssue,
                    authority: selectedAuthority,
                    bus_number: busNumber,
                    description: description,
                    status: 'Pending',
                    user_email: currentUser?.email || 'Anonymous',
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;

            setTicketId(newTicketId);
            setIsSubmitted(true);
            setBusNumber('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id: string, authorityName: string) => {
        try {
            const { error } = await supabase
                .from('complaints')
                .update({ status: 'Resolved' })
                .eq('id', id);

            if (error) throw error;

            // Show alert to user indicating who resolved it (as requested: "after the authority resolved u need to tell the user whom they filed the issue")
            alert(`Issue successfully resolved by ${authorityName} Authority.`);

            fetchComplaints();
        } catch (error) {
            console.error('Error resolving complaint:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this report?')) return;
        try {
            const { error } = await supabase
                .from('complaints')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchComplaints();
        } catch (error) {
            console.error('Error deleting complaint:', error);
        }
    };

    return (
        <Layout>
            <div
                className="min-h-screen -mt-20 pt-32 pb-20 px-6 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${circuitBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-[2px]"></div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
                            <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter italic uppercase leading-none mb-2 text-primary">{t.complaints.title}</h1>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] leading-none">{t.complaints.subtitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-8">

                            {/* Issue Types Grid */}
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                    {t.complaints.issueType} <span className="text-red-500">*</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {issueTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={(e) => { e.preventDefault(); setSelectedIssue(type); }}
                                            className={`py-4 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all text-left border ${selectedIssue === type
                                                ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Authorities Grid */}
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                    {t.complaints.reportTo} <span className="text-red-500">*</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {reportTo.map((auth) => (
                                        <button
                                            key={auth.name}
                                            onClick={(e) => { e.preventDefault(); setSelectedAuthority(auth.name); }}
                                            className={`p-5 rounded-2xl border transition-all flex items-center gap-4 text-left group ${selectedAuthority === auth.name
                                                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className={`p-4 rounded-2xl transition-all ${selectedAuthority === auth.name ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/10 text-gray-400 group-hover:text-emerald-400'}`}>
                                                {auth.icon}
                                            </div>
                                            <div>
                                                <p className={`font-black text-xs uppercase tracking-widest mb-1 ${selectedAuthority === auth.name ? 'text-emerald-400' : 'text-gray-300'}`}>{auth.name}</p>
                                                <p className="text-[9px] font-bold text-gray-500 tracking-[0.2em]">{auth.phone}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Form Area */}
                            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>

                                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-10 italic uppercase border-b border-gray-100 dark:border-white/5 pb-6">{t.complaints.new}</h2>

                                <form onSubmit={handleSubmit} className="space-y-10">
                                    {/* Issue Type is selected via the buttons above, we don't need a manual input field for it because it's already set in state when clicking the buttons */}

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.complaints.busNumber || "Bus Number (Optional)"}</label>
                                        <input
                                            type="text"
                                            value={busNumber}
                                            onChange={(e) => setBusNumber(e.target.value)}
                                            placeholder="e.g., AP 39 Z 1234"
                                            className="w-full px-8 py-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold dark:text-white uppercase"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.complaints.description}</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Describe your issue in detail..."
                                            className="w-full px-8 py-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold dark:text-white resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">{t.complaints.attachPhoto}</label>
                                        <div className="w-full py-12 border-2 border-dashed border-white/60 rounded-[2rem] bg-white/30 flex flex-col items-center justify-center gap-4 hover:bg-white/40 cursor-pointer transition-all text-white">
                                            <Upload className="w-10 h-10 drop-shadow-md" />
                                            <p className="text-xs font-black uppercase tracking-[0.2em]">Click to upload or drag and drop</p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-6 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all disabled:opacity-50 active:scale-95"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                        {t.complaints.submit}
                                    </button>
                                </form>
                            </div>

                            {isAuthority && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] border border-white/40 shadow-2xl mt-12"
                                >
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
                                                <ShieldCheck className="w-8 h-8 text-teal-600" />
                                                Authority Console
                                            </h2>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Live Complaint Management System</p>
                                        </div>
                                        <button
                                            onClick={fetchComplaints}
                                            className="p-3 bg-gray-50 hover:bg-teal-50 text-gray-400 hover:text-teal-600 rounded-2xl transition-all"
                                        >
                                            <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin' : ''}`} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {complaints.length === 0 ? (
                                            <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                                                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-sm font-bold text-gray-400 italic">No reports found on the server</p>
                                            </div>
                                        ) : (
                                            complaints.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                                                >
                                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <span className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-lg tracking-widest">{item.ticket_id}</span>
                                                                <span className={`px-3 py-1 ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} text-[10px] font-black rounded-lg tracking-widest uppercase`}>
                                                                    {item.status}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                                    {new Date(item.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <h4 className="text-lg font-black text-gray-900 mb-2">{item.issue_type}</h4>
                                                            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">{item.description}</p>
                                                            <div className="flex flex-wrap gap-4">
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase">
                                                                    <Bus className="w-4 h-4" /> {item.bus_number || 'No Bus Info'}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400">
                                                                    <User className="w-4 h-4" /> {item.user_email}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase bg-teal-50 px-2 py-1 rounded-md text-teal-700">
                                                                    <ShieldCheck className="w-3 h-3" /> Reported To: {item.authority}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex md:flex-col justify-end gap-2">
                                                            {item.status !== 'Resolved' && (
                                                                <button
                                                                    onClick={() => handleResolve(item.id, item.authority)}
                                                                    className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                                                                >
                                                                    <CheckCircle className="w-4 h-4" /> Resolve
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-[#fef9c3]/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-[#fef08a] shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <AlertTriangle className="w-20 h-20 text-amber-900" />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                                    <h3 className="text-lg font-black text-amber-900 uppercase tracking-tighter italic">Important</h3>
                                </div>
                                <p className="text-sm font-bold text-amber-900/70 leading-relaxed italic">
                                    For immediate emergencies, please call <span className="underline decoration-2">112</span> or use the **SOS feature**. Complaints are typically addressed within 24-48 hours.
                                </p>
                                <p className="text-[10px] font-black text-amber-900/30 mt-6 uppercase tracking-widest">complaint@aprtc.gov.in</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 shadow-xl space-y-12">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">RTC Authority</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-teal-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm font-black tracking-widest italic">100</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span className="text-[11px] font-bold tracking-tight">traffic@appolice.gov.in</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Traffic Police</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-teal-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm font-black tracking-widest italic">100</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span className="text-[11px] font-bold tracking-tight">traffficx@ap.gov.in</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Transport Ministry</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-teal-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm font-black tracking-widest italic">1800-111-555</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span className="text-[11px] font-bold tracking-tight">transport@ap.gov.in</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="p-8 bg-black rounded-[2.5rem] shadow-2xl text-white border border-white/10"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Track Complaint</p>
                                            <CheckCircle2 className="w-5 h-5 text-teal-500" />
                                        </div>
                                        <h5 className="text-xl font-black italic tracking-tighter mb-2 underline decoration-teal-500 decoration-4 underline-offset-8">Ticket #{ticketId}</h5>
                                        <div className="flex items-center gap-3 mt-8">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                            <span className="text-xs font-black uppercase tracking-widest text-[#f59e0b]">Status: Pending Review</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-bold mt-4 italic">Ticket logged in Supabase Database. Authorities have been alerted.</p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="mt-8 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
