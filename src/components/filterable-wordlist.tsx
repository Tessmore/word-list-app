import React, { useMemo, useState } from "react";
import WordList from "./wordList";
import "./wordlist.css";

const FilterableWordList: React.FC<{ words: string[] }> = ({ words }) => {
  const [filter, setFilter] = useState("");

  // Handle input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.trim().toUpperCase());
  };

  // Transform all non characters to match "any character" so
  // you can type `F_O` and `B*R` et cetera.
  const transform = (input: string): string => {
    return input.replace(/[^A-Z]/g, ".");
  }

  const lookup = useMemo(() => new RegExp(transform(filter), 'i'), [filter]);

  const filteredWords = words.filter((word) => lookup.test(word));

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
