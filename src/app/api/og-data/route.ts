// Create this file: src/app/api/og-data/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  siteName?: string;
}

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&apos;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Blog-Bot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse Open Graph and meta tags
    const ogData: OpenGraphData = { url };

    // Extract title
    const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"[^>]*>/i) ||
                      html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) {
      ogData.title = decodeHtmlEntities(titleMatch[1].trim());
    }

    // Extract description
    const descMatch = html.match(/<meta property="og:description" content="([^"]*)"[^>]*>/i) ||
                      html.match(/<meta name="description" content="([^"]*)"[^>]*>/i);
    if (descMatch) {
      ogData.description = decodeHtmlEntities(descMatch[1].trim());
    }

    // Extract image
    const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"[^>]*>/i);
    if (imageMatch) {
      ogData.image = imageMatch[1].trim();
    }

    // Extract site name
    const siteNameMatch = html.match(/<meta property="og:site_name" content="([^"]*)"[^>]*>/i);
    if (siteNameMatch) {
      ogData.siteName = decodeHtmlEntities(siteNameMatch[1].trim());
    }

    // If no title found, use domain as fallback
    if (!ogData.title) {
      const domain = new URL(url).hostname;
      ogData.title = domain;
    }

    return NextResponse.json(ogData);
  } catch (error) {
    console.error('Error fetching Open Graph data:', error);
    
    // Return fallback data
    const domain = new URL(url).hostname;
    return NextResponse.json({
      url,
      title: domain,
      description: 'Click to visit this external link',
    });
  }
}