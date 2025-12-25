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
    text: "Hello! I'm the Smart Yatra AI Assistant. \n\nI can help you with:\n• Bus timings & Routes\n• Finding alternatives\n• Reporting issues\n\nHow can I help you today?",
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

        // Simulate Gemini API Call (Replace with real API call if key is available)
        // We use a simulation here for stability during the hackathon demo
        setTimeout(() => {
            let responseText = "I can help with that. Please check the 'Live Bus' tab for real-time tracking.";

            const lowerInput = userMsg.text.toLowerCase();
            if (lowerInput.includes('bus') && (lowerInput.includes('late') || lowerInput.includes('where'))) {
                responseText = "Bus **AP 39 Z 1234** is currently on time. It is near **Madhavpatnam** and will reach college in **15 mins**.";
            } else if (lowerInput.includes('ticket') || lowerInput.includes('pass')) {
                responseText = "You can renew your bus pass in the **College Bus** section. Your current pass is valid until **Dec 31, 2024**.";
            } else if (lowerInput.includes('complaint') || lowerInput.includes('report')) {
                responseText = "I can help you file a complaint. Please navigate to the **Complaints** page or tell me the issue here.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseText = "Hello! How can I assist your journey to Pragati Engineering College today?";
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setLoading(false);
        }, 1500);
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
