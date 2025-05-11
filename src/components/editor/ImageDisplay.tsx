
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Fullscreen, Maximize } from 'lucide-react';
import LutUploader from '../LutUploader';
import EditorControls from '../EditorControls';
import ImagePreview from '../ImagePreview';
import { useEditor } from './EditorContext';
import { Button } from '@/components/ui/button';

const ImageDisplay: React.FC = () => {
  const {
    originalCanvasRef,
    processedCanvasRef,
    showingOriginal,
    intensity,
    handleIntensityChange,
    handleBeforeAfterToggle,
    handleLutSelected,
    toggleFullscreen,
    isFullscreen,
  } = useEditor();

  return (
    <div className="flex flex-col gap-4 h-full">
      <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg overflow-hidden">
        {/* Original image panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-editor-darker p-2 text-white flex justify-between items-center">
              <h3 className="text-sm font-medium">Original Image</h3>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <ImagePreview 
                originalImage={originalCanvasRef.current}
                processedImage={originalCanvasRef.current}
                showOriginal={true}
              />
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Processed image panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-editor-darker p-2 text-white flex justify-between items-center">
              <h3 className="text-sm font-medium">Processed Image</h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => toggleFullscreen()} 
                  className="h-8 w-8"
                >
                  {isFullscreen ? <Maximize className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <ImagePreview 
                originalImage={originalCanvasRef.current}
                processedImage={processedCanvasRef.current}
                showOriginal={showingOriginal}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

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
    </div>
  );
};

export default ImageDisplay;
