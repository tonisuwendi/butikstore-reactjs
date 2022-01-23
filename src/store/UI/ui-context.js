import { createContext, useCallback, useState } from 'react';

const UIContext = createContext({
  showSearch: false,
  showModal: false,
  toggleSearch: () => {},
  toggleModal: () => {},
});

export const UIContextProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSearchHandler = useCallback(() => {
    setShowSearch((prevState) => !prevState);
  }, []);
  const toggleModalHandler = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);

  const contextValue = {
    showSearch,
    showModal,
    toggleSearch: toggleSearchHandler,
    toggleModal: toggleModalHandler,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export default UIContext;
