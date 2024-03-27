import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pokemon.db');

export async function getPokemons() {
  return await new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Pokemons',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}

export async function insertPokemon(pokemonId, name, types) {
  const jsonTypes = JSON.stringify(types);
  return await new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Pokemons (id) VALUES (?)',
        [pokemonId, name, jsonTypes],
        () => { }
      );
    });
  });
}

export async function removePokemon(pokemonId) {
  return await new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Pokemons WHERE id = ?',
        [pokemonId],
        () => { }
      );
    });
  });
}

export async function removeAllPokemons() {
  return await new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Pokemons',
        [],
        () => { }
      );
    });
  });
}

export async function deleteDatabase() {
  return await new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE Pokemons',
        [],
        () => { }
      );
    });
  });
}

export const SqliteApiProvider = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      await new Promise(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Pokemons (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE)',
            [],
          );
        });
      });
    }

    initializeDatabase();
  }, []);
}
