import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchModal from './components/UI/Search/SearchModal';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ProductCat from './pages/ProductCat';
import ProductDetail from './pages/ProductDetail';
import ShopAll from './pages/ShopAll';
import Cart from './pages/Cart';
import UIContext from './store/UI/ui-context';
import Toaster from './components/UI/Toaster/Toaster';
import LoadingFullScreen from './components/UI/Loading/LoadingFullScreen';

const App = () => {
  const uiCtx = useContext(UIContext);
  const { showSearch, toaster, loading } = uiCtx;

  return (
    <>
      {showSearch && <SearchModal />}
      {toaster && <Toaster text={toaster.text} button={toaster.button} error={toaster.error} />}
      {loading === 'FULLSCREEN' && <LoadingFullScreen />}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product-cat/:slug" component={ProductCat} />
        <Route path="/shop-all" component={ShopAll} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
