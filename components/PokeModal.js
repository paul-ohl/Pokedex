import * as React from 'react';
import { Button, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { insertPokemon } from '../functions/PokeCatcher';

export const PokeModal = ({ pokemon, setNewPokemons }) => {
  const styles = {
    headlineLarge: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      marginTop: 5,
      marginBottom: 5,
    },
  };

  return (
    <View style={styles.headlineLarge}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={{ width: 150, height: 150 }} />
      <Text style={styles.text} variant="headlineLarge">{pokemon.name}</Text>
      <Text style={styles.text}>{pokemon.types.map(type => type.type.name).join(', ')}</Text>
      <Button style={styles.text} icon="pokeball" mode="contained" onPress={() => {
        insertPokemon(pokemon.id, pokemon.name, pokemon.types);
        setNewPokemons((prev) => prev + 1);
      }}>
        Capture!
      </Button>
    </View>
  )
};
