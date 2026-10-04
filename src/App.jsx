import { useState } from 'react'
import BlockedScreen from './screens/blocked_screen/BlockedScreen.jsx';
import MainScreen from './screens/main_screen/MainScreen.jsx';

function App() {
  const [showMainScreen, setShowMainScreen] = useState(false);

  // Función para mostrar la pantalla principal
  const handleEnter = () => {
    setShowMainScreen(true);
  };

  return (
    <>
      {/* Renderizar la pantalla principal solo si showMainScreen es true */}
      {showMainScreen ? (
        <MainScreen />
      ) : (
        <BlockedScreen onEnter={handleEnter} />
      )}
    </>
  );
}

export default App
