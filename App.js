import { PaperProvider } from 'react-native-paper';
import { TabsManager } from './pages/TabsManager';
import { ContextProvider } from './components/ContextProvider.js';

export default function App() {
  return (
    <ContextProvider>
      <PaperProvider theme={{ version: 2 }}>
        <TabsManager />
      </PaperProvider>
    </ContextProvider>
  );
}

{/* <Button icon={{ uri: 'https://webstockreview.net/images/pikachu-clipart-png-icon-13.png' }}> */ }
