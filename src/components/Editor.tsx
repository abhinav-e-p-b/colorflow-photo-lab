
import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import LutUploader from './LutUploader';
import EditorControls from './EditorControls';
import ImagePreview from './ImagePreview';
import Header from './Header';
import { loadImageToCanvas, cloneCanvas, downloadCanvasImage, shareCanvasImage } from '../utils/imageProcessor';
import { LutFile, applyLutToCanvas } from '../utils/lutProcessor';
import { useToast } from "../hooks/use-toast";

const Editor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedLut, setSelectedLut] = useState<LutFile | null>(null);
  const [intensity, setIntensity] = useState<number>(1);
  const [showingOriginal, setShowingOriginal] = useState<boolean>(false);
  
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const { toast } = useToast();

  // Initialize canvases
  useEffect(() => {
    originalCanvasRef.current = document.createElement('canvas');
    processedCanvasRef.current = document.createElement('canvas');
  }, []);

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
      downloadCanvasImage(processedCanvasRef.current, "lutify-edited");
      toast({
        title: "Image Saved",
        description: "Your edited image has been saved to your device",
      });
    } else {
      toast({
        title: "No Image",
        description: "Please select an image first",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-editor-dark">
      <Header onShare={handleShare} onSave={handleSave} />
      
      <main className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        {!selectedImage ? (
          <ImageUploader onImageSelected={handleImageSelected} />
        ) : (
          <>
            <ImagePreview 
              originalImage={originalCanvasRef.current}
              processedImage={processedCanvasRef.current}
              showOriginal={showingOriginal}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <LutUploader onLutSelected={handleLutSelected} />
              </div>
              
              <div className="md:col-span-2">
                <EditorControls 
                  intensity={intensity}
                  onIntensityChange={handleIntensityChange}
                  showingOriginal={showingOriginal}
                  onBeforeAfterToggle={handleBeforeAfterToggle}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Editor;
