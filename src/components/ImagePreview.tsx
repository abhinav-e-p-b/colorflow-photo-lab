
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
      // Get the container dimensions
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calculate the aspect ratio of the image
      const imageAspectRatio = originalImage.width / originalImage.height;
      
      // Determine the dimensions that fit within the container
      // while maintaining the original aspect ratio
      let newWidth = originalImage.width;
      let newHeight = originalImage.height;
      
      // Scale down if the image is larger than the container
      if (newWidth > containerWidth) {
        newWidth = containerWidth;
        newHeight = newWidth / imageAspectRatio;
      }
      
      // If after scaling by width, the height is still too large
      if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = newHeight * imageAspectRatio;
      }
      
      // Set the canvas dimensions
      setCanvasWidth(newWidth);
      setCanvasHeight(newHeight);
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
