
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="container">
      <label className="switch">
        <input 
          className="togglesw" 
          type="checkbox" 
          checked={theme === 'light'}
          onChange={toggleTheme}
        />
        <div className="indicator left"></div>
        <div className="indicator right"></div>
        <div className="button"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
