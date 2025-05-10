
// Helper function to load an image and draw it to a canvas
export const loadImageToCanvas = (
  file: File,
  canvas: HTMLCanvasElement,
  callback?: () => void
): void => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const img = new Image();
    
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image on the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (callback) callback();
      }
    };
    
    img.src = e.target?.result as string;
  };
  
  reader.readAsDataURL(file);
};

// Create a copy of a canvas
export const cloneCanvas = (originalCanvas: HTMLCanvasElement): HTMLCanvasElement => {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = originalCanvas.width;
  newCanvas.height = originalCanvas.height;
  
  const ctx = newCanvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(originalCanvas, 0, 0);
  }
  
  return newCanvas;
};

// Export canvas as image
export const exportCanvasImage = (canvas: HTMLCanvasElement, filename: string = 'edited-image'): string => {
  return canvas.toDataURL('image/jpeg', 0.9);
};

// Download canvas as image file
export const downloadCanvasImage = (canvas: HTMLCanvasElement, filename: string = 'edited-image'): void => {
  const link = document.createElement('a');
  link.download = `${filename}.jpg`;
  link.href = exportCanvasImage(canvas);
  link.click();
};

// Share image (for mobile devices)
export const shareCanvasImage = async (canvas: HTMLCanvasElement): Promise<void> => {
  try {
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', 0.9);
    });

    // Check if Web Share API is available
    if (navigator.share) {
      await navigator.share({
        title: 'My Edited Photo',
        files: [new File([blob], 'edited-photo.jpg', { type: 'image/jpeg' })],
      });
      console.log('Image shared successfully');
    } else {
      // Fallback if Web Share API is not available
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'edited-photo.jpg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error sharing image:', error);
  }
};
