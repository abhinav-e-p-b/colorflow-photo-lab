
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  // Set up the canvas dimensions based on container and image
  useEffect(() => {
    const sourceImage = showOriginal ? originalImage : processedImage;
    
    if (sourceImage && containerRef.current) {
      // Get the container dimensions
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calculate the aspect ratio of the image
      const imageAspectRatio = sourceImage.width / sourceImage.height;
      
      // Determine the dimensions that fit within the container
      // while maintaining the original aspect ratio
      let newWidth = sourceImage.width;
      let newHeight = sourceImage.height;
      
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
  }, [originalImage, processedImage, showOriginal, containerRef]);

  // Draw image to canvas when it changes
  useEffect(() => {
    // Determine which image to display based on showOriginal prop
    const sourceImage = showOriginal ? originalImage : processedImage;
    
    if (sourceImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(
          sourceImage, 
          0, 0, sourceImage.width, sourceImage.height, 
          0, 0, canvasWidth, canvasHeight
        );
      }
    }
  }, [originalImage, processedImage, showOriginal, canvasWidth, canvasHeight]);

  return (
    <div 
      ref={containerRef} 
      className="image-container bg-editor-darker rounded-lg flex items-center justify-center overflow-hidden animate-fade-in h-full"
      style={{ minHeight: '200px' }}
    >
      {originalImage ? (
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="w-full h-full"
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
