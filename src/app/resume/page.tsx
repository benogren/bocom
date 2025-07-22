'use client';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { oswald } from '../fonts';

export default function ResumeLandingPage() {
    
    useEffect(() => {
        // Redirect to the Google Docs link
        window.location.href = 'https://drive.google.com/file/d/1TtJRtVZDesKw4wWwz63_5TPgFR3U7sFu/view?usp=sharing'; // Replace with your actual Google Docs link
    }, []);
    
    return (
        <div className='container mx-auto text-center p-4'>
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <LoaderCircle className="animate-spin mx-auto my-4 text-gray-300" size={32} />
                <div className={`${oswald.className} text-base text-benblue-500 mb-4 uppercase`}>
                    Redirecting to the resume...
                </div>
            </div>
        </div>
    );
}