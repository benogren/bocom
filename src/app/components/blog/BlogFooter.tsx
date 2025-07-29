import Link from 'next/link';
import { Linkedin, RssIcon, Twitter } from 'lucide-react';

export default function BlogFooter() {
    return (
    <footer className="bg-white text-slate-500 py-10">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-xs">
                    &copy; {new Date().getFullYear()} Ben Ogren. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <Link href="https://twitter.com/benogren/" target='_blank'>
                        <Twitter className="h-6 w-6 text-gray-400 hover:text-benblue-600 transition-colors" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/benogren/" target='_blank'>
                        <Linkedin className="h-6 w-6 text-gray-400 hover:text-benblue-600 transition-colors" />
                    </Link>
                    <Link href="/blog/rss.xml" target='_blank'>
                        <RssIcon className="h-6 w-6 text-gray-400 hover:text-benblue-600 transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    </footer>
    )
}