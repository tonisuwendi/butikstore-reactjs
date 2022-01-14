import { Fragment, useContext } from "react";
import SearchModal from "./components/UI/Search/SearchModal";
import HomePage from "./pages/Home/Home";
import UIContext from "./store/UI/ui-context";

const App = () => {
  const uiCtx = useContext(UIContext);

  return (
    <Fragment>
      {uiCtx.showSearch && <SearchModal />}
      <HomePage />
    </Fragment>
  );
};

export default App;
