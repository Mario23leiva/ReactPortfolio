import { createContext, useContext } from 'react';

// Lo que una ventana sin barra superior (frameless) pasa a su app para que pinte
// su propia barra: { win, title, titleId, dragProps }
export const WindowFrameContext = createContext(null);

export const useWindowFrame = () => useContext(WindowFrameContext);
