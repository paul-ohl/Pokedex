import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { getPokemons } from '../functions/PokeCatcher';
import { PokeIcons } from '../functions/PokeIcons';
import { PokeModal } from '../components/PokeModal';
import { fetchFromId } from '../functions/PokemonFetching';

export const Pokedex = ({
  setNewPokemons,
  pokedexUpdate, setPokedexUpdate
}) => {
  const [pokemons, setPokemons] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    getPokemons().then((pokemons) => {
      setPokemons(pokemons);
    });
  }, [pokedexUpdate]);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSelectedPokemon(null);
  };

  return (
    <>
      <PokeModal
        hideModal={hideModal}
        visible={visible}
        pokemon={selectedPokemon}
        setPokedexUpdate={setPokedexUpdate}
      />
      <ScrollView>
        {pokemons && pokemons.map(pokemon => (
          <List.Item
            onPress={() => {
              showModal();
              fetchFromId(pokemon.id).then((pokemon) => {
                setSelectedPokemon(pokemon);
              });
            }}
            key={pokemon.id}
            title={pokemon.name}
            left={
              () => <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
                style={{ width: 80, height: 80 }}
              />
            }
            right={() => <>
              {pokemon.types.map(type =>
                <Image
                  key={type}
                  source={PokeIcons.types[type]}
                  style={{ width: 60, height: 30, marginTop: 25, marginRight: 2 }}
                />
              )}
            </>}
          />
        ))}
      </ScrollView>
    </>
  );
}
