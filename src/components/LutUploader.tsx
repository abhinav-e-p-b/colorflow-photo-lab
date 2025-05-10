
import React, { useRef } from 'react';
import { validateLutFile } from '../utils/lutProcessor';
import { Button } from "@/components/ui/button";

interface LutUploaderProps {
  onLutSelected: (file: File) => void;
}

const LutUploader: React.FC<LutUploaderProps> = ({ onLutSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateLutFile(file)) {
        onLutSelected(file);
      } else {
        alert('Please select a valid LUT file (.cube or .3dl format)');
      }
    }
  };
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3 bg-editor-darker rounded-lg animate-fade-in">
      <h3 className="text-lg font-medium text-white">Add LUT File</h3>
      
      <Button
        onClick={openFileDialog}
        className="w-full bg-editor-muted hover:bg-editor-muted/80 text-white py-4 rounded-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 mr-2"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Select LUT File
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".cube,.3dl"
        className="hidden"
      />
      
      <p className="text-xs text-gray-400 text-center">
        Supports .cube and .3dl formats
      </p>
    </div>
  );
};

export default LutUploader;
