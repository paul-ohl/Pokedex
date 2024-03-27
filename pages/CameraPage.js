import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

export default function CameraPage() {
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) requestPermission();

  function toggleTorch() {
    setTorch(current => !current);
  }

  useEffect(() => {
    CameraView.launchScanner({ barcodeTypes: ['qr'], isHighlightingEnabled: true });
    CameraView.onModernBarcodeScanned(({ data }) => {
      console.log(data);
      CameraView.dismissScanner();
    });
  }, []);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        enableTorch={torch}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
          interval: 1000,
        }}
        onBarCodeScanned={(data) => console.log(data)}
      >
        <FAB
          icon="flashlight"
          style={{
            position: 'absolute',
            margin: 25,
            right: 0,
            bottom: 0,
          }}
          onPress={() => toggleTorch()}
        />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
