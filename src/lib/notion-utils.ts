// src/lib/notion-utils.ts
import React from 'react';
import { RichTextItem } from '@/types/notion';

// Process rich text content into React elements
export function processRichText(richText: RichTextItem[]): React.ReactNode[] {
  if (!richText || richText.length === 0) return [];

  return richText.map((text, index) => {
    let element: React.ReactNode = text.plain_text;
    
    // Apply formatting based on annotations
    if (text.annotations.bold) {
      element = React.createElement('strong', { key: `bold-${index}` }, element);
    }
    if (text.annotations.italic) {
      element = React.createElement('em', { key: `italic-${index}` }, element);
    }
    if (text.annotations.strikethrough) {
      element = React.createElement('del', { key: `strike-${index}` }, element);
    }
    if (text.annotations.underline) {
      element = React.createElement('u', { key: `underline-${index}` }, element);
    }
    if (text.annotations.code) {
      element = React.createElement('code', {
        key: `code-${index}`,
        className: 'bg-gray-100 px-1 py-0.5 rounded font-mono text-sm text-gray-800'
      }, element);
    }
    
    // Handle links
    if (text.text.link) {
      element = React.createElement('a', {
        key: `link-${index}`,
        href: text.text.link.url,
        className: 'text-blue-600 hover:text-blue-700 underline',
        target: '_blank',
        rel: 'noopener noreferrer'
      }, element);
    }
    
    return React.createElement('span', { key: index }, element);
  });
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate excerpt from content
export function generateExcerpt(content: string, maxLength: number = 160): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}