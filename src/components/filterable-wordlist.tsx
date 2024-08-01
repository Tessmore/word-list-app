import React, { useState } from 'react';
import WordList from "./wordList";
import './wordlist.css';

const FilterableWordList: React.FC<{ words: string[] }> = ({ words }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredWords = words.filter(word =>
    word.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
        <div className="search-bar">
            <input
                type="text"
                placeholder="Filter..."
                value={filter}
                onChange={handleFilterChange}
            />
        </div>

        <WordList words={filteredWords} />
    </div>
  );
};

export default FilterableWordList;
