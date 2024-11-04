import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

type Alignment = 'left' | 'center' | 'right';
type FontFamily = 'serif' | 'sans' | 'mono' | 'cursive' | 'elegant';

interface QuoteFormProps {
  quote: string;
  author: string;
  quoteAlignment: Alignment;
  authorAlignment: Alignment;
  fontSize: number;
  fontFamily: FontFamily;
  onQuoteChange: (quote: string) => void;
  onAuthorChange: (author: string) => void;
  onQuoteAlignmentChange: (alignment: Alignment) => void;
  onAuthorAlignmentChange: (alignment: Alignment) => void;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (font: FontFamily) => void;
}

const FONT_OPTIONS: { value: FontFamily; label: string; preview: string }[] = [
  { value: 'serif', label: 'Serif', preview: 'AaBbCc' },
  { value: 'sans', label: 'Sans Serif', preview: 'AaBbCc' },
  { value: 'mono', label: 'Monospace', preview: 'AaBbCc' },
  { value: 'cursive', label: 'Cursive', preview: 'AaBbCc' },
  { value: 'elegant', label: 'Elegant', preview: 'AaBbCc' },
];

export function QuoteForm({
  quote,
  author,
  quoteAlignment,
  authorAlignment,
  fontSize,
  fontFamily,
  onQuoteChange,
  onAuthorChange,
  onQuoteAlignmentChange,
  onAuthorAlignmentChange,
  onFontSizeChange,
  onFontFamilyChange,
}: QuoteFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = quote.substring(0, start) + '\t' + quote.substring(end);
      onQuoteChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const AlignmentButtons = ({
    alignment,
    onChange,
    label,
  }: {
    alignment: Alignment;
    onChange: (a: Alignment) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('left')}
          className={`p-2 rounded ${
            alignment === 'left'
              ? 'bg-indigo-100 text-indigo-600'
              : 'hover:bg-gray-100'
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onChange('center')}
          className={`p-2 rounded ${
            alignment === 'center'
              ? 'bg-indigo-100 text-indigo-600'
              : 'hover:bg-gray-100'
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          onClick={() => onChange('right')}
          className={`p-2 rounded ${
            alignment === 'right'
              ? 'bg-indigo-100 text-indigo-600'
              : 'hover:bg-gray-100'
          }`}
          title="Align Right"
        >
          <AlignRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label
          htmlFor="quote"
          className="block text-sm font-medium text-gray-700"
        >
          Your Quote
        </label>
        <textarea
          id="quote"
          value={quote}
          onChange={(e) => onQuoteChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32 font-mono p-2"
          placeholder="Enter your quote here..."
          spellCheck="false"
        />
      </div>
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Author (optional)
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          placeholder="Enter author name..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlignmentButtons
          alignment={quoteAlignment}
          onChange={onQuoteAlignmentChange}
          label="Quote Alignment"
        />
        <AlignmentButtons
          alignment={authorAlignment}
          onChange={onAuthorAlignmentChange}
          label="Author Alignment"
        />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <Type className="w-5 h-5 text-gray-700" />
          <label
            htmlFor="fontSize"
            className="block text-sm font-medium text-gray-700"
          >
            Font Size: {fontSize}px
          </label>
        </div>
        <input
          type="range"
          id="fontSize"
          min="16"
          max="48"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>16px</span>
          <span>48px</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.value}
              onClick={() => onFontFamilyChange(font.value)}
              className={`p-3 rounded border ${
                fontFamily === font.value
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`text-lg mb-1 font-${font.value}`}>
                {font.preview}
              </p>
              <p className="text-xs text-gray-600">{font.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
