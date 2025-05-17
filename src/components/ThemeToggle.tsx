
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Label } from "@/components/ui/label";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Handle the checkbox state based on theme
  const isChecked = theme === 'dark';
  
  return (
    <div className="flex items-center gap-2 transition-colors">
      <div
        className="w-36 aspect-video rounded-xl bg-[#ebe6ef] dark:bg-[#3a3347] border-4 border-[#121331]"
      >
        <div className="flex h-full w-full px-2 items-center gap-x-2">
          <div
            className="w-4 h-4 flex-shrink-0 rounded-full border-4 border-[#121331]"
          ></div>
          <label
            htmlFor="theme-switch"
            className="w-full h-6 border-4 border-[#121331] rounded cursor-pointer"
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
                className="w-0 h-0 z-20 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[14px] border-t-[#121331] relative"
              >
                <div
                  className={`w-0 h-0 absolute border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[10px] ${isChecked ? 'border-t-[#2d3b87]' : 'border-t-[#e44901]'} -top-[14px] -left-[14px]`}
                ></div>
              </div>
              <div
                className={`w-[18px] h-5 z-10 absolute top-[7px] left-0 ${isChecked ? 'bg-[#3a4999]' : 'bg-[#f24c00]'} border-r-2 border-b-4 border-[#121331] transform skew-y-[39deg]`}
              ></div>
              <div
                className={`w-[18px] h-5 z-10 absolute top-[7px] left-[18px] ${isChecked ? 'bg-[#2d3b87]' : 'bg-[#c44002]'} border-r-4 border-l-2 border-b-4 border-[#121331] transform skew-y-[-39deg]`}
              ></div>
            </div>
          </label>
          <div className="w-4 h-1 flex-shrink-0 bg-[#121331] rounded-full"></div>
        </div>
      </div>
      <span className="sr-only">
        <Label htmlFor="theme-switch">Toggle theme</Label>
      </span>
    </div>
  );
};

export default ThemeToggle;
