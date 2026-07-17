import React from 'react';

interface Props {
  onFilterChange?: (filters: any) => void;
}

const SearchFilters: React.FC<Props> = ({ onFilterChange }) => {
  return (
    <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Filters</div>
      <div className="text-sm text-gray-300">(Placeholder) Add filters by book, testament, tags, and length.</div>
    </div>
  );
};

export default SearchFilters;
