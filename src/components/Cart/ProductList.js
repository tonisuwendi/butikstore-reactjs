import ProductItem from './ProductItem';

const ProductList = ({ products = [], withAction = false }) => (
  <div>
    {products.map((item) => (
      <ProductItem
        key={item.id}
        id={item.id}
        image={item.images?.length > 0 ? item.images[0] : item.image}
        title={item.title}
        price={item.price}
        qty={item.qty}
        slug={item.slug}
        withAction={withAction}
      />
    ))}
  </div>
);

export default ProductList;
