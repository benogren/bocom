// Create this file: src/app/blog/tag/[tag]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getBlogPosts } from '@/lib/notion';
import { oswald } from '@/app/fonts';
import BlogHeader from '@/app/components/blog/BlogHeader';
import BlogFooter from '@/app/components/blog/BlogFooter';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  // Get all posts and filter by tag
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter(post => 
    post.tags.some(postTag => postTag.name.toLowerCase() === decodedTag.toLowerCase())
  );

  if (posts.length === 0) {
    notFound();
  }

  // Get the tag info from the first post
  const tagInfo = posts[0].tags.find(postTag => 
    postTag.name.toLowerCase() === decodedTag.toLowerCase()
  );

  return (
    <>
      <BlogHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="pt-20">
            {/* Back Button */}
            <Link 
              href="/blog" 
              className="text-xs inline-flex items-center text-gray-600 hover:text-benblue-500/80 transition-colors mb-8"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Back to all posts
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              {/* <div className="flex justify-center mb-4">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                  {tagInfo?.name || decodedTag}
                </span>
              </div> */}
              <h2 className={`text-4xl lg:text-5xl font-normal bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase leading-tight ${oswald.className}`}>
                Posts tagged &quot;{tagInfo?.name || decodedTag}&quot;
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {posts.length} post{posts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((postTag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-medium rounded-full transition-colors bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 group-hover:bg-benblue-500/20`}>
                              {postTag.name}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                      
                      {/* Date */}
                      <div className="text-xs text-gray-500">
                        {new Date(post.publishedDate || post.createdTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Related Tags */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(
                  allPosts.flatMap(post => post.tags.map(tag => tag.name))
                    .filter(tagName => tagName.toLowerCase() !== decodedTag.toLowerCase())
                )).slice(0, 10).map((otherTag) => (
                  <Link
                    key={otherTag}
                    href={`/blog/tag/${encodeURIComponent(otherTag.toLowerCase())}`}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {otherTag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogFooter />
    </>
  );
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag.name.toLowerCase());
    });
  });
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}