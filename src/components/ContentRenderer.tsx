import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface ContentRendererProps {
  content: any
  className?: string
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content) return null

  // Se for o formato JSON do Lexical
  if (typeof content === 'object' && content !== null && 'root' in content) {
    return (
      <div className={`lexical-content ${className}`}>
        <RichText data={content} />
      </div>
    )
  }

  // Fallback caso seja string / Markdown simples
  if (typeof content === 'string') {
    const paragraphs = content
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean)

    return (
      <div className={className}>
        {paragraphs.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    )
  }

  return null
}

export default ContentRenderer
