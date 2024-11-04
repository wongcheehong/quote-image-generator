import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Header } from './components/Header';
import { QuoteForm } from './components/QuoteForm';
import { QuotePreview } from './components/QuotePreview';
import { DownloadButton } from './components/DownloadButton';

type Alignment = 'left' | 'center' | 'right';
type FontFamily = 'serif' | 'sans' | 'mono' | 'cursive' | 'elegant';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quoteAlignment, setQuoteAlignment] = useState<Alignment>('left');
  const [authorAlignment, setAuthorAlignment] = useState<Alignment>('right');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const quoteCardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!quoteCardRef.current) return;

    const canvas = await html2canvas(quoteCardRef.current, {
      backgroundColor: '#000000',
    });

    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header />
        <QuoteForm
          quote={quote}
          author={author}
          quoteAlignment={quoteAlignment}
          authorAlignment={authorAlignment}
          fontSize={fontSize}
          fontFamily={fontFamily}
          onQuoteChange={setQuote}
          onAuthorChange={setAuthor}
          onQuoteAlignmentChange={setQuoteAlignment}
          onAuthorAlignmentChange={setAuthorAlignment}
          onFontSizeChange={setFontSize}
          onFontFamilyChange={setFontFamily}
        />
        <QuotePreview
          quote={quote}
          author={author}
          quoteAlignment={quoteAlignment}
          authorAlignment={authorAlignment}
          fontSize={fontSize}
          fontFamily={fontFamily}
          previewRef={quoteCardRef}
        />
        <DownloadButton onDownload={downloadImage} disabled={!quote} />
      </div>
    </div>
  );
}

export default App;
