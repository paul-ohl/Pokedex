import { CameraView } from "expo-camera/next";
import React from "react";
import { FAB } from "react-native-paper";
import { fetchFromId } from "../functions/PokemonFetching";

export function ShareActions({ showModal, setSelectedPokemon }) {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const openPokeModal = (id) => {
    showModal();
    fetchFromId(id).then((pokemon) => {
      setSelectedPokemon(pokemon);
    });
  }

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? 'close' : 'pokeball'}
      actions={[
        {
          icon: 'qrcode-scan',
          label: 'Scan a Pokemon',
          onPress: () => {
            CameraView.launchScanner({ barcodeTypes: ['qr'], isHighlightingEnabled: true });
            CameraView.onModernBarcodeScanned(({ data }) => {
              openPokeModal(data);
              CameraView.dismissScanner();
            });
          },
        },
        {
          icon: 'nfc',
          label: 'Tap a Pokemon',
          onPress: () => console.log('Pressed notifications'),
        },
      ]}
      onStateChange={onStateChange}
    />
  )
}
