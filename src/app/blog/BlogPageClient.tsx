'use client';

// Create this file: src/app/blog/BlogPageClient.tsx
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/notion';
import Link from 'next/link';
import Image from 'next/image';
import BlogHeader from '../components/blog/BlogHeader';
import { oswald } from '../fonts';
import BlogFooter from '../components/blog/BlogFooter';

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
      <BlogHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="pt-20">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className={`text-4xl lg:text-5xl font-normal bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase leading-tight ${oswald.className}`}>
                Blog
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Thoughts, insights, and updates from my journey in tech and beyond.
              </p>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mb-12">
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={clearFilter}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      !selectedTag
                        ? 'bg-benblue-500 text-white shadow-lg'
                        : 'bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 hover:bg-benblue-500/20'
                    }`}
                  >
                    All Posts ({initialPosts.length})
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => handleTagClick(tag.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTag === tag.name
                          ? 'bg-benblue-500 text-white shadow-lg'
                          : 'bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 hover:bg-benblue-500/20'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </button>
                  ))}
                </div>

                {/* Selected tag indicator */}
                {/* {selectedTag && (
                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      Showing posts tagged with <span className="font-semibold text-blue-600">"{selectedTag}"</span>
                      <button
                        onClick={clearFilter}
                        className="ml-2 text-blue-600 hover:text-blue-700 underline text-sm"
                      >
                        Clear filter
                      </button>
                    </p>
                  </div>
                )} */}
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                                selectedTag === tag.name
                                  ? 'bg-benblue-500 text-white'
                                  : 'bg-benblue-500/10 text-benblue-500 border border-benblue-500/20 group-hover:bg-benblue-500/20'
                              }`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className={`${oswald.className} text-xl text-gray-800 mb-2 uppercase`}>
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                      
                      {/* Date */}
                      <div className="text-xs text-gray-600">
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
          </div>
        </div>
      </div>
      <BlogFooter />
    </>
  );
}