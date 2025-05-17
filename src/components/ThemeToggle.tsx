
import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Label } from "@/components/ui/label";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Handle the checkbox state based on theme
  const isChecked = theme === 'dark';
  
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg transition-colors">
      <div
        className="w-48 aspect-video rounded-xl bg-[#ebe6ef] dark:bg-[#3a3347] border-4 border-[#121331]"
      >
        <div className="flex h-full w-full px-2 items-center gap-x-2">
          <div
            className="w-6 h-6 flex-shrink-0 rounded-full border-4 border-[#121331]"
          ></div>
          <label
            htmlFor="theme-switch"
            className="w-full h-10 border-4 border-[#121331] rounded cursor-pointer"
          >
            <input 
              type="checkbox" 
              id="theme-switch" 
              className="hidden" 
              checked={isChecked}
              onChange={toggleTheme}
            />
            <div className={`w-full h-full ${isChecked ? 'bg-[#3a4999]' : 'bg-[#f24c00]'} relative ${isChecked ? 'scale-x-[-1]' : ''}`}>
              <div
                className="w-0 h-0 z-20 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[20px] border-t-[#121331] relative"
              >
                <div
                  className={`w-0 h-0 absolute border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[15px] ${isChecked ? 'border-t-[#2d3b87]' : 'border-t-[#e44901]'} -top-5 -left-[18px]`}
                ></div>
              </div>
              <div
                className={`w-[24px] h-9 z-10 absolute top-[9px] left-0 ${isChecked ? 'bg-[#3a4999]' : 'bg-[#f24c00]'} border-r-2 border-b-4 border-[#121331] transform skew-y-[39deg]`}
              ></div>
              <div
                className={`w-[25px] h-9 z-10 absolute top-[9px] left-[24px] ${isChecked ? 'bg-[#2d3b87]' : 'bg-[#c44002]'} border-r-4 border-l-2 border-b-4 border-[#121331] transform skew-y-[-39deg]`}
              ></div>
            </div>
          </label>
          <div className="w-6 h-1 flex-shrink-0 bg-[#121331] rounded-full"></div>
        </div>
      </div>
      <span className="sr-only">
        <Label htmlFor="theme-switch">Toggle theme</Label>
      </span>
    </div>
  );
};

export default ThemeToggle;

