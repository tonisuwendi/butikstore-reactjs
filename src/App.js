import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import SearchModal from "./components/UI/Search/SearchModal";
import HomePage from "./pages/Home/Home";
import ProductCat from "./pages/ProductCat";
import ShopAll from "./pages/ShopAll";
import UIContext from "./store/UI/ui-context";

const App = () => {
  const uiCtx = useContext(UIContext);

  return (
    <Fragment>
      {uiCtx.showSearch && <SearchModal />}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product-cat/:slug" component={ProductCat} />
        <Route path="/shop-all" component={ShopAll} />
      </Switch>
    </Fragment>
  );
};

export default App;
