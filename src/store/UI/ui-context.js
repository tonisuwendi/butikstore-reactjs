import { createContext, useCallback, useState } from "react";

const UIContext = createContext({
  showSearch: false,
  toggleSearch: () => {},
});

export const UIContextProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearchHandler = useCallback(() => {
    setShowSearch((prevState) => !prevState);
  }, []);

  const contextValue = {
    showSearch,
    toggleSearch: toggleSearchHandler,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export default UIContext;
