
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Fullscreen, Maximize, Download } from 'lucide-react';
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
    handleSave,
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
                {/* Custom Download Button */}
                <button 
                  className="cssbuttons-io-button"
                  onClick={handleSave}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
                    ></path>
                  </svg>
                  <span>Download</span>
                </button>
                
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
