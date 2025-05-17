
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm p-2 rounded-full shadow-md">
      <Sun className="h-4 w-4 text-amber-500" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        id="theme-toggle"
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-blue-100"
      />
      <Moon className="h-4 w-4 text-indigo-700" />
      <span className="sr-only">
        <Label htmlFor="theme-toggle">Toggle theme</Label>
      </span>
    </div>
  );
};

export default ThemeToggle;
