import { type UIState } from './UIProvider';

type UIAction = { type: 'UI - Show Sidebar' } | { type: 'UI - Hide Sidebar' };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'UI - Show Sidebar':
      return {
        ...state,
        isSideMenuHide: false,
      };
    case 'UI - Hide Sidebar':
      return {
        ...state,
        isSideMenuHide: true,
      };
    default:
      return state;
  }
};
