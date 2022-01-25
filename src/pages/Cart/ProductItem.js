import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import QuantityAction from '../../components/QuantityAction/QuantityAction';
import { printFormatPrice } from '../../lib/function';

import classes from './ProductItem.module.css';

const ProductItem = ({
  image, title, price, qty, slug,
}) => (
  <div className={classes.item}>
    <Link to={`/product/${slug}`}>
      <img
        src={image}
        alt={title}
      />
    </Link>
    <div className={classes.info}>
      <Link to={`/product/${slug}`}>
        <h3>{title}</h3>
      </Link>
      <p>{`Rp${printFormatPrice(price)}`}</p>
      <div className={classes.actions}>
        <QuantityAction quantity={qty} onQuantity={() => {}} smallAction />
        <button type="button" className={classes.trash}>
          <FaTrash />
        </button>
      </div>
    </div>
  </div>
);

export default ProductItem;
