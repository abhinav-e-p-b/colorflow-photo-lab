
import React, { useRef, useEffect, useState } from 'react';

interface ImagePreviewProps {
  originalImage: HTMLCanvasElement | null;
  processedImage: HTMLCanvasElement | null;
  showOriginal: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  originalImage, 
  processedImage, 
  showOriginal 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  useEffect(() => {
    if (originalImage && containerRef.current) {
      // Calculate the container dimensions
      const containerWidth = containerRef.current.clientWidth;
      const scale = Math.min(1, containerWidth / originalImage.width);
      
      // Set canvas dimensions based on the container and the image's aspect ratio
      setCanvasWidth(originalImage.width * scale);
      setCanvasHeight(originalImage.height * scale);
    }
  }, [originalImage, containerRef]);

  return (
    <div 
      ref={containerRef} 
      className="image-container bg-editor-darker rounded-lg flex items-center justify-center overflow-hidden animate-fade-in"
    >
      {originalImage ? (
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          {/* Render either the original or processed image based on the showOriginal prop */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${showOriginal ? 'opacity-100' : 'opacity-0'}`}>
            <canvas
              width={canvasWidth}
              height={canvasHeight}
              className="w-full h-full"
              style={{ display: 'block' }}
            ></canvas>
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-300 ${!showOriginal ? 'opacity-100' : 'opacity-0'}`}>
            <canvas
              width={canvasWidth}
              height={canvasHeight}
              className="w-full h-full"
              style={{ display: 'block' }}
            ></canvas>
          </div>
          
          {/* Draw the images to the canvases */}
          {(() => {
            const canvases = containerRef.current?.querySelectorAll('canvas');
            if (canvases && canvases.length >= 2) {
              const originalCanvas = canvases[0];
              const processedCanvas = canvases[1];
              
              const originalCtx = originalCanvas.getContext('2d');
              const processedCtx = processedCanvas.getContext('2d');
              
              if (originalCtx && originalImage) {
                originalCtx.drawImage(
                  originalImage, 
                  0, 0, originalImage.width, originalImage.height, 
                  0, 0, canvasWidth, canvasHeight
                );
              }
              
              if (processedCtx && processedImage) {
                processedCtx.drawImage(
                  processedImage, 
                  0, 0, processedImage.width, processedImage.height,
                  0, 0, canvasWidth, canvasHeight
                );
              }
            }
            return null;
          })()}
        </div>
      ) : (
        <div className="text-gray-400 text-center p-10">
          No image selected
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
