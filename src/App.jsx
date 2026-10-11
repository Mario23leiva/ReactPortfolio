import { useCallback, useState } from 'react'
import BlockedScreen from './screens/blocked_screen/BlockedScreen.jsx';
import MainScreen from './screens/main_screen/MainScreen.jsx';

function App() {
  // entered: la pantalla principal ya está montada; lockVisible: el bloqueo sigue encima
  // (mientras hace su animación de salida, la pantalla principal se ve debajo)
  const [entered, setEntered] = useState(false);
  const [lockVisible, setLockVisible] = useState(true);
  const handleEnter = useCallback(() => setEntered(true), []);
  const handleExited = useCallback(() => setLockVisible(false), []);

  return (
    <>
      {entered && <MainScreen />}
      {lockVisible && (
        <BlockedScreen onEnter={handleEnter} onExited={handleExited} />
      )}
    </>
  );
}

export default App
