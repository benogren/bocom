// src/components/blog/BlockRenderer.tsx
import { NotionBlock, RichTextItem } from '@/types/notion';
import { processRichText } from '@/lib/notion-utils';
import Image from 'next/image';
import RichBookmark from './RichBookmark';

interface BlockRendererProps {
  block: NotionBlock;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'paragraph':
      if (!block.paragraph?.rich_text?.length) return null;
      return (
        <p className="mb-4 leading-relaxed text-gray-700">
          {processRichText(block.paragraph.rich_text)}
        </p>
      );

    case 'heading_1':
      if (!block.heading_1?.rich_text?.length) return null;
      return (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
          {processRichText(block.heading_1.rich_text)}
        </h1>
      );

    case 'heading_2':
      if (!block.heading_2?.rich_text?.length) return null;
      return (
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          {processRichText(block.heading_2.rich_text)}
        </h2>
      );

    case 'heading_3':
      if (!block.heading_3?.rich_text?.length) return null;
      return (
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {processRichText(block.heading_3.rich_text)}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <ul className="list-outside">
            <li className="mb-2 ml-6 list-disc list-outside">
            {processRichText(block.bulleted_list_item?.rich_text || [])}
            {block.children && (
                <ul className="mt-2 list-outside">
                {block.children.map((child: NotionBlock) => (
                    <BlockRenderer key={child.id} block={child} />
                ))}
                </ul>
            )}
            </li>
        </ul>
      );

    case 'numbered_list_item':
      return (
        <ol className="list-outside">
            <li className="mb-2 ml-6 list-decimal list-outside">
            {processRichText(block.numbered_list_item?.rich_text || [])}
            {block.children && (
                <ol className="mt-2">
                {block.children.map((child: NotionBlock) => (
                    <BlockRenderer key={child.id} block={child} />
                ))}
                </ol>
            )}
            </li>
        </ol>
      );

    case 'to_do':
      return (
        <div className="flex items-start gap-3 mb-3">
          <input
            type="checkbox"
            checked={block.to_do?.checked || false}
            readOnly
            className="mt-1 rounded border-gray-300"
          />
          <div className={`flex-1 ${block.to_do?.checked ? 'line-through text-gray-500' : ''}`}>
            {processRichText(block.to_do?.rich_text || [])}
          </div>
        </div>
      );

    case 'quote':
      if (!block.quote?.rich_text?.length) return null;
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700">
          {processRichText(block.quote.rich_text)}
        </blockquote>
      );

    case 'callout':
      const calloutIcon = block.callout?.icon?.emoji || '💡';
      return (
        <div className="flex gap-3 p-4 my-6 bg-gray-50 border border-gray-200 rounded-lg">
          <span className="text-xl flex-shrink-0">{calloutIcon}</span>
          <div className="flex-1">
            {processRichText(block.callout?.rich_text || [])}
          </div>
        </div>
      );

    case 'code':
      const codeContent = block.code?.rich_text?.[0]?.plain_text || '';
      const language = block.code?.language || 'text';
      return (
        <div className="my-6">
          {language !== 'text' && (
            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg border-b border-gray-600">
              {language}
            </div>
          )}
          <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${language !== 'text' ? 'rounded-b-lg' : 'rounded-lg'}`}>
            <code>{codeContent}</code>
          </pre>
        </div>
      );

    case 'image':
      const imageUrl = block.image?.type === 'external' 
        ? block.image.external?.url 
        : block.image?.file?.url;
      const caption = block.image?.caption?.[0]?.plain_text || '';
      
      if (!imageUrl) return null;
      
      return (
        <figure className="my-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={caption || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      const videoUrl = block.video?.type === 'external' 
        ? block.video.external?.url 
        : block.video?.file?.url;
      
      if (!videoUrl) return null;
      
      // Handle YouTube embeds
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        const videoId = videoUrl.includes('youtu.be') 
          ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
          : videoUrl.split('v=')[1]?.split('&')[0];
        
        if (videoId) {
          return (
            <div className="my-8">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
      }
      
      // Handle other video URLs
      return (
        <div className="my-8">
          <video
            controls
            className="w-full rounded-lg"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );

    case 'bookmark':
      const bookmarkUrl = block.bookmark?.url;
      const bookmarkCaption = block.bookmark?.caption?.[0]?.plain_text;
      
      if (!bookmarkUrl) return null;
      
      return (
        <RichBookmark 
          url={bookmarkUrl} 
          caption={bookmarkCaption}
        />
      );

    case 'table':
      // Debug: Log the table block structure
      console.log('Table block:', JSON.stringify(block, null, 2));
      
      if (!block.table?.table_rows?.length) {
        console.log('No table_rows found, checking for children...');
        console.log('Table children:', block.children);
        
        // Sometimes table rows are in children instead
        if (block.children && block.children.length > 0) {
          return (
            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <tbody>
                  {block.children.map((row: NotionBlock, rowIndex: number) => {
                    if (row.type === 'table_row') {
                      const isHeader = rowIndex === 0 && block.table?.has_column_header;
                      const Tag = isHeader ? 'th' : 'td';
                      
                      return (
                        <tr 
                          key={row.id || rowIndex} 
                          className={`${isHeader ? 'bg-gray-100 font-semibold' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          {row.table_row?.cells?.map((cell: RichTextItem[], cellIndex: number) => (
                            <Tag
                              key={cellIndex}
                              className={`border border-gray-300 px-4 py-2 text-left ${isHeader ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
                            >
                              {processRichText(cell || [])}
                            </Tag>
                          ))}
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        
        return (
          <div className="my-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p><strong>Table Debug:</strong> No table rows found</p>
            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(block, null, 2)}</pre>
          </div>
        );
      }
      
      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <tbody>
              {block.table.table_rows.map((row, rowIndex: number) => {
                const isHeader = rowIndex === 0 && block.table?.has_column_header;
                const Tag = isHeader ? 'th' : 'td';
                
                return (
                  <tr 
                    key={rowIndex} 
                    className={`${isHeader ? 'bg-gray-100 font-semibold' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    {row.cells?.map((cell: RichTextItem[], cellIndex: number) => (
                      <Tag
                        key={cellIndex}
                        className={`border border-gray-300 px-4 py-2 text-left ${isHeader ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
                      >
                        {processRichText(cell || [])}
                      </Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case 'toggle':
      return (
        <details className="my-4 border border-gray-200 rounded-lg">
          <summary className="cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors font-medium">
            {processRichText(block.toggle?.rich_text || [])}
          </summary>
          <div className="p-4">
            {block.children?.map((child: NotionBlock) => (
              <BlockRenderer key={child.id} block={child} />
            ))}
          </div>
        </details>
      );

    case 'column_list':
      return (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {block.children?.map((column: NotionBlock) => (
            <div key={column.id} className="space-y-4">
              {column.children?.map((child: NotionBlock) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </div>
          ))}
        </div>
      );

    case 'divider':
      return <hr className="my-8 border-gray-300" />;

    case 'file':
      const fileUrl = block.file?.type === 'external' 
        ? block.file.external?.url 
        : block.file?.file?.url;
      const fileName = block.file?.name || 'Download File';
      
      if (!fileUrl) return null;
      
      return (
        <div className="my-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <a 
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>📁</span>
            {fileName}
          </a>
        </div>
      );

    default:
      // For unsupported block types, show a placeholder
      return (
        <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
          <strong>Unsupported block type:</strong> {block.type}
          {block.type === 'equation' && (
            <div className="mt-2 text-xs text-yellow-600">
              Math equations are not yet supported in this renderer.
            </div>
          )}
        </div>
      );
  }
}