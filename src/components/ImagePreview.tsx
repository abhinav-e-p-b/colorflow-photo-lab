
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
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  // Set up the canvas dimensions based on container and image
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

  // Draw images to canvas when canvases, images, or dimensions change
  useEffect(() => {
    if (originalImage && originalCanvasRef.current) {
      const canvas = originalCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(
          originalImage, 
          0, 0, originalImage.width, originalImage.height, 
          0, 0, canvasWidth, canvasHeight
        );
      }
    }
    
    if (processedImage && processedCanvasRef.current) {
      const canvas = processedCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(
          processedImage, 
          0, 0, processedImage.width, processedImage.height,
          0, 0, canvasWidth, canvasHeight
        );
      }
    }
  }, [originalImage, processedImage, canvasWidth, canvasHeight]);

  return (
    <div 
      ref={containerRef} 
      className="image-container bg-editor-darker rounded-lg flex items-center justify-center overflow-hidden animate-fade-in h-full"
      style={{ minHeight: '300px' }}
    >
      {originalImage ? (
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          {/* Original image canvas */}
          <canvas
            ref={originalCanvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${showOriginal ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Processed image canvas */}
          <canvas
            ref={processedCanvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${!showOriginal ? 'opacity-100' : 'opacity-0'}`}
          />
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
