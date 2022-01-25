import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import ButtonATC from './ButtonATC';
import QuantityAction from '../../components/QuantityAction/QuantityAction';
import { shareProduct } from '../../data/external-link';
import { printFormatPrice } from '../../lib/function';

import classes from './InfoProduct.module.css';

const InfoProduct = ({
  idProduct, title, price, shortDescription, sizeGuide, sizeChart, stock, categories, onImageSize,
}) => {
  const [inputQuantity, setInputQuantity] = useState(1);
  return (
    <div className={classes.info_product}>
      <h1 className={classes.main_info_title}>
        {title}
      </h1>
      <h3 className={classes.main_info_price}>{`Rp${printFormatPrice(price)}`}</h3>
      <p className={classes.main_short_desc}>
        {shortDescription}
      </p>
      <div className={classes.main_actions}>
        <QuantityAction stock={stock} onQuantity={(qty) => setInputQuantity(qty)} />
        <ButtonATC quantity={inputQuantity} idProduct={idProduct} />
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
