'use client';

// Create this file: src/components/blog/RichBookmark.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  siteName?: string;
}

interface RichBookmarkProps {
  url: string;
  caption?: string;
}

export default function RichBookmark({ url, caption }: RichBookmarkProps) {
  const [ogData, setOgData] = useState<OpenGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOGData = async () => {
      try {
        const response = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setOgData(data);
      } catch (err) {
        console.error('Error fetching OG data:', err, error);
        setError(true);
        // Fallback data
        const domain = new URL(url).hostname;
        setOgData({
          url,
          title: domain,
          description: 'Click to visit this external link',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOGData();
  }, [url]);

  if (loading) {
    return (
      <div className="my-6 border border-gray-300 rounded-lg p-6 bg-white animate-pulse">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!ogData) return null;

  const domain = new URL(url).hostname;

  return (
    <div className="my-6 border border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-gray-50 transition-colors"
      >
        <div className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 min-w-0">
              {/* Site name or domain */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-benblue-500 rounded-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 font-medium truncate">
                  {ogData.siteName || domain}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {ogData.title || caption || domain}
              </h3>
              
              {/* Description */}
              {ogData.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {ogData.description}
                </p>
              )}
              
              {/* URL */}
              <div className="text-xs text-gray-400 truncate">
                {url}
              </div>
            </div>
            
            {/* Image */}
            {ogData.image && (
              <div className="w-20 h-20 flex-shrink-0">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={ogData.image}
                    alt={ogData.title || 'Bookmark image'}
                    fill
                    className="object-cover"
                    onError={() => {
                      // Hide image on error
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}