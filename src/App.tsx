import "./App.css";
import FilterableWordList from "./components/FilterableWordlist";
import { WORD_LIST } from "./data/wordle-words";

function App() {
    return (
        <div className="App">
            <FilterableWordList words={WORD_LIST} />
        </div>
    );
}

export default App;
