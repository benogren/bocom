// src/app/blog/page.tsx - SERVER COMPONENT (no 'use client')
import { getBlogPosts } from '@/lib/notion';
import { BlogPost } from '@/types/notion';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

// SEO metadata with RSS discovery
export const metadata: Metadata = {
  title: 'Blog - Ben Ogren',
  description: 'Thoughts, insights, and updates from my journey in tech and beyond.',
  openGraph: {
    title: 'Blog - Ben Ogren',
    description: 'Thoughts, insights, and updates from my journey in tech and beyond.',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
};

// SERVER COMPONENT - Only handles data fetching
export default async function BlogPage() {

  console.log('Environment check:', {
    hasNotionKey: !!process.env.NOTION_API_KEY,
    hasDbId: !!process.env.NOTION_BLOG_DATABASE_ID,
    keyStart: process.env.NOTION_API_KEY?.substring(0, 10)
  });

  let posts: BlogPost[] = [];
  let allTags: Array<{ name: string; color: string; count: number }> = [];
  
  try {
    posts = await getBlogPosts();
    
    // Calculate tag counts
    const tagMap = new Map<string, { name: string; color: string; count: number }>();
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (tagMap.has(tag.name)) {
          tagMap.get(tag.name)!.count++;
        } else {
          tagMap.set(tag.name, { name: tag.name, color: tag.color, count: 1 });
        }
      });
    });
    
    allTags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
    
    console.log('Server: Successfully fetched', posts.length, 'posts and', allTags.length, 'tags');
  } catch (error) {
    console.error('Error in BlogPage server component:', error);
    // Fallback to empty data if there's an error
  }
  
  return <BlogPageClient initialPosts={posts} allTags={allTags} />;
}