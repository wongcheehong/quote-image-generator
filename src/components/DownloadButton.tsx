import React from 'react';

interface DownloadButtonProps {
  onDownload: () => void;
  disabled: boolean;
}

export function DownloadButton({ onDownload, disabled }: DownloadButtonProps) {
  return (
    <div className="text-center">
      <button
        onClick={onDownload}
        disabled={disabled}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Download Image
      </button>
    </div>
  );
}