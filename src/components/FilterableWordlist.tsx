import React, { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import WordList from "./WordList";
import "./Wordlist.css";

const FilterableWordList: React.FC<{ words: string[] }> = ({ words }) => {
    const [filter, setFilter] = useState("");
    const [debouncedFilter] = useDebounce(filter, 300);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim().toUpperCase();
        setFilter(value);
    }, []);

    // Transform all non-characters to match "any character"
    const transform = (input: string): string => input.replace(/[^A-Z]/g, ".");

    const lookup = useMemo(() => new RegExp(transform(debouncedFilter), "i"), [debouncedFilter]);

    const filteredWords = useMemo(() => words.filter((word) => lookup.test(word)), [words, lookup]);

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
