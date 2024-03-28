import { Modal, Portal, Button, List, Text, useTheme, FAB } from "react-native-paper";
import * as React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { PokeIcons } from '../functions/PokeIcons';
import QRCode from 'react-native-qrcode-svg';
import { useGetPokemons, useSetPokemons } from "./ContextProvider.js";

export const PokeModal = ({
  visible,
  hideModal,
  pokemon,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
        {!pokemon && <ActivityIndicator animating={true} size={"large"} />}
        {pokemon &&
          <ModalContent
            hideModal={hideModal}
            pokemon={pokemon}
          />
        }
      </Modal>
    </Portal>
  );
}

export const ModalContent = ({ pokemon, hideModal }) => {
  const [isCaptured, setIsCaptured] = React.useState(false);
  const theme = useTheme();
  const [displayQrCode, setDisplayQrCode] = React.useState(false);

  const caughtPokemons = useGetPokemons();
  const setCaughtPokemons = useSetPokemons();

  React.useEffect(() => {
    setIsCaptured(caughtPokemons.some(p => p.id === pokemon.id));
  }, [caughtPokemons])

  return (
    <View style={{
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {isCaptured &&
        <FAB
          icon={displayQrCode ? "close" : "share-variant"}
          accessibilityLabel="Share pokemon"
          onPress={() => {
            setDisplayQrCode((prev) => !prev);
          }}
          style={{ position: 'absolute', right: 0, top: 0 }}
        ></FAB>
      }
      {displayQrCode &&
        <QRCode
          value={JSON.stringify(pokemon)}
          size={150}
        />}
      {!displayQrCode &&
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
          style={{ width: 150, height: 150 }}
        />
      }
      <Text style={styles.text} variant="headlineLarge">{pokemon.name}</Text>
      <List.Item
        style={styles.text}
        title={"Types: "}
        right={() => <>
          {pokemon.types.map(typeName =>
            <Image
              key={typeName}
              source={PokeIcons.types[typeName]}
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
          // hideModal();
          if (isCaptured) {
            setCaughtPokemons(caughtPokemons.filter(p => p.id !== pokemon.id));
          } else {
            setCaughtPokemons([...caughtPokemons, pokemon]);
          }
        }}
      >
        {isCaptured ? "Release!" : "Capture!"}
      </Button>
    </View >
  )
};

const styles = {
  text: {
    marginTop: 5,
    marginBottom: 5,
  },
};
