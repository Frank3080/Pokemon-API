import { useState, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import PokemonCard from "./components/PokemonCard";
import PokemonGrid from "./components/PokemonGrid";
import "./index.css";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const url = "https://pokeapi.co/api/v2/pokemon/";

  function handleSelectPokemon(pokemon) {
    return () => {
      setSelectedPokemon(pokemon);
    };
  }
  return (
    <div className="app" data-theme={isDark ? "dark" : "light"}>
      <ErrorBoundary fallback={<div>Error...</div>}>
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
