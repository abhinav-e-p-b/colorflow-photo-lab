
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import ImageUploader from '../ImageUploader';
import ImageDisplay from './ImageDisplay';
import { useEditor } from './EditorContext';
import WaveBackground from '../WaveBackground';

const EditorLayout: React.FC = () => {
  const { selectedImage, handleImageSelected, handleShare, handleSave } = useEditor();
  const [isWaving, setIsWaving] = useState(false);
  
  // Listen for wave animation events
  useEffect(() => {
    const handleWaveAnimation = (event: CustomEvent) => {
      setIsWaving(event.detail.isAnimating);
    };

    window.addEventListener('wave-animation', handleWaveAnimation as EventListener);
    
    return () => {
      window.removeEventListener('wave-animation', handleWaveAnimation as EventListener);
    };
  }, []);
  
  return (
    <div className="flex flex-col h-screen bg-editor-dark">
      <Header onShare={handleShare} onSave={handleSave} />
      <WaveBackground isAnimating={isWaving} />
      
      <main className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto relative z-10">
        {!selectedImage ? (
          <ImageUploader onImageSelected={handleImageSelected} />
        ) : (
          <ImageDisplay />
        )}
      </main>
    </div>
  );
};

export default EditorLayout;
