
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Label } from "@/components/ui/label";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Handle the checkbox state based on theme
  const isChecked = theme === 'dark';
  
  return (
    <div className="flex items-center transition-colors">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isChecked}
          onChange={toggleTheme}
        />
        <span className="slider">
          <span className="star star_1"></span>
          <span className="star star_2"></span>
          <span className="star star_3"></span>
          <svg className="cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path fill="white" d="M30.9 22.5c0-0.2 0.1-0.3 0.1-0.5 0-3.3-2.7-6-6-6 -0.6 0-1.1 0.1-1.7 0.3 -1.5-2.9-4.6-4.8-8-4.8 -5 0-9 4-9 9 0 0.4 0 0.9 0.1 1.3C3.9 23 2 25.9 2 29.5c0 2.5 2 4.5 4.5 4.5h21c4.4 0 8-3.6 8-8C35.5 24.1 33.5 22.5 30.9 22.5z"/>
          </svg>
        </span>
      </label>
      <span className="sr-only">
        <Label htmlFor="theme-switch">Toggle theme</Label>
      </span>
    </div>
  );
};

export default ThemeToggle;
