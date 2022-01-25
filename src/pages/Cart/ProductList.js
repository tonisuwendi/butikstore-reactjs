import { useContext } from 'react';

import ProductItem from './ProductItem';
import CartContext from '../../store/Cart/cart-context';

const ProductList = () => {
  const cartCtx = useContext(CartContext);
  return (
    <div>
      {cartCtx.items.map((item) => (
        <ProductItem
          key={item.cartId}
          id={item.cartId}
          image={item.images[0]}
          title={item.title}
          price={item.price}
          qty={item.qty}
          slug={item.slug}
        />
      ))}
    </div>
  );
};

export default ProductList;
