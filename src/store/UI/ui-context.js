import { createContext } from 'react';

const UIContext = createContext({
  showSearch: false,
  showModal: false,
  toaster: null,
  loading: '',
  toggleSearch: () => {},
  toggleModal: () => {},
  toggleToaster: () => {},
  toggleLoading: () => {},
});

export default UIContext;
