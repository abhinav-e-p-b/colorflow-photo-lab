
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-20 rounded-full p-1 transition-colors duration-300",
        theme === "dark" 
          ? "bg-slate-900 hover:bg-slate-800" 
          : "bg-blue-100 hover:bg-blue-200"
      )}
      aria-label="Toggle theme"
    >
      <div
        className={cn(
          "absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500",
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-indigo-700" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-20 pointer-events-none">
        <Sun className="h-4 w-4 text-amber-500" />
        <Moon className="h-4 w-4 text-indigo-700" />
      </div>
    </button>
  );
};

export default ThemeToggle;
