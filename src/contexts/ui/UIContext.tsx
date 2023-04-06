import { createContext } from 'react';

interface ContextProps {
  isSideMenuHide: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
