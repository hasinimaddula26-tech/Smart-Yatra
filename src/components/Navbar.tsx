import { Link, useLocation } from 'react-router-dom';
import { Bus, Plane, School, Menu, X, User, ShieldCheck, BookOpen, Train, IdCard, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Live Bus', path: '/state', icon: <Bus className="w-4 h-4 mr-2" /> },
        { name: 'Alternatives', path: '/alternatives', icon: <Plane className="w-4 h-4 mr-2" /> },
        { name: 'Trains & Flights', path: '/trains-flights', icon: <Train className="w-4 h-4 mr-2" /> },
        { name: 'Bus Pass', path: '/bus-pass', icon: <IdCard className="w-4 h-4 mr-2" /> },
        { name: 'Complaints', path: '/complaints', icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
        { name: 'Norms', path: '/norms', icon: <BookOpen className="w-4 h-4 mr-2" /> },
        { name: 'SOS', path: '/sos', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <Bus className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">Smart Yatra</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Links - Pill Style */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${location.pathname === item.path
                                    ? 'text-primary bg-secondary'
                                    : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Login Button - Gradient */}
                    <div className="hidden md:flex">
                        <Link to="/auth" className="flex items-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-teal-500 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:scale-95">
                            <User className="w-4 h-4 mr-2" />
                            Login
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 absolute w-full top-20 left-0 shadow-xl">
                    <div className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-xl text-base font-bold ${location.pathname === item.path
                                    ? 'text-primary bg-secondary'
                                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                        <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-white font-bold mt-4 shadow-lg shadow-primary/20">
                            <User className="w-4 h-4 mr-2" />
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
