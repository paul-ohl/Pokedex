import * as React from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { List } from 'react-native-paper';
import { PokeIcons } from '../functions/PokeIcons';
import { PokeModal } from '../components/PokeModal';
import { ShareActions } from '../components/ShareAction';
import { useGetPokemons } from '../components/ContextProvider.js';

export const Pokedex = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);
  const [pokemons, setPokemons] = React.useState([]);

  const caughtPokemons = useGetPokemons();

  React.useEffect(() => {
    setPokemons(caughtPokemons);
  }, [caughtPokemons]);

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
      />
      <ScrollView>
        {pokemons && (pokemons.length == 0) && <Text>Go catch some pokemons!</Text>}
        {pokemons && pokemons.map(pokemon => (
          <List.Item
            onPress={() => {
              showModal();
              setSelectedPokemon(pokemon);
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
      <ShareActions
        showModal={showModal}
        setSelectedPokemon={setSelectedPokemon}
      />
    </>
  );
}
