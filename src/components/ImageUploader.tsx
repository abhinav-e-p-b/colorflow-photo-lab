
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelected(files[0]);
    }
  };
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const captureFromCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Create video and canvas elements
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set up video
      video.srcObject = stream;
      video.play();
      
      // Once video is playing, capture a frame
      video.onplaying = () => {
        // Set canvas size to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a File object from the blob
              const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
              onImageSelected(file);
              
              // Stop all video tracks to release camera
              stream.getTracks().forEach(track => track.stop());
            }
          }, 'image/jpeg');
        }
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please make sure you've granted camera permission.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-editor-darker rounded-lg animate-fade-in">
      <h2 className="text-xl font-semibold text-white">Add Photo</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={openFileDialog}
          className="bg-editor-muted hover:bg-editor-muted/80 text-white px-8 py-6 rounded-lg flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 mr-2"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          Gallery
        </Button>
        
        <Button
          onClick={captureFromCamera}
          className="bg-editor-muted hover:bg-editor-muted/80 text-white px-8 py-6 rounded-lg flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 mr-2"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          Camera
        </Button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <p className="text-sm text-gray-400 text-center">
        Supported formats: JPG, PNG, HEIF
      </p>
    </div>
  );
};

export default ImageUploader;
