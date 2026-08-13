import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
    id: 'init',
    text: "Hello! I'm the Smart Yatra AI Assistant. \n\nI can help you with:\n• Bus timings & Routes\n• Pragati College Buses\n• Finding alternatives\n• Reporting issues\n\nHow can I help you today?",
    isUser: false,
    timestamp: new Date()
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Smart Simulated Intelligence
        setTimeout(() => {
            let responseText = "I'm here to help with your journey. Could you specify?";
            const lowerInput = userMsg.text.toLowerCase();

            // KNOWLEDGE BASE SIMULATION

            // 1. GREETINGS & INTRO
            if (lowerInput.match(/\b(hi|hello|hey|greetings|namaste|start|who are you)\b/)) {
                responseText = "Namaste! 🙏 I am your Smart Yatra AI Assistant. I can help you track buses, report issues, find alternative transport, and keep you safe. How can I assist you today?";
            }

            // 2. BUS STATUS & LIVE TRACKING
            else if (lowerInput.match(/\b(track|where|live|location|gps|status|arrive|schedule|late|delay)\b/) && lowerInput.match(/\b(bus|transport)\b/)) {
                responseText = "📍 **Live Tracking**: You can view real-time GPS locations of all active buses on the **State Bus** or **College Bus** pages.\nExpected arriving buses near you show their ETA and current capacity. Would you like me to guide you there?";
            }
            else if (lowerInput.match(/\b(ap 39|bus 1234|bus 9012)\b/)) {
                responseText = "Real-time Update: Bus **AP 39 Z 1234** is On Time. It's currently at **Madhavpatnam Junction** and will arrive in **12 mins**. Crowd level is **Moderate**.";
            }

            // 3. SAFETY, SOS & EMERGENCIES
            else if (lowerInput.match(/\b(safe|sos|help|police|danger|scared|emergency|accident|harassment)\b/)) {
                responseText = "🚨 **EMERGENCY ASSISTANCE**: Your safety is our priority.\n1. Tap the RED **SOS Button** on the top or bottom right immediately.\n2. It alerts nearby police stations and sends your live GPS coordinates.\n3. Can I dial **100** or the **Women's Helpline (181)** for you right now?";
            }

            // 4. TICKETS, PASSES & FARES
            else if (lowerInput.match(/\b(ticket|pass|renew|cost|price|fare|pay|buy|qr)\b/)) {
                responseText = "🎫 **Tickets & Passes**:\n• You can securely renew or buy a Monthly/Weekly Bus Pass in the **Bus Pass** section.\n• Each pass has an encrypted **IoT Signature** (QR code) for easy scanning when you board.";
            }

            // 5. COMPLAINTS & GRIEVANCES
            else if (lowerInput.match(/\b(complaint|report|driver|rash|rude|misbehave|dirty|issue|broken)\b/)) {
                responseText = "I'm sorry you are experiencing this. We have zero tolerance for misconduct or poor service.\n\n📝 Please file a formal report in the **Complaints** tab. You can instantly send it to the **RTC Authority**, **Traffic Police**, or **Transport Ministry**. Action will be taken within 24 hours.";
            }

            // 6. CROWD PREDICTION & RUSH
            else if (lowerInput.match(/\b(crowd|rush|full|empty|seat|stand|space)\b/)) {
                responseText = "You can view live passenger counts on the map!\n\n💡 **Smart Insight**: Morning buses (8:00 AM - 9:30 AM) are usually 90% full. If you tap on any bus marker on the map, it will tell you exactly how many seats are left.";
            }

            // 7. MULTIMODAL ALTERNATIVES (TRAINS/FLIGHTS)
            else if (lowerInput.match(/\b(train|flight|cab|auto|alternative|booking|far|long distance)\b/)) {
                responseText = "We offer seamless multimodal connectivity!\n\n🚆 **Trains**: Check live IRCTC statuses.\n✈️ **Flights**: Compare local airport departures.\n\nVisit the **Trains & Flights** page from the Navigation Menu to explore alternatives if your bus is delayed.";
            }

            // 8. GOVERNMENT SCHEMES & NORMS
            else if (lowerInput.match(/\b(scheme|government|govt|free|mahila|rules|norms|guidelines|sthri|shakti)\b/)) {
                responseText = "📜 **Norms & Schemes**: Under initiatives like **Sthri Shakti**, the government provides priority seating, subsidized passes, and enhanced CCTV security for women.\n\nYou can read all the passenger rights and safety protocols in the **Norms** page.";
            }

            // 9. PRAGATI ENGINEERING COLLEGE - GENERAL
            else if (lowerInput.match(/\b(pragati|college|engineering|student|campus)\b/)) {
                responseText = "🎓 **Pragati Engineering College** Bus Service:\n\n📍 **3 Main Routes Active:**\n• Route 1: Kakinada Main (08:45 AM)\n• Route 2: Samalkot (08:50 AM)\n• Route 3: Rajahmundry (08:30 AM)\n\nCheck the **College Bus** page to track them live!";
            }

            // 10. SPECIFIC COLLEGE ROUTES
            else if (lowerInput.match(/\b(kakinada|route 1|jaggannaickpur|main road|bhanugudi|madhavpatnam)\b/)) {
                responseText = "🚌 **Route 1: Kakinada Main (Pragati College)**\n\n📍 Stops: Jaggannaickpur → Main Road → Bhanugudi → Madhavpatnam\n⏰ ETA: **08:45 AM**\nStatus: Running smoothly today!";
            }
            else if (lowerInput.match(/\b(samalkot|route 2|railway station|bus stand|peddapuram)\b/)) {
                responseText = "🚌 **Route 2: Samalkot (Pragati College)**\n\n📍 Stops: Railway Station → Bus Stand → Peddapuram Road\n⏰ ETA: **08:50 AM**\nTrack it live on the College Bus map.";
            }
            else if (lowerInput.match(/\b(rajahmundry|route 3|kambala|lala|rajanagaram)\b/)) {
                responseText = "🚌 **Route 3: Rajahmundry (Pragati College)**\n\n📍 Stops: Kambala Cheruvu → Lala Cheruvu → Rajanagaram\n⏰ ETA: **08:30 AM** (Earliest arrival).";
            }

            // 11. COLLEGE PASS & ID SCANNING
            else if (lowerInput.match(/\b(scan|student pass|college pass|id|verification|verify)\b/)) {
                responseText = "🎫 **Student Bus Pass Verification:**\nYour IoT Student ID is securely synced. Just tap your ID card on the **IoT Signature Grid** scanner inside the **College Bus** dashboard to verify your boarding instantly.";
            }

            // 12. LOST AND FOUND
            else if (lowerInput.match(/\b(lost|found|missed|forget|forgot|bag|phone|wallet|item)\b/)) {
                responseText = "🎒 **Lost & Found**:\nDid you leave something behind? Don't worry!\n1. Submit a ticket in the **Complaints** section.\n2. Select 'Lost & Found' or mention it in the description.\n3. Include your Bus Number and Route. The depot manager will contact you if it's found.";
            }

            // 13. APP FEATURES & NAVIGATION
            else if (lowerInput.match(/\b(app|features|what can you do|how to use|dashboard)\b/)) {
                responseText = "📱 **Smart Yatra Features**:\n- **State Bus**: Live tracking of public buses.\n- **College Bus**: Track Pragati institution buses.\n- **Complaints**: Direct grievance reporting to authorities.\n- **Bus Pass**: Digital IoT pass generation.\n- **SOS**: One-tap emergency broadcast.";
            }

            // FALLBACK - HELPFUL REDIRECTION
            else {
                responseText = "I'm still learning about that! You can try asking about:\n• Live Bus Routes\n• Emergency SOS\n• Complaints System\n• Bus Passes or Train tickets\n• Lost & Found.";
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setLoading(false);
        }, 1200);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-teal-600 to-emerald-500'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-accordion-down h-[500px]">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-4 flex items-center justify-between">
                        <div className="flex items-center text-white">
                            <div className="bg-white/20 p-2 rounded-lg mr-3">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Smart Assistant</h3>
                                <p className="text-teal-100 text-xs flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                    Powered by Gemini
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                {!msg.isUser && (
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0 border border-teal-200">
                                        <Bot className="w-4 h-4 text-teal-700" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isUser
                                        ? 'bg-teal-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'
                                        }`}
                                >
                                    <p className="whitespace-pre-line">{msg.text}</p>
                                    <span className={`text-[10px] block mt-1 opacity-70 ${msg.isUser ? 'text-teal-100' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0">
                                    <Bot className="w-4 h-4 text-teal-700" />
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 flex items-center space-x-2">
                                    <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                                    <span className="text-xs text-gray-500 font-medium">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about bus timings..."
                                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-teal-200"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
