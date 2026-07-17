import React from 'react';
import { HistoryItem } from '../types';

interface Props { items: HistoryItem[]; onSelect: (h: HistoryItem) => void }

const HistoryList: React.FC<Props> = ({ items, onSelect }) => {
  return (
    <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Recent</div>
      <div className="space-y-2">
        {items.map(h => (
          <button key={h.id} onClick={() => onSelect(h)} className="w-full text-left p-2 rounded bg-gray-800 hover:bg-gray-700">
            <div className="font-medium text-sm">{h.verse.reference}</div>
            <div className="text-xs text-gray-400 truncate">{h.verse.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
