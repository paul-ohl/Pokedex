import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export const Control = () => {
  // const releaseAllPokemons = useReleaseAll();

  return (
    <View>
      <Button
        style={{ margin: 15 }}
        icon="trash-can"
        mode="contained"
        onPress={() => {
          // releaseAllPokemons();
        }}
      >
        Release all pokemons
      </Button>
    </View>
  );
}
