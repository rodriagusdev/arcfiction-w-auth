import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="w-10 h-10 border-4 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
      {text && <p className="text-zinc-400 text-sm font-medium animate-pulse">{text}</p>}
    </div>
  );
}
