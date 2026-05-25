'use client';
import { useEffect, useState } from 'react';
import { oswald } from './fonts';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Rss, Twitter } from 'lucide-react';
import Header from './components/Header';
import Projects from './components/Projects';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    console.log('Initial scrollY:', scrollY);
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
          <div className="container max-w-7xl mx-auto px-8 pt-8">
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
                  Hey, thanks for stopping by! I&apos;m a senior product leader &ndash; I build and scale 0-to-1 products in enterprise SaaS and, more recently, AI. The question I keep coming back to: is there a there there? Most of my career has been spent turning messy, technical capabilities into things people will actually use (... and pay for!) Right now I&apos;m tinkering with a lot of AI products.
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
              Where I&apos;ve Had Impact
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Three things I&apos;ve gotten good at &ndash; and the throughline across every product I&apos;ve shipped.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Product Leadership */}
              <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>AI Product Leadership</h3>
                <p className="text-gray-600 text-sm italic mb-4">Building agentic AI products end-to-end &ndash; from architecture through enterprise rollout.</p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Shipped an agentic AI financial product &ndash; a multi-agent system for fraud and anomaly detection, validated with enterprise customers through an Early Adopter program</li>
                  <li>• Built the evals framework underpinning agent quality &ndash; multi-model LLM-as-judge consensus (Claude / Gemini / OpenAI) for production scoring</li>
                  <li>• Founded Candor, an AI-powered feedback platform &ndash; recruiting enterprise pilot customers and an Advisory Board of senior people leaders</li>
                  <li>• Featured in Lenny&apos;s Newsletter for a consumer AI product I built solo</li>
                </ul>
              </div>

              {/* 0-to-1 Product Building */}
              <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>0-to-1 Product Building</h3>
                <p className="text-gray-600 text-sm italic mb-4">Launching new products from concept to GA, in enterprise SaaS and consumer.</p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Built and launched products from 0-to-1 across enterprise SaaS (Workday, Galvanize) and a steady stream of independent side projects &ndash; some AI, some not</li>
                  <li>• Ran early adopter programs across multiple 0-to-1 products &ndash; partnering with enterprise customers to validate product-market fit and figure out what to build, ship, and cut</li>
                  <li>• Built strategic partnerships with enterprise customers to unlock new revenue</li>
                  <li>• Designed AI/ML recommendation systems matching workforce supply to demand based on skills and performance signals</li>
                </ul>
              </div>

              {/* Enterprise Platform Scale */}
              <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6">
                <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>Enterprise Platform Scale</h3>
                <p className="text-gray-600 text-sm italic mb-4">Running large cross-functional orgs and shipping at enterprise scale.</p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Led large cross-functional orgs spanning engineering, product, design, data, and ML &ndash; distributed across multiple global locations</li>
                  <li>• Scaled enterprise financial reporting to serve thousands of customers and billions of journal lines annually</li>
                  <li>• Drove performance and scale improvements that turned slow batch reporting into real-time analytics for enterprise customers</li>
                  <li>• Repeatedly exceeded company-level OKRs through customer-facing UX redesigns that meaningfully cut the time customers spent on routine workflows</li>
                </ul>
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
              So &ndash; what now? I&apos;m looking for the next thing, and I&apos;m open about what that could be: a senior product role, fractional work, or consulting. Where I tend to do my best work is somewhere that lives at the intersection of an interesting technical problem and real customer pain &ndash; usually with a team that&apos;s still figuring out their steel thread. If that sounds like you, let me know &ndash; I&apos;d love to chat!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Mail className="inline-block ml-1" />, text: "ben@ogren.me", href: "mailto:ben@benogren.com" },
                { icon: <Linkedin className="inline-block ml-1" />, text: "LinkedIn", href: "https://www.linkedin.com/in/benogren" },
                { icon: <Twitter className="inline-block ml-1" />, text: "Text Me", href: "https://x.com/benogren" },
                { icon: <Github className="inline-block ml-1" />, text: "GitHub", href: "https://github.com/benogren" }
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
                      : contact.href.includes('github.com')
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
            <iframe src="https://benogren.substack.com/embed" width="480" height="150" style={{ margin: '0 auto' }} frameBorder="0" scrolling="no"></iframe>
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