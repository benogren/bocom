import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/notion';

export async function GET() {
  try {
    // Test our Notion connection
    const posts = await getBlogPosts();
    
    return NextResponse.json({
      success: true,
      message: `Successfully connected to Notion! Found ${posts.length} published posts.`,
      posts: posts.map(post => ({
        title: post.title,
        slug: post.slug,
        description: post.description?.substring(0, 100) + '...',
        tags: post.tags.map(tag => tag.name),
        publishedDate: post.publishedDate,
      }))
    });
  } catch (error) {
    console.error('Notion API test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Notion',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}