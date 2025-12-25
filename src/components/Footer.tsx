import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <Bus className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-xl text-gray-900">Smart Yatra</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Next-gen transport solution for Pragati Engineering College. Leveraging IoT and GPS for a seamless commute.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/state" className="hover:text-primary transition-colors">Live Tracking</Link></li>
                            <li><Link to="/college" className="hover:text-primary transition-colors">College Bus</Link></li>
                            <li><Link to="/alternatives" className="hover:text-primary transition-colors">Find Alternatives</Link></li>
                            <li><Link to="/norms" className="hover:text-primary transition-colors">Safety Norms</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/complaints" className="hover:text-primary transition-colors">File a Complaint</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Lost & Found</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
                            <li><Link to="/auth" className="hover:text-primary transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                <span>Pragati Engineering College,<br />Surampalem, E.G. Dist.</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                <span>transport@pragati.ac.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; Smart Yatra. Making transportation smarter for everyone.</p>
                    <p>made by SmartYatrians</p>
                </div>
            </div>
        </footer>
    );
}
