
import React from 'react';
import { EditorProvider } from './editor/EditorContext';
import EditorLayout from './editor/EditorLayout';

const Editor: React.FC = () => {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  );
};

export default Editor;
