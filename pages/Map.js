import * as React from 'react';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PaperProvider, FAB } from 'react-native-paper';
import { fetchFromId } from '../functions/PokemonFetching';
import { PokeModal } from '../components/PokeModal';

export const Map = ({ setNewPokemons }) => {
  const [visible, setVisible] = React.useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const initPos = {
    latitude: 45.764623426734325,
    longitude: 4.859024273638047,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0522,
  };

  async function initializePokemons() {
    setLoading(true);
    const newMarkers = [];
    for (let i = 0; i < 5; i++) {
      const randLat = Math.random() * initPos.latitudeDelta * 2 + (initPos.latitude - initPos.latitudeDelta);
      const randLng = Math.random() * initPos.longitudeDelta * 2 + (initPos.longitude - initPos.longitudeDelta);
      const randomId = Math.floor(Math.random() * 151) + 1;

      const pokemon = await fetchFromId(randomId);
      const newMarker = {
        key: pokemon.id * randLat,
        coordinates: { latitude: randLat, longitude: randLng },
        pokemon: pokemon,
      };
      newMarkers.push(newMarker);
    }
    setMarkers(newMarkers);
    setLoading(false);
  }

  useEffect(() => {
    initializePokemons();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSelectedPokemon(null);
  };

  return (
    <PaperProvider>
      <PokeModal
        hideModal={hideModal}
        pokemon={selectedPokemon}
        setNewPokemons={setNewPokemons}
        visible={visible}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={initPos}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            image={{ uri: marker.pokemon.sprites.front_default }}
            coordinate={marker.coordinates}
            onPress={() => {
              setSelectedPokemon({
                id: marker.pokemon.id,
                name: marker.pokemon.name,
                types: marker.pokemon.types.map((type) => type.type.name)
              });
              showModal()
            }}
          />
        ))}
      </MapView>
      <FAB
        icon="refresh"
        loading={loading}
        disabled={loading}
        style={{
          position: 'absolute',
          margin: 25,
          right: 0,
          bottom: 0,
        }}
        onPress={() => initializePokemons()}
      />
    </PaperProvider>
  );
};
