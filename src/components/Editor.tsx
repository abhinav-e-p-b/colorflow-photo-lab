
import React from 'react';
import ImageUploader from './ImageUploader';
import Header from './Header';
import { EditorProvider } from './editor/EditorContext';
import ImageDisplay from './editor/ImageDisplay';
import { useEditor } from './editor/EditorContext';

// This component consumes the EditorContext
const EditorContent: React.FC = () => {
  const { selectedImage, handleImageSelected, handleShare, handleSave } = useEditor();
  
  return (
    <div className="flex flex-col h-screen bg-editor-dark">
      <Header onShare={handleShare} onSave={handleSave} />
      
      <main className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        {!selectedImage ? (
          <ImageUploader onImageSelected={handleImageSelected} />
        ) : (
          <ImageDisplay />
        )}
      </main>
    </div>
  );
};

// This is the main component that provides the context
const Editor: React.FC = () => {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
};

export default Editor;
