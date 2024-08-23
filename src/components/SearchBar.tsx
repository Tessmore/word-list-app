import React, { useCallback } from "react";
import "./SearchBar.css";

interface SearchBarProps {
    filter: string;
    ignored: string;
    onFilterChange: (value: string) => void;
    onIgnoredChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    filter,
    ignored,
    onFilterChange,
    onIgnoredChange
}) => {
    const handleFilterChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.trim().toUpperCase();
            onFilterChange(value);
        },
        [onFilterChange]
    );

    const handleIgnoredChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.trim().toUpperCase();
            onIgnoredChange(value);
        },
        [onIgnoredChange]
    );

    return (
        <div className="search-bar">
            <div>
                <span className="search-icon" title="Wordle input">
                    🔍
                </span>
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
    );
};

export default SearchBar;
