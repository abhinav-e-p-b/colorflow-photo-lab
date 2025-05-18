
import React from 'react';
import Editor from '../components/Editor';
import { useTheme } from '../context/ThemeContext';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-editor-dark text-white' : 'bg-white text-slate-900'}`}>
      <Editor />
    </div>
  );
};

export default Index;
