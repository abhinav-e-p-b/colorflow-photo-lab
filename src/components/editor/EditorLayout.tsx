
import React from 'react';
import Header from '../Header';
import ImageUploader from '../ImageUploader';
import ImageDisplay from './ImageDisplay';
import { useEditor } from './EditorContext';
import WaveBackground from '../WaveBackground';

const EditorLayout: React.FC = () => {
  const { selectedImage, handleImageSelected, handleShare, handleSave } = useEditor();
  
  return (
    <div className="flex flex-col h-screen bg-editor-dark">
      <Header onShare={handleShare} onSave={handleSave} />
      <WaveBackground />
      
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
