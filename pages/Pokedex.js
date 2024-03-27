import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { getPokemons } from '../functions/PokeCatcher';

export const Pokedex = ({ newPokemons }) => {
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    getPokemons().then((ids) => {
      const pokemons = ids.map(id => id.id);
      console.log('pokemons:', pokemons);
      setPokemons(pokemons);
    });
  }, [newPokemons]);

  return (
    <ScrollView>
      {pokemons && pokemons.map(id => (
        <List.Item
          key={id}
          title={id}
          left={
            () => <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
              style={{ width: 80, height: 80 }}
            />
          }
        />
      ))}
    </ScrollView>
  );
}
