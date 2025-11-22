'use client';

// Create this file: src/app/blog/BlogPageClient.tsx
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/notion';
import { oswald } from '../fonts';
import { LoaderCircle } from 'lucide-react';

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  allTags: Array<{ name: string; color: string; count: number }>;
}

// CLIENT COMPONENT - Only handles UI interactions, no API calls
export default function BlogPageClient({ initialPosts, allTags }: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);

  // This useEffect only filters the already-loaded data
  useEffect(() => {
    console.log('Selected tag changed to:', selectedTag);
    // Redirect to the Google Docs link
    window.location.href = 'https://benogren.substack.com/'; // Replace with your actual Google Docs link
    
    if (selectedTag) {
      const filtered = initialPosts.filter(post => 
        post.tags.some(tag => tag.name === selectedTag)
      );
      console.log('Filtered posts:', filtered);
      setFilteredPosts(filtered);
    } else {
      console.log('Showing all posts');
      setFilteredPosts(initialPosts);
    }
  }, [selectedTag, initialPosts]);

  const handleTagClick = (tagName: string) => {
    console.log('Tag clicked:', tagName);
    setSelectedTag(tagName);
  };

  const clearFilter = () => {
    console.log('Clear filter clicked');
    setSelectedTag(null);
  };

  console.log('Rendering BlogPageClient with tags:', allTags);
  console.log('Current selectedTag:', selectedTag);

  return (
    <>
      <div className='container mx-auto text-center p-4'>
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <LoaderCircle className="animate-spin mx-auto my-4 text-gray-300" size={32} />
                <div className={`${oswald.className} text-base text-benblue-500 mb-4 uppercase`}>
                    Redirecting to the substack...
                </div>
            </div>
        </div>
    </>
  );
}