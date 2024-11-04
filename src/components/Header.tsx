import React from 'react';
import { Quote } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
        <Quote className="w-8 h-8" />
        Quote Image Generator
      </h1>
      <p className="mt-2 text-gray-600">Transform your words into beautiful images</p>
    </div>
  );
}