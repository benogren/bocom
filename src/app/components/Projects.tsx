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
              During my sabbatical, I set out to build AI products from concept to production to deepen my technical understanding of emerging AI capabilities and their product applications.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Cards */}
              {[
                {
                  icon: "/citato-icon.png",
                  title: "Citato",
                  subtitle: "AI Newsletter Aggregator",
                  description: "Built an email integration platform that summarizes newsletters in a TikTok-style feed and used vector embeddings for personalized recommendations.",
                  tags: ["Vector Embeddings", "Flutter", "Next.js", "OpenAI", "Supabase"],
                  url: "https://www.citato.ai"
                },
                {
                  icon: "/choresai-icon.png",
                  title: "ChoresAI",
                  subtitle: "AI Family Management",
                  description: "Leveraged OpenAI for chore verification and AI-driven age-appropriate task recommendations. Featured in Lenny's Newsletter.",
                  tags: ["Image Recognition", "Swift", "Claude", "OpenAI", "Supabase"],
                  url: "https://www.chores-ai.com" 
                },
                {
                  icon: "/candor-icon.png",
                  title: "Candor",
                  subtitle: "AI-Powered 360 Feedback",
                  description: "Built comprehensive feedback platform with conversational AI agents for interactive feedback collection and used OpenAI for sentiment analysis.",
                  tags: ["Conversational AI", "OpenAI", "ElevenLabs", "Enterprise", "Next.js", "Supabase"],
                  url: "https://www.candor.so"
                }
              ].map((project, index) => (
                <Link key={index} href={project.url} target="_blank" rel="noopener noreferrer">
                  <div 
                    className="group bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
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
                  <p className="text-gray-600 mb-6 leading-relaxed">
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