import { useState, Suspense } from "react";
import { useLocalStorage } from "usehooks-ts";
import ErrorBoundary from "./ErrorBoundary";
import PokemonCard from "./components/PokemonCard";
import PokemonGrid from "./components/PokemonGrid";
import Toggle from "./components/Toggle";
import "./index.css";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isDark, setIsDark] = useState(useLocalStorage("isDark", false));

  const url = "https://pokeapi.co/api/v2/pokemon/";

  function handleSelectPokemon(pokemon) {
    return () => {
      setSelectedPokemon(pokemon);
    };
  }
  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <div className="app" data-theme={isDark ? "dark" : "light"}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="App">
            {selectedPokemon ? (
              <PokemonCard
                parentUrl={url}
                selectedPokemon={selectedPokemon}
                clearHandler={() => setSelectedPokemon(null)}
              />
            ) : (
              <PokemonGrid
                url={url}
                handleSelectPokemon={handleSelectPokemon}
              />
            )}
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
