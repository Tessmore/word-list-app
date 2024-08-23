import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "./SearchBar";
import WordList from "./WordList";

const FilterableWordList: React.FC<{ words: string[] }> = ({ words }) => {
    const [filter, setFilter] = useState("");
    const [ignored, setIgnored] = useState("");

    const [debouncedFilter] = useDebounce(filter, 300);
    const [debouncedIgnored] = useDebounce(ignored, 300);

    // Transform all non-characters to match "any character"
    const transform = (input: string): string => input.replace(/[^A-Z]/g, ".");

    const lookup = useMemo(() => new RegExp(transform(debouncedFilter), "i"), [debouncedFilter]);

    const lookupIgnored = useMemo(() => {
        if (debouncedIgnored === "") {
            return new RegExp("^$", "i");
        }

        return new RegExp(`[${debouncedIgnored}]`, "i");
    }, [debouncedIgnored]);

    const filteredWords = useMemo(() => {
        return words.filter((word) => {
            return lookup.test(word) && !lookupIgnored.test(word);
        });
    }, [words, lookup, lookupIgnored]);

    return (
        <div>
            <SearchBar
                filter={filter}
                ignored={ignored}
                onFilterChange={setFilter}
                onIgnoredChange={setIgnored}
            />

            <WordList words={filteredWords} />
        </div>
    );
};

export default FilterableWordList;
