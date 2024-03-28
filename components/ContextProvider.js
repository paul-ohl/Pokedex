import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const getPokemonsCtx = createContext(null);
const setPokemonsCtx = createContext(null);

const ASYNC_STORAGE_KEY = "the_pokemons";

export function ContextProvider({ children }) {
  const [caughtPokemons, setCaughtPokemonsState] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((storage) => {
      setCaughtPokemons(storage ? JSON.parse(storage) : []);
    });
  }, [])

  const setCaughtPokemons = (pokemons) => {
    setCaughtPokemonsState(pokemons);
    console.log("JS Object:   ", pokemons);
    console.log("Stringified: ", JSON.stringify(pokemons));
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(pokemons));
  }

  return (
    <getPokemonsCtx.Provider value={caughtPokemons}>
      <setPokemonsCtx.Provider value={setCaughtPokemons}>
        {children}
      </setPokemonsCtx.Provider>
    </getPokemonsCtx.Provider>
  )
}

export function useGetPokemons() {
  return useContext(getPokemonsCtx);
}

export function useSetPokemons() {
  return useContext(setPokemonsCtx);
}
