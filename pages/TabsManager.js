import {
  TabsProvider,
  Tabs,
  TabScreen,
} from 'react-native-paper-tabs';
import { Map } from './Map';
import { Pokedex } from './Pokedex';
import React, { useEffect } from 'react';
import { Control } from './Control';
import { useGetPokemons } from '../components/ContextProvider.js';

export function TabsManager() {
  // const pokemons = useGetPokemons();
  // const [seenPokemons, setSeenPokemons] = React.useState(pokemons.length);
  // let unseenPokemons = pokemons.length - seenPokemons;

  // useEffect(() => {
  //   unseenPokemons = pokemons.length - seenPokemons;
  // }, [pokemons.length]);

  return (
    <TabsProvider
      defaultIndex={0}
    >
      <Tabs
        style={{ backgroundColor: '#3b4cca', paddingTop: 10 }}
        theme={{ colors: { primary: 'white' } }}
        mode="fixed"
      >
        <TabScreen label="Map" >
          <Map />
        </TabScreen>
        <TabScreen
          label="Pokedex"
          // badge={unseenPokemons <= 0 ? null : unseenPokemons}
          onPress={() => { }}
        >
          <Pokedex />
        </TabScreen>
        <TabScreen label="Control" >
          <Control />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  )
}
