import { SocketProvider, UIProvider } from './contexts';
import { RouterPage } from './routes';

function App() {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />
      </UIProvider>
    </SocketProvider>
  );
}

export default App;
