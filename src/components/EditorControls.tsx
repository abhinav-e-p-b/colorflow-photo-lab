
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface EditorControlsProps {
  intensity: number;
  onIntensityChange: (value: number) => void;
  showingOriginal: boolean;
  onBeforeAfterToggle: () => void;
}

const EditorControls: React.FC<EditorControlsProps> = ({ 
  intensity, 
  onIntensityChange, 
  showingOriginal,
  onBeforeAfterToggle
}) => {
  const handleSliderChange = (values: number[]) => {
    onIntensityChange(values[0]);
  };

  return (
    <div className="p-4 bg-editor-darker rounded-lg space-y-5 animate-fade-in">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white">LUT Intensity</label>
          <span className="text-sm text-gray-400">{Math.round(intensity * 100)}%</span>
        </div>
        <Slider 
          defaultValue={[intensity]}
          min={0} 
          max={1} 
          step={0.01} 
          onValueChange={handleSliderChange}
          className="lut-slider"
        />
      </div>
      
      <div className="pt-2">
        <button
          onClick={onBeforeAfterToggle}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            showingOriginal 
              ? 'bg-editor-accent text-white hover:bg-opacity-90' 
              : 'bg-editor-muted text-white hover:bg-opacity-90'
          }`}
        >
          {showingOriginal ? 'Show Edited' : 'Show Original'}
        </button>
      </div>
    </div>
  );
};

export default EditorControls;
