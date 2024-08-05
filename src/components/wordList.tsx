import React from "react";
import "./Wordlist.css";

interface WordListProps {
    words: string[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
    return (
        <ul className="word-list">
            {words.map((word, index) => (
                <li key={index}>{word}</li>
            ))}
        </ul>
    );
};

export default WordList;
