import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}
