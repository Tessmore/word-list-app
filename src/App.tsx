import "./App.css";
import FilterableWordList from "./components/filterable-wordlist";
import { WORD_LIST } from "./data/wordle-words.mjs";

function App() {
  return (
    <div className="App">
      <FilterableWordList words={WORD_LIST} />
    </div>
  );
}

export default App;
