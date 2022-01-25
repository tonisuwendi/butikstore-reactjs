import { useState, useCallback } from 'react';

import UIContext from './ui-context';

const UIProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toaster, setToaster] = useState(null);

  const toggleSearchHandler = useCallback(() => {
    setShowSearch((prevState) => !prevState);
  }, []);
  const toggleModalHandler = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);
  const toggleToasterHandler = useCallback((data) => {
    setToaster(data);
  }, []);

  const contextValue = {
    showSearch,
    showModal,
    toaster,
    toggleSearch: toggleSearchHandler,
    toggleModal: toggleModalHandler,
    toggleToaster: toggleToasterHandler,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export default UIProvider;
