import React from 'react';
import { VerseData, PresentationSettings } from '../types';

interface Props { verse: VerseData | null; settings: PresentationSettings }

// Simple presentation engine wrapper - for now it just renders SlideDisplay externally.
const PresentationEngine: React.FC<Props> = ({ verse, settings }) => {
  return (
    <div className="w-full h-full">
      {/* Placeholder: more complex transitions and layout templates would be implemented here */}
      <div className="w-full h-full">{verse ? <div className="p-6">{verse.reference}</div> : <div className="p-6 text-gray-400">No slide</div>}</div>
    </div>
  );
};

export default PresentationEngine;
