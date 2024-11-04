import React from 'react';

type Alignment = 'left' | 'center' | 'right';
type FontFamily = 'serif' | 'sans' | 'mono' | 'cursive' | 'elegant';

interface QuotePreviewProps {
  quote: string;
  author: string;
  quoteAlignment: Alignment;
  authorAlignment: Alignment;
  fontSize: number;
  fontFamily: FontFamily;
  previewRef: React.RefObject<HTMLDivElement>;
}

export function QuotePreview({ 
  quote, 
  author, 
  quoteAlignment,
  authorAlignment,
  fontSize,
  fontFamily,
  previewRef 
}: QuotePreviewProps) {
  const formatQuote = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split('\t').map((segment, j) => (
          <React.Fragment key={j}>
            {j > 0 && <span className="inline-block w-8" />}
            {segment}
          </React.Fragment>
        ))}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const getQuoteAlignmentClasses = (alignment: Alignment) => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  const getAuthorAlignmentClasses = (alignment: Alignment) => {
    switch (alignment) {
      case 'left':
        return 'self-start';
      case 'right':
        return 'self-end';
      default:
        return 'self-center';
    }
  };

  const getFontClasses = (font: FontFamily) => {
    switch (font) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'cursive':
        return 'font-cursive';
      case 'elegant':
        return 'font-elegant';
      default:
        return 'font-serif';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      <div 
        ref={previewRef}
        className="bg-black p-12 rounded-lg aspect-video flex flex-col justify-center"
        style={{ minHeight: '400px' }}
      >
        {quote ? (
          <>
            <div className={`w-full ${getQuoteAlignmentClasses(quoteAlignment)}`}>
              <p 
                className={`text-white leading-relaxed whitespace-pre-line inline-block max-w-2xl ${getFontClasses(fontFamily)}`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {formatQuote(quote)}
              </p>
            </div>
            {author && (
              <p className={`text-gray-400 text-lg mt-4 ${getAuthorAlignmentClasses(authorAlignment)}`}>
                — {author}
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500 italic">Your quote will appear here...</p>
        )}
      </div>
    </div>
  );
}