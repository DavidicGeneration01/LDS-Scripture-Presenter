import React from 'react';
import { VerseData, PresentationSettings } from '../types';

interface Props { verse: VerseData | null; settings: PresentationSettings }

const PresentationEngine: React.FC<Props> = ({ verse, settings }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">{verse ? <div className="p-6">{verse.reference}</div> : <div className="p-6 text-gray-400">No slide</div>}</div>
    </div>
  );
};

export default PresentationEngine;
