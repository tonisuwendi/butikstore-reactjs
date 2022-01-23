import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import QuantityAction from './QuantityAction';
import { shareProduct } from '../../data/external-link';

import classes from './InfoProduct.module.css';

const InfoProduct = ({
  title, price, shortDescription, sizeGuide, sizeChart, categories, onImageSize,
}) => {
  const priceFormat = new Intl.NumberFormat('id-ID').format(price);
  return (
    <div className={classes.info_product}>
      <h1 className={classes.main_info_title}>
        {title}
      </h1>
      <h3 className={classes.main_info_price}>{`Rp${priceFormat}`}</h3>
      <p className={classes.main_short_desc}>
        {shortDescription}
      </p>
      <div className={classes.main_actions}>
        <QuantityAction />
        <button type="button" className={classes.add_to_cart_button}>Add to cart</button>
      </div>
      <div className={classes.buttons_size}>
        <Button onClick={() => onImageSize(sizeGuide)} title="SIZE GUIDE" size="sm" />
        <Button onClick={() => onImageSize(sizeChart)} title="SIZE CHART" size="sm" />
      </div>
      <div className={classes.main_categories}>
        <p>Categories:</p>
        {categories.map((category) => (
          <Link key={category.id} to={`/product-cat/${category.slug}`}>{category.title}</Link>
        )).reduce((prev, curr) => [prev, ', ', curr])}
      </div>
      <div className={classes.buttons_share}>
        <p>Share:</p>
        {shareProduct.map((share) => (
          <a href={share.url} key={share.id} target="_blank" rel="noreferrer">
            {share.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default InfoProduct;
