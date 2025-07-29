// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/notion';
import BlockRenderer from '../../components/blog/BlockRenderer';
import BlogHeader from '@/app/components/blog/BlogHeader';
import BlogFooter from '@/app/components/blog/BlogFooter';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
    <BlogHeader />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <article className="container px-4 py-22 max-w-4xl mx-auto">
        <Link 
            href="/blog" 
            className="text-xs inline-flex items-center text-gray-600 hover:text-benblue-500/80 transition-colors mb-8"
            >
            <ChevronLeft className="w-3 h-3 mr-1" />
            Back to all posts
        </Link>
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center text-xs text-gray-600 mb-6">
            <time dateTime={post.publishedDate || post.createdTime}>
              {new Date(post.publishedDate || post.createdTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        {/* ACTUAL CONTENT RENDERING - This is the key part! */}
        <div className="prose prose-lg max-w-none text-gray-600">
          {post.content && post.content.length > 0 ? (
            post.content.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600">
                No content available for this post.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
                  className="px-3 py-1 bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 rounded-full text-xs font-medium transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          <Link 
            href="/blog" 
            className="text-xs inline-flex items-center text-gray-600 hover:text-benblue-500/80 transition-colors mb-8"
          >
            <ChevronLeft className="w-3 h-3 mr-1" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
    <BlogFooter />
    </>
  );
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}