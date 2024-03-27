import {
  TabsProvider,
  Tabs,
  TabScreen,
} from 'react-native-paper-tabs';
import { Map } from './Map';
import { Pokedex } from './Pokedex';
import React from 'react';
import { Control } from './Control';
import CameraPage from './CameraPage';

export function TabsManager() {
  const [newPokemons, setNewPokemons] = React.useState(0);
  const [pokedexUpdate, setPokedexUpdate] = React.useState(false);

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
          <Map
            setNewPokemons={setNewPokemons}
            setPokedexUpdate={setPokedexUpdate}
          />
        </TabScreen>
        <TabScreen
          label="Pokedex"
          badge={newPokemons == 0 ? null : newPokemons}
          onPress={() => setNewPokemons(0)}
        >
          <Pokedex
            pokedexUpdate={pokedexUpdate}
            setPokedexUpdate={setPokedexUpdate}
          />
        </TabScreen>
        {/* <TabScreen */}
        {/*   label="Camera" */}
        {/* > */}
        {/*   <CameraPage /> */}
        {/* </TabScreen> */}
        <TabScreen label="Control" >
          <Control
            setPokedexUpdate={setPokedexUpdate}
            setNewPokemons={setNewPokemons}
          />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  )
}
