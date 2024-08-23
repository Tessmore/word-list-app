import React, { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import WordList from "./WordList";
import "./Wordlist.css";

const FilterableWordList: React.FC<{ words: string[] }> = ({ words }) => {
    const [filter, setFilter] = useState("");
    const [ignored, setIgnored] = useState("");

    const [debouncedFilter] = useDebounce(filter, 300);
    const [debouncedIgnored] = useDebounce(ignored, 300);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim().toUpperCase();
        setFilter(value);
    }, []);

    const handleIgnoredChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim().toUpperCase();
        setIgnored(value);
    }, []);

    // Transform all non-characters to match "any character"
    const transform = (input: string): string => input.replace(/[^A-Z]/g, ".");
    const ignoredTransform = (input: string): string => input.split("").join("|");

    const lookup = useMemo(() => new RegExp(transform(debouncedFilter), "i"), [debouncedFilter]);
    const lookupIgnored = useMemo(() => {
        if (debouncedIgnored === "") {
            return new RegExp("^$", "i");
        }

        return new RegExp(ignoredTransform(debouncedIgnored), "i");
    }, [debouncedIgnored]);

    console.log("lookupIgnored", lookupIgnored);

    const filteredWords = useMemo(() => {
        return words.filter((word) => {
            return lookup.test(word) && !lookupIgnored.test(word);
        });
    }, [words, lookup, lookupIgnored]);

    return (
        <div>
            <div className="search-bar">
                <div>
                    <span className="search-icon" title="Wordle input">🔍</span>
                    <input
                        type="text"
                        placeholder="Find words..."
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Ignored letters"
                        value={ignored}
                        onChange={handleIgnoredChange}
                    />
                </div>
            </div>

            <WordList words={filteredWords} />
        </div>
    );
};

export default FilterableWordList;
