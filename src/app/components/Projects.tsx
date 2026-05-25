import { oswald } from '../fonts';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
              Recent Projects
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              I learn best by doing. Reading about new AI capabilities only gets you so far &ndash; the only way I&apos;ve found to actually understand them is to build with them. So here&apos;s what I&apos;ve been tinkering with.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Cards */}
              {[
                {
                  icon: "/citato-icon.png",
                  title: "Citato",
                  subtitle: "AI Newsletter Aggregator",
                  description: "What if your newsletter inbox felt like TikTok? I built an email aggregator that summarizes newsletters into a swipeable feed, with vector embeddings doing the personalization heavy lift to keep it relevant.",
                  tags: ["Vector Embeddings", "Flutter", "Next.js", "OpenAI", "Supabase"],
                  url: "https://www.citato.ai"
                },
                {
                  icon: "/choresai-icon.png",
                  title: "ChoresAI",
                  subtitle: "AI Family Management",
                  description: "My kids fight me on chores – so I built an app where AI verifies the chore actually got done (photo check) and suggests age-appropriate tasks. Got picked up in Lenny's Newsletter, which was a fun surprise.",
                  tags: ["Image Recognition", "Swift", "Claude", "OpenAI", "Supabase"],
                  url: "https://www.chores-ai.com"
                },
                {
                  icon: "/candor-icon.png",
                  title: "Candor",
                  subtitle: "AI-Powered 360 Feedback",
                  description: "Most 360 feedback is a forms-filling slog. Candor uses conversational AI agents to actually interview people, then runs sentiment analysis across the responses – built end-to-end with enterprise-grade auth.",
                  tags: ["Conversational AI", "OpenAI", "ElevenLabs", "Enterprise", "Next.js", "Supabase"],
                  url: "https://www.candor.so"
                }
              ].map((project, index) => (
                <Link key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div
                    className="group h-full flex flex-col bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center mb-4">
                      <Image 
                        src={`${project.icon}`} 
                        alt={project.title} 
                        width={50} 
                        height={50} 
                        className="rounded-md"
                      />
                    <div className='ml-4'>
                      <h3 className={`${oswald.className} text-base text-benblue-500 uppercase`}>
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm italic">{project.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link 
                href="https://benogren.substack.com/t/projects"
                target='_blank'
                className="px-8 py-3 bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-benblue-500/20 hover:-translate-y-0.5"
              >
                Read More
              </Link>
            </div>
          </div>
        </section>
    );
}