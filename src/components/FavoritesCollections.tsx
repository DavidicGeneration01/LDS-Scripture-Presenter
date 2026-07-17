import React from 'react';
import { VerseData } from '../types';

interface Props {
  favorites: VerseData[];
  onToggleFavorite: (v: VerseData) => void;
}

const FavoritesCollections: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Favorites</div>
      {favorites.length === 0 ? (
        <div className="text-sm text-gray-500">No favorites yet.</div>
      ) : (
        <div className="space-y-2">
          {favorites.map(f => (
            <div key={f.reference} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div className="text-sm">{f.reference}</div>
              <button onClick={() => onToggleFavorite(f)} className="text-xs text-sky-400">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesCollections;
