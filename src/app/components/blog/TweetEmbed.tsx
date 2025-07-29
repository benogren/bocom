// src/components/blog/TweetEmbed.tsx
'use client';

import { useEffect, useRef } from 'react';

interface TweetEmbedProps {
  tweetUrl: string;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: {
            theme?: 'light' | 'dark';
            width?: string;
            height?: string;
            conversation?: 'none' | 'all';
            cards?: 'hidden' | 'visible';
            align?: 'left' | 'right' | 'center';
          }
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

export default function TweetEmbed({ tweetUrl, theme = 'light' }: TweetEmbedProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Extract tweet ID from URL
  const extractTweetId = (url: string): string | null => {
    const tweetRegex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(tweetRegex);
    return match ? match[1] : null;
  };

  const tweetId = extractTweetId(tweetUrl);

  useEffect(() => {
    if (!tweetId || !tweetRef.current) return;

    const loadTwitterWidget = () => {
      if (window.twttr?.widgets) {
        // Clear any existing content
        if (tweetRef.current) {
          tweetRef.current.innerHTML = '';
          
          window.twttr.widgets.createTweet(tweetId, tweetRef.current, {
            theme,
            width: 'auto',
            conversation: 'none',
            align: 'center'
          }).catch((error) => {
            console.error('Error loading tweet:', error);
            // Fallback to link
            if (tweetRef.current) {
              tweetRef.current.innerHTML = `
                <div class="p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 font-medium">
                    View Tweet on X/Twitter
                  </a>
                </div>
              `;
            }
          });
        }
      }
    };

    const loadScript = () => {
      if (scriptLoaded.current || document.querySelector('script[src*="platform.twitter.com"]')) {
        loadTwitterWidget();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        // Wait a bit for the script to initialize
        setTimeout(loadTwitterWidget, 100);
      };
      
      document.head.appendChild(script);
    };

    loadScript();
  }, [tweetId, tweetUrl, theme]);

  if (!tweetId) {
    return (
      <div className="my-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <a 
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View Tweet on X/Twitter
        </a>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div ref={tweetRef} className="flex justify-center">
        {/* Loading state */}
        <div className="animate-pulse">
          <div className="h-32 w-80 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Loading tweet...</span>
          </div>
        </div>
      </div>
    </div>
  );
}