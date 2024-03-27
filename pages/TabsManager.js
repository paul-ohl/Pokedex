import {
  TabsProvider,
  Tabs,
  TabScreen,
} from 'react-native-paper-tabs';
import { Map } from './Map';
import { Pokedex } from './Pokedex';
import React from 'react';
import { Control } from './Control';

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

// function ExploreWitHookExamples() {
//   const goTo = useTabNavigation();
//   const index = useTabIndex();
//   return (
//     <View style={{ flex: 1 }}>
//       <Title>Explore</Title>
//       <Paragraph>Index: {index}</Paragraph>
//       <Button onPress={() => goTo(1)}>Go to Flights</Button>
//     </View>
//   );
// }
