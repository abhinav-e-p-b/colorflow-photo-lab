
import React from 'react';
import Editor from '../components/Editor';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-editor-dark text-white' : 'bg-white text-slate-900'}`}>
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Editor />
    </div>
  );
};

export default Index;
