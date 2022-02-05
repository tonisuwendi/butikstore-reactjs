import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchModal from './components/UI/Search/SearchModal';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ProductCat from './pages/ProductCat';
import ProductDetail from './pages/ProductDetail';
import ShopAll from './pages/ShopAll';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Successfully from './pages/Successfully';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import UIContext from './store/UI/ui-context';
import Toaster from './components/UI/Toaster/Toaster';
import LoadingFullScreen from './components/UI/Loading/LoadingFullScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import DashboardOrders from './pages/Dashboard/Orders';
import DashboardOrderDetail from './pages/Dashboard/OrderDetail';

const App = () => {
  const uiCtx = useContext(UIContext);
  const { showSearch, toaster, loading } = uiCtx;

  return (
    <>
      {showSearch && <SearchModal />}
      {toaster && (
        <Toaster text={toaster.text} button={toaster.button} error={toaster.error} timeout={toaster.timeout} />
      )}
      {loading === 'FULLSCREEN' && <LoadingFullScreen />}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product-cat/:slug" component={ProductCat} />
        <Route path="/shop-all" component={ShopAll} />
        <Route path="/search/:keyword" component={Search} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/successfully/:orderNumber" component={Successfully} />
        <ProtectedRoute path="/register" component={Register} auth />
        <ProtectedRoute path="/login" component={Login} auth />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/dashboard/orders" component={DashboardOrders} />
        <ProtectedRoute path="/dashboard/order/:orderNumber" component={DashboardOrderDetail} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
