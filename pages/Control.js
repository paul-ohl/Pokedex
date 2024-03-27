import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { deleteDatabase, removeAllPokemons } from '../functions/PokeCatcher';

export const Control = ({ setNewPokemons }) => {
  return (
    <View>
      <Button
        style={{ margin: 15 }}
        icon="trash-can"
        mode="contained"
        onPress={() => {
          removeAllPokemons();
          setNewPokemons(0);
        }}
      >
        Empty Database
      </Button>
    </View>
  );
}
