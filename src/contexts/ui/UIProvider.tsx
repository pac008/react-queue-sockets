import { type FC, useReducer } from 'react';
import { UIContext, uiReducer} from './';

export interface UIState {
    isSideMenuHide: boolean;
}

export const UIInitialState: UIState = {
    isSideMenuHide: false,
};

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const UIProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitialState);
    const showMenu = () => {
        dispatch({type: 'UI - Show Sidebar'})
    }
    const hideMenu = () => {
        dispatch({type: 'UI - Hide Sidebar'})
    }
  return (
    <UIContext.Provider value={{...state, hideMenu, showMenu}}>
      {children}
    </UIContext.Provider>
  )
};