// src/types/notion.ts - Flexible approach that works with the BlockRenderer

// Basic Blog Post Type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  tags: Array<{
    name: string;
    color: string;
  }>;
  published: boolean;
  publishedDate: string | null;
  createdTime: string;
  lastEditedTime: string;
}

// Extended type for posts with content
export interface BlogPostWithContent extends BlogPost {
  content: NotionBlock[];
}

// Rich Text Item for formatting
export interface RichTextItem {
  type: 'text';
  text: {
    content: string;
    link?: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string;
}

// Base Notion Block - flexible but type-safe
export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  created_time?: string;
  last_edited_time?: string;
  children?: NotionBlock[];

  // Block-specific properties (optional)
  paragraph?: {
    rich_text: RichTextItem[];
    color?: string;
  };
  
  heading_1?: {
    rich_text: RichTextItem[];
    color?: string;
    is_toggleable?: boolean;
  };
  
  heading_2?: {
    rich_text: RichTextItem[];
    color?: string;
    is_toggleable?: boolean;
  };
  
  heading_3?: {
    rich_text: RichTextItem[];
    color?: string;
    is_toggleable?: boolean;
  };
  
  bulleted_list_item?: {
    rich_text: RichTextItem[];
    color?: string;
  };
  
  numbered_list_item?: {
    rich_text: RichTextItem[];
    color?: string;
  };
  
  to_do?: {
    rich_text: RichTextItem[];
    checked?: boolean;
    color?: string;
  };
  
  quote?: {
    rich_text: RichTextItem[];
    color?: string;
  };
  
  callout?: {
    rich_text: RichTextItem[];
    icon?: {
      type: 'emoji' | 'external' | 'file';
      emoji?: string;
      external?: { url: string };
      file?: { url: string };
    };
    color?: string;
  };
  
  code?: {
    rich_text: RichTextItem[];
    language?: string;
    caption?: RichTextItem[];
  };
  
  image?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string; expiry_time: string };
    caption?: RichTextItem[];
  };
  
  video?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string; expiry_time: string };
    caption?: RichTextItem[];
  };
  
  bookmark?: {
    url: string;
    caption?: RichTextItem[];
  };
  
  table?: {
    table_width?: number;
    has_column_header?: boolean;
    has_row_header?: boolean;
    table_rows?: Array<{
      cells: RichTextItem[][];
    }>;
  };
  
  table_row?: {
    cells: RichTextItem[][];
  };
  
  toggle?: {
    rich_text: RichTextItem[];
    color?: string;
  };
  
  divider?: Record<string, never>;
  
  file?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string; expiry_time: string };
    name?: string;
    caption?: RichTextItem[];
  };

  // Allow for any additional properties for future block types
  [key: string]: unknown;
}

// Notion API Response Types
export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: NotionCover | null;
  properties: NotionProperties;
}

export interface NotionCover {
  type: 'external' | 'file';
  external?: { url: string };
  file?: { url: string; expiry_time: string };
}

export interface NotionProperties {
  Name: {
    title: Array<{
      plain_text: string;
    }>;
  };
  Slug: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Description: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Tags: {
    multi_select: Array<{
      name: string;
      color: string;
    }>;
  };
  Published: {
    checkbox: boolean;
  };
  'Publication Date': {
    date: {
      start: string;
    } | null;
  };
}