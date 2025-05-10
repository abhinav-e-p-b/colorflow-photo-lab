
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { loadImageToCanvas, cloneCanvas } from '../../utils/imageProcessor';
import { LutFile, applyLutToCanvas } from '../../utils/lutProcessor';
import { useToast } from "../../hooks/use-toast";

// Define the context type
interface EditorContextType {
  // State
  selectedImage: File | null;
  selectedLut: LutFile | null;
  intensity: number;
  showingOriginal: boolean;
  originalCanvasRef: React.RefObject<HTMLCanvasElement>;
  processedCanvasRef: React.RefObject<HTMLCanvasElement>;
  
  // Actions
  setSelectedImage: (file: File | null) => void;
  handleImageSelected: (file: File) => void;
  handleLutSelected: (file: File) => void;
  handleIntensityChange: (value: number) => void;
  handleBeforeAfterToggle: () => void;
  handleShare: () => void;
  handleSave: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedLut, setSelectedLut] = useState<LutFile | null>(null);
  const [intensity, setIntensity] = useState<number>(1);
  const [showingOriginal, setShowingOriginal] = useState<boolean>(false);
  
  const originalCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const processedCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  
  const { toast } = useToast();

  // Handle image selection
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    
    if (originalCanvasRef.current) {
      loadImageToCanvas(file, originalCanvasRef.current, () => {
        // Clone the original canvas to the processed canvas
        if (originalCanvasRef.current && processedCanvasRef.current) {
          const origCanvas = originalCanvasRef.current;
          const procCanvas = processedCanvasRef.current;
          
          procCanvas.width = origCanvas.width;
          procCanvas.height = origCanvas.height;
          
          const ctx = procCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(origCanvas, 0, 0);
            
            // Apply LUT if one is selected
            if (selectedLut) {
              applyLutToCanvas(procCanvas, selectedLut, intensity);
            }
          }
        }
      });
    }
  };

  // Handle LUT selection
  const handleLutSelected = (file: File) => {
    // Read the file
    const reader = new FileReader();
    reader.onload = () => {
      const lutFile: LutFile = {
        name: file.name,
        data: reader.result as ArrayBuffer,
        type: file.type,
      };
      
      setSelectedLut(lutFile);
      toast({
        title: "LUT Loaded",
        description: `'${file.name}' has been loaded successfully`,
      });
      
      // Apply the LUT to the processed canvas
      if (processedCanvasRef.current && originalCanvasRef.current) {
        // Clone the original canvas to the processed canvas
        const origCanvas = originalCanvasRef.current;
        const procCanvas = processedCanvasRef.current;
        
        procCanvas.width = origCanvas.width;
        procCanvas.height = origCanvas.height;
        
        const ctx = procCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(origCanvas, 0, 0);
          
          // Apply LUT
          applyLutToCanvas(procCanvas, lutFile, intensity);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle intensity change
  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    
    // Reapply the LUT with the new intensity
    if (selectedLut && processedCanvasRef.current && originalCanvasRef.current) {
      // Clone the original canvas to the processed canvas
      const origCanvas = originalCanvasRef.current;
      const procCanvas = processedCanvasRef.current;
      
      procCanvas.width = origCanvas.width;
      procCanvas.height = origCanvas.height;
      
      const ctx = procCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(origCanvas, 0, 0);
        
        // Apply LUT with new intensity
        applyLutToCanvas(procCanvas, selectedLut, value);
      }
    }
  };

  // Handle before/after toggle
  const handleBeforeAfterToggle = () => {
    setShowingOriginal(!showingOriginal);
  };

  // Handle sharing
  const handleShare = () => {
    if (processedCanvasRef.current) {
      import('../utils/imageProcessor').then(({ shareCanvasImage }) => {
        shareCanvasImage(processedCanvasRef.current)
          .then(() => {
            toast({
              title: "Image Shared",
              description: "Your edited image has been shared successfully",
            });
          })
          .catch((error) => {
            console.error("Error sharing image:", error);
            toast({
              title: "Share Failed",
              description: "Could not share the image. Try saving instead.",
              variant: "destructive",
            });
          });
      });
    } else {
      toast({
        title: "No Image",
        description: "Please select an image first",
        variant: "destructive",
      });
    }
  };

  // Handle save
  const handleSave = () => {
    if (processedCanvasRef.current) {
      import('../utils/imageProcessor').then(({ downloadCanvasImage }) => {
        downloadCanvasImage(processedCanvasRef.current, "lutify-edited");
        toast({
          title: "Image Saved",
          description: "Your edited image has been saved to your device",
        });
      });
    } else {
      toast({
        title: "No Image",
        description: "Please select an image first",
        variant: "destructive",
      });
    }
  };

  const value = {
    selectedImage,
    selectedLut,
    intensity,
    showingOriginal,
    originalCanvasRef,
    processedCanvasRef,
    setSelectedImage,
    handleImageSelected,
    handleLutSelected,
    handleIntensityChange,
    handleBeforeAfterToggle,
    handleShare,
    handleSave,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
