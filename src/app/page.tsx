'use client';
import { useEffect, useState } from 'react';
import { oswald } from './fonts';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, Twitter } from 'lucide-react';
import Header from './components/Header';
import Projects from './components/Projects';

export default function Home() {
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800">
        {/* Header */}
        <Header />
        

        <section className="bg-white">
          <div className="container mx-auto px-18 pt-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">

                {/* Main Headline */}
                <div className="space-y-6">
                  <div className={`${oswald.className} text-base text-benblue-500 mb-4 uppercase`}>
                    Product Leader &bull; Tinkerer &bull; Dad
                  </div>
                  <h2 className={`text-4xl lg:text-5xl font-normal bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase leading-tight ${oswald.className}`}>
                    Hi, I&apos;m Ben!
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Thank you for visiting my site! I am a product leader with over 15 years of experience building and scaling 0-to-1 products across enterprise SaaS and emerging technologies. My career has been dedicated to transforming complex technical capabilities into market-ready solutions that drive meaningful business outcomes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => scrollToSection('experience')}
                    className="px-8 py-3 bg-gradient-to-r from-benblue-500 to-benblue-600 text-white rounded-full font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-benblue-500/30"
                  >
                    View Experience
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-benblue-500/20 hover:-translate-y-0.5"
                  >
                    Get In Touch
                  </button>
                </div>
                

              </div>

              {/* Right Column - Phone Mockups */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full">
                    <Image
                      src="/ben-illustration.png"
                      alt="Ben Ogren"
                      width={750}
                      height={591}
                      className='cover object-contain max-w-full h-auto'
                    />  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
              Product Leadership Experience
            </h2>
            <div className="space-y-12">
              {/* Workday */}
              <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>Workday</h3>
                    <p className="text-benblue-500 font-semibold">Director of Product Management</p>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">Leading enterprise cloud applications for Fortune 500 companies</p>
                  </div>
                  <div className="text-gray-500 font-medium">2018 - 2025</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className={`${oswald.className} text-base text-benblue-500 mb-4 uppercase`}>Recent Leadership Roles</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• <strong>Resource Scheduling:</strong> Led ML recommendation systems for workforce optimization for the professional services market</li>
                      <li>• <strong>Financial Reporting:</strong> Drove 45% efficiency improvements serving all Financial Management customers</li>
                      <li>• <strong>Content Platform:</strong> Managed global teams across US, Ireland, and Germany for 1.5M+ daily document generation requests</li>
                      <li>• <strong>Productivity Suite:</strong> Built 3 products from 0-to-1 during tenure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`${oswald.className} text-base text-benblue-500 mb-4 uppercase`}>Leadership Impact</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Led cross-functional organizations of <strong>100+ members</strong></li>
                      <li>• Prepared strategic updates for <strong>C-suite</strong> as part of company-wide strategic initiatives</li>
                      <li>• Drove go-to-market for new enterprise SKUs</li>
                      <li>• Validated product-market fit with early adopter customers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Other Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                  <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>Spex</h3>
                  <p className="text-benblue-500 font-semibold text-sm mb-2">VP of Product</p>
                  <p className="text-gray-600 text-sm mb-4">Enterprise field inspection platform for P&C Insurance</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Board-level product strategy and quarterly presentations</li>
                    <li>• Partnered with Lyft to reduce inspection cycle times by <strong>96%</strong></li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                  <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>Ibotta</h3>
                  <p className="text-benblue-500 font-semibold text-sm mb-2">Senior Product Manager</p>
                  <p className="text-gray-600 text-sm mb-4">Leading mobile shopping app with millions of users</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Owned mobile e-commerce generating <strong>$1.5M daily GMV</strong></li>
                    <li>• Reduced customer acquisition cost by <strong>38%</strong></li>
                    <li>• Managed strategic partnerships (Button integration)</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                  <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>Galvanize</h3>
                  <p className="text-benblue-500 font-semibold text-sm mb-2">Director of Product</p>
                  <p className="text-gray-600 text-sm mb-4">Technical bootcamp and coworking company</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Launched Galvanize Talent achieving <strong>30% of all job placements</strong></li>
                    <li>• Scaled from first technical hire to full product organization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link 
                href="/resume"
                target='_blank'
                className="px-8 py-3 bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-benblue-500/20 hover:-translate-y-0.5"
              >
                Download Full Resume
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white/50 border-t border-blue-100">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
              Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Open to senior product leadership, consulting, or fractional product opportunities where I can drive strategic initiatives, build high-performing teams, and transform emerging technologies into scalable products.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Mail className="inline-block ml-1" />, text: "ben@ogren.me", href: "mailto:ben@benogren.com" },
                { icon: <Linkedin className="inline-block ml-1" />, text: "LinkedIn", href: "https://www.linkedin.com/in/benogren" },
                { icon: <Twitter className="inline-block ml-1" />, text: "Text Me", href: "https://x.com/benogren" }
              ].map((contact, index) => (
                <a 
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300"
                  {
                    ...(contact.href.includes('linkedin.com')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : contact.href.includes('x.com')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})
                  }
                >
                  <span className="text-base">
                    {contact.icon}
                  </span>
                  {/* <span className="font-medium">{contact.text}</span> */}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .font-oswald {
          font-family: 'Oswald', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .animate-float-delayed-2 {
          animation: float 6s ease-in-out infinite 4s;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at 30% 50%, rgba(74, 144, 226, 0.05) 0%, transparent 50%);
        }
      `}</style>
    </>
  );
}