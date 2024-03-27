import { Modal, Portal, Button, List, Text, useTheme, FAB } from "react-native-paper";
import * as React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { insertPokemon, isPokemonCaptured, removePokemon } from '../functions/PokeCatcher';
import { PokeIcons } from '../functions/PokeIcons';
import QRCode from 'react-native-qrcode-svg';

export const PokeModal = ({
  visible,
  hideModal,
  pokemon,
  setPokedexUpdate,
  setNewPokemons
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
        {!pokemon && <ActivityIndicator animating={true} size={"large"} />}
        {pokemon &&
          <ModalContent
            setPokedexUpdate={setPokedexUpdate}
            setNewPokemons={setNewPokemons}
            hideModal={hideModal}
            pokemon={pokemon}
          />
        }
      </Modal>
    </Portal>
  );
}

export const ModalContent = ({ pokemon, setNewPokemons, setPokedexUpdate, hideModal }) => {
  const [isCaptured, setIsCaptured] = React.useState(false);
  const theme = useTheme();
  const [displayQrCode, setDisplayQrCode] = React.useState(false);

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

  isPokemonCaptured(pokemon.id).then((captured) => {
    setIsCaptured(captured);
  })

  return (
    <View style={styles.headlineLarge}>
      <FAB
        icon={displayQrCode ? "close" : "share-variant"}
        accessibilityLabel="Share pokemon"
        onPress={() => {
          setDisplayQrCode((prev) => !prev);
        }}
        style={{ position: 'absolute', right: 0, top: 0 }}
      ></FAB>
      {displayQrCode &&
        <QRCode
          value={pokemon.id.toString()}
          size={150}
        />}
      {!displayQrCode &&
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={{ width: 150, height: 150 }}
        />
      }
      <Text style={styles.text} variant="headlineLarge">{pokemon.name}</Text>
      <List.Item
        style={styles.text}
        title={"Types: "}
        right={() => <>
          {pokemon.types.map(type =>
            <Image
              key={type.type.name}
              source={PokeIcons.types[type.type.name]}
              style={{ width: 80, height: 30, marginTop: 5, marginRight: 2 }}
            />
          )}
        </>}
      />
      <Button
        style={styles.text}
        icon="pokeball"
        mode="contained"
        buttonColor={isCaptured && theme.colors.error}
        onPress={() => {
          if (isCaptured) {
            removePokemon(pokemon.id);
          } else {
            insertPokemon(pokemon.id, pokemon.name, pokemon.types);
            if (setNewPokemons) {
              setNewPokemons((prev) => prev + 1);
            }
          }
          hideModal();
          setPokedexUpdate((prev) => !prev);
        }}
      >
        {isCaptured ? "Release!" : "Capture!"}
      </Button>
    </View>
  )
};
