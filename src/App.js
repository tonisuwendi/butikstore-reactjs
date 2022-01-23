import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchModal from './components/UI/Search/SearchModal';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ProductCat from './pages/ProductCat';
import ProductDetail from './pages/ProductDetail';
import ShopAll from './pages/ShopAll';
import UIContext from './store/UI/ui-context';

const App = () => {
  const uiCtx = useContext(UIContext);

  return (
    <>
      {uiCtx.showSearch && <SearchModal />}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product-cat/:slug" component={ProductCat} />
        <Route path="/shop-all" component={ShopAll} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
