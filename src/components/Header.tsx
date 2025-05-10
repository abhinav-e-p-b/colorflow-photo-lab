
import React from 'react';

interface HeaderProps {
  onShare: () => void;
  onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShare, onSave }) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-editor-darker">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">LUTify</h1>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onShare}
          className="p-2 rounded-full bg-editor-muted text-white hover:bg-editor-accent transition-colors"
          aria-label="Share"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
        </button>
        <button 
          onClick={onSave}
          className="p-2 rounded-full bg-editor-accent text-white hover:bg-opacity-90 transition-colors"
          aria-label="Save"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
