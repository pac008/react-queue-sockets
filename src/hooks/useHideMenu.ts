import { useContext, useEffect } from 'react';
import { UIContext } from '../contexts';

export const useHideMenu = (hide: boolean): void => {
  const { showMenu, hideMenu } = useContext(UIContext);
  useEffect(() => {
    if (hide) {
      return hideMenu();
    }
    showMenu();
  }, [hide]);
};
