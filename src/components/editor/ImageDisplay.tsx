
import React from 'react';
import LutUploader from '../LutUploader';
import EditorControls from '../EditorControls';
import ImagePreview from '../ImagePreview';
import { useEditor } from './EditorContext';

const ImageDisplay: React.FC = () => {
  const {
    originalCanvasRef,
    processedCanvasRef,
    showingOriginal,
    intensity,
    handleIntensityChange,
    handleBeforeAfterToggle,
    handleLutSelected,
  } = useEditor();

  return (
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
  );
};

export default ImageDisplay;
