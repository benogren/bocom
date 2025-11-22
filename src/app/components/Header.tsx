'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { oswald } from '../fonts';

export default function Header() {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    interface ScrollToSection {
        (sectionId: string): void;
    }

    const scrollToSection: ScrollToSection = (sectionId) => {
        const element: HTMLElement | null = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header 
            className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg border-b border-blue-100 ${
            scrollY > 100 ? 'bg-white/98' : 'bg-white/95'
            }`}
        >
            <nav className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
                <Link 
                    href="/"
                    className={`text-xl text-benblue-500 uppercase ${oswald.className} hover:text-benblue-600 transition-colors`}
                >
                    Ben Ogren
                </Link>
                <ul className="hidden md:flex space-x-8">
                    <li>
                        <button 
                            onClick={() => scrollToSection('experience')}
                            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium relative group"
                        >
                            Experience
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('projects')}
                            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium relative group"
                        >
                            Projects
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </li>
                    <li>
                        <Link 
                            href="https://benogren.substack.com/"
                            target="_blank"
                            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium relative group"
                        >
                            Blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium relative group"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}