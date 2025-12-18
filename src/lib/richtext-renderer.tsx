/**
 * Contentstack JSON RTE (Rich Text Editor) Renderer
 * Converts Contentstack's JSON RTE format to React elements
 */

import React from 'react';

// Types for Contentstack JSON RTE structure
interface RTENode {
  type: string;
  attrs?: Record<string, unknown>;
  uid?: string;
  children?: RTENode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  _version?: number;
}

interface RTEDocument {
  type: 'doc';
  uid?: string;
  attrs?: Record<string, unknown>;
  children: RTENode[];
  _version?: number;
}

// Check if content is JSON RTE format
export function isJsonRTE(content: unknown): content is RTEDocument {
  if (typeof content !== 'object' || content === null) return false;
  const obj = content as Record<string, unknown>;
  return obj.type === 'doc' && Array.isArray(obj.children);
}

// Check if content looks like a JSON RTE node (even if not the full document)
export function isJsonRTENode(content: unknown): content is RTENode {
  if (typeof content !== 'object' || content === null) return false;
  const obj = content as Record<string, unknown>;
  // Check for common JSON RTE node properties
  return (
    typeof obj.type === 'string' &&
    (Array.isArray(obj.children) || obj.text !== undefined || obj.uid !== undefined)
  );
}

// Check if content is a plain string
export function isPlainText(content: unknown): content is string {
  return typeof content === 'string';
}

/**
 * Safely convert any content to plain text string
 * Use this when you need to render content in a context that only accepts strings
 */
export function safeTextContent(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (typeof content === 'number') return String(content);
  
  // Handle JSON RTE
  if (isJsonRTE(content)) {
    return extractText(content.children);
  }
  
  // Handle JSON RTE node
  if (isJsonRTENode(content)) {
    if (content.text) return content.text;
    if (content.children) return extractText(content.children);
    return '';
  }
  
  // Handle arrays of nodes
  if (Array.isArray(content)) {
    return content.map(item => safeTextContent(item)).join('');
  }
  
  // Last resort - try to stringify
  try {
    return String(content);
  } catch {
    return '';
  }
}

// Render text with marks (bold, italic, etc.)
function renderTextWithMarks(node: RTENode, key: string): React.ReactNode {
  let text: React.ReactNode = node.text || '';
  
  if (node.bold) {
    text = <strong key={`${key}-bold`}>{text}</strong>;
  }
  if (node.italic) {
    text = <em key={`${key}-italic`}>{text}</em>;
  }
  if (node.underline) {
    text = <u key={`${key}-underline`}>{text}</u>;
  }
  if (node.strikethrough) {
    text = <s key={`${key}-strike`}>{text}</s>;
  }
  if (node.code) {
    text = <code key={`${key}-code`} className="bg-stone-100 px-1 py-0.5 rounded text-sm">{text}</code>;
  }
  
  return text;
}

// Render a single node
function renderNode(node: RTENode, key: string): React.ReactNode {
  // Text node
  if (node.text !== undefined) {
    return renderTextWithMarks(node, key);
  }
  
  // Get children
  const children = node.children?.map((child, index) => 
    renderNode(child, `${key}-${index}`)
  );
  
  // Render based on type
  switch (node.type) {
    case 'p':
    case 'paragraph':
      return <p key={key} className="mb-4 last:mb-0">{children}</p>;
      
    case 'h1':
    case 'heading-1':
      return <h1 key={key} className="text-4xl font-serif mb-6">{children}</h1>;
      
    case 'h2':
    case 'heading-2':
      return <h2 key={key} className="text-3xl font-serif mb-5">{children}</h2>;
      
    case 'h3':
    case 'heading-3':
      return <h3 key={key} className="text-2xl font-serif mb-4">{children}</h3>;
      
    case 'h4':
    case 'heading-4':
      return <h4 key={key} className="text-xl font-serif mb-3">{children}</h4>;
      
    case 'h5':
    case 'heading-5':
      return <h5 key={key} className="text-lg font-serif mb-3">{children}</h5>;
      
    case 'h6':
    case 'heading-6':
      return <h6 key={key} className="text-base font-serif mb-2">{children}</h6>;
      
    case 'ul':
    case 'unordered-list':
      return <ul key={key} className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
      
    case 'ol':
    case 'ordered-list':
      return <ol key={key} className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
      
    case 'li':
    case 'list-item':
      return <li key={key}>{children}</li>;
      
    case 'blockquote':
      return (
        <blockquote key={key} className="border-l-4 border-stone-300 pl-4 italic my-4">
          {children}
        </blockquote>
      );
      
    case 'a':
    case 'link':
      const href = (node.attrs?.href as string) || '#';
      const target = (node.attrs?.target as string) || '_self';
      return (
        <a 
          key={key} 
          href={href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
        >
          {children}
        </a>
      );
      
    case 'img':
    case 'image':
      const src = (node.attrs?.src as string) || '';
      const alt = (node.attrs?.alt as string) || '';
      return (
        <img 
          key={key} 
          src={src} 
          alt={alt}
          className="max-w-full h-auto my-4 rounded"
        />
      );
      
    case 'hr':
    case 'horizontal-rule':
      return <hr key={key} className="my-8 border-stone-200" />;
      
    case 'br':
      return <br key={key} />;
      
    case 'code-block':
    case 'codeblock':
      return (
        <pre key={key} className="bg-stone-900 text-stone-100 p-4 rounded-lg overflow-x-auto my-4">
          <code>{children}</code>
        </pre>
      );
      
    case 'doc':
      return <>{children}</>;
      
    case 'fragment':
      return <>{children}</>;
      
    default:
      // If unknown type, just render children or text
      if (children && children.length > 0) {
        return <span key={key}>{children}</span>;
      }
      return null;
  }
}

// Props for the RichText component
interface RichTextProps {
  content: unknown;
  className?: string;
}

/**
 * RichText Component
 * Renders Contentstack JSON RTE content or plain text
 */
export function RichText({ content, className = '' }: RichTextProps): React.ReactElement | null {
  // Handle empty content
  if (!content) {
    return null;
  }
  
  // Handle plain string
  if (isPlainText(content)) {
    return (
      <div className={className}>
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }
  
  // Handle JSON RTE
  if (isJsonRTE(content)) {
    return (
      <div className={className}>
        {content.children.map((node, index) => renderNode(node, `node-${index}`))}
      </div>
    );
  }
  
  // Handle array (sometimes RTE returns array directly)
  if (Array.isArray(content)) {
    return (
      <div className={className}>
        {content.map((node, index) => renderNode(node as RTENode, `node-${index}`))}
      </div>
    );
  }
  
  // Fallback: try to convert to string
  console.warn('Unknown content format:', content);
  return <div className={className}>{String(content)}</div>;
}

/**
 * Convert JSON RTE to plain text (strips all formatting)
 */
export function rteToPlainText(content: unknown): string {
  if (!content) return '';
  
  if (isPlainText(content)) {
    return content;
  }
  
  if (isJsonRTE(content)) {
    return extractText(content.children);
  }
  
  if (Array.isArray(content)) {
    return extractText(content as RTENode[]);
  }
  
  return String(content);
}

function extractText(nodes: RTENode[]): string {
  return nodes.map(node => {
    if (node.text) return node.text;
    if (node.children) return extractText(node.children);
    return '';
  }).join('');
}

export default RichText;

