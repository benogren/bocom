// Create this file: src/app/blog/rss.xml/route.ts
import { getBlogPosts } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.benogren.com';
    const blogUrl = `${siteUrl}/blog`;

    // Generate RSS items
    const rssItems = posts
      .map((post) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.publishedDate || post.createdTime).toUTCString();
        
        // Escape HTML entities in content
        const escapeXml = (str: string) => {
          return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        };

        const title = escapeXml(post.title);
        const description = escapeXml(post.description || '');
        
        // Generate categories (tags)
        const categories = post.tags
          .map(tag => `    <category><![CDATA[${tag.name}]]></category>`)
          .join('\n');

        return `  <item>
    <title><![CDATA[${post.title}]]></title>
    <description><![CDATA[${post.description || ''}]]></description>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <pubDate>${pubDate}</pubDate>
    <author>ben@benogren.com (Ben Ogren)</author>
${categories}
  </item>`;
      })
      .join('\n');

    // Generate complete RSS feed
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ben Ogren Blog</title>
    <description>Thoughts, insights, and updates from my journey in tech and beyond.</description>
    <link>${blogUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>ben@benogren.com (Ben Ogren)</managingEditor>
    <webMaster>ben@benogren.com (Ben Ogren)</webMaster>
    <category>Technology</category>
    <category>Product Management</category>
    <category>Business</category>
    <ttl>1440</ttl>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>Ben Ogren Blog</title>
      <link>${blogUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}