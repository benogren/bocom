import { Client } from '@notionhq/client';
import { BlogPost, BlogPostWithContent, NotionBlock, NotionCover } from '@/types/notion';

// Additional types for Notion API responses
interface NotionDatabaseQueryResult {
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: NotionCover | null;
  properties: {
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
    'SEO Title'?: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    'SEO Description'?: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
  };
}

interface NotionBlockResponse {
  id: string;
  type: string;
  has_children: boolean;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  parent: {
    type: string;
    page_id?: string;
    block_id?: string;
  };
  archived: boolean;
  in_trash: boolean;
  [key: string]: unknown;
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

// Simple function to test Notion connection and get blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching blog posts from Notion...');
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Publication Date',
          direction: 'descending',
        },
      ],
    });

    console.log(`Found ${response.results.length} published posts`);
    
    return response.results.map((page) => processNotionPage(page as unknown as NotionDatabaseQueryResult));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Simple function to process a Notion page into our BlogPost format
function processNotionPage(page: NotionDatabaseQueryResult): BlogPost {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties.Name.title[0]?.plain_text || 'Untitled',
    slug: properties.Slug.rich_text[0]?.plain_text || '',
    description: properties.Description.rich_text[0]?.plain_text || '',
    coverImage: getCoverImageUrl(page.cover),
    tags: properties.Tags.multi_select || [],
    published: properties.Published.checkbox,
    publishedDate: properties['Publication Date'].date?.start || null,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
  };
}

// Get single blog post by slug with content
export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
  try {
    console.log(`Fetching blog post with slug: ${slug}`);
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      console.log(`No published post found with slug: ${slug}`);
      return null;
    }

    const page = response.results[0];
    const post = processNotionPage(page as unknown as NotionDatabaseQueryResult);
    
    // Get the actual content blocks
    const content = await getPageBlocks(page.id);
    
    console.log(`Found post: ${post.title} with ${content.length} content blocks`);
    return {
      ...post,
      content,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Get all blocks for a page
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    // Handle child blocks for nested content like lists
    const blocks = await Promise.all(
      response.results.map(async (block) => {
        const typedBlock = block as NotionBlockResponse;
        if (typedBlock.has_children) {
          const children = await getPageBlocks(typedBlock.id);
          return { ...typedBlock, children } as NotionBlock;
        }
        return typedBlock as NotionBlock;
      })
    );

    return blocks;
  } catch (error) {
    console.error('Error fetching page blocks:', error);
    return [];
  }
}

// Helper function to extract cover image URL
function getCoverImageUrl(cover: NotionCover | null): string | null {
  if (!cover) return null;
  
  if (cover.type === 'external') {
    return cover.external?.url || null;
  }
  
  if (cover.type === 'file') {
    return cover.file?.url || null;
  }
  
  return null;
}