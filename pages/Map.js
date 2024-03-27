import * as React from 'react';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { getFromId } from '../functions/PokemonFetching';
import { PokeModal } from '../components/PokeModal';

export const Map = ({ setNewPokemons }) => {
  const [visible, setVisible] = React.useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    let localMarkers = [];

    async function initializePokemons() {
      for (let i = 0; i < 10; i++) {
        const randomLatitude = Math.random() * 0.0522 + 45.764623426734325;
        const randomLongitude = Math.random() * 0.0221 + 4.859024273638047;
        const randomId = Math.floor(Math.random() * 151) + 1;

        const pokemon = await getFromId(randomId);
        localMarkers.push({
          key: pokemon.id * randomLatitude,
          coordinates: { latitude: randomLatitude, longitude: randomLongitude },
          pokemon: pokemon,
        });
      }
      setMarkers(localMarkers);
    }

    initializePokemons();
  }, []);

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
          {selectedPokemon && <PokeModal setNewPokemons={setNewPokemons} pokemon={selectedPokemon} />}
        </Modal>
      </Portal>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 45.764623426734325,
          longitude: 4.859024273638047,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            image={{ uri: marker.pokemon.sprites.front_default }}
            coordinate={marker.coordinates}
            onPress={() => {
              setSelectedPokemon(marker.pokemon);
              showModal()
            }}
          />
        ))}
      </MapView>
    </PaperProvider>
  );
};
