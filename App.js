import { PaperProvider } from 'react-native-paper';
import { TabsManager } from './pages/TabsManager';
import { SqliteApiProvider } from './functions/PokeCatcher';

export default function App() {
  SqliteApiProvider();

  return (
    <PaperProvider theme={{ version: 2 }}>
      <TabsManager />
    </PaperProvider>
  );
}

{/* <Button icon={{ uri: 'https://webstockreview.net/images/pikachu-clipart-png-icon-13.png' }}> */ }
{/*   Catch'em all! */ }
{/* </Button> */ }
