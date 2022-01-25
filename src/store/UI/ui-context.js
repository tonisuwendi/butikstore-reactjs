import { createContext } from 'react';

const UIContext = createContext({
  showSearch: false,
  showModal: false,
  toaster: null,
  toggleSearch: () => {},
  toggleModal: () => {},
  toggleToaster: () => {},
});

export default UIContext;
