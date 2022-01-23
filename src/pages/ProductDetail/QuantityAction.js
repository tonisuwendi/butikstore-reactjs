import { FiMinus, FiPlus } from 'react-icons/fi';

import classes from './QuantityAction.module.css';

const QuantityAction = () => (
  <div className={classes.quantity_action}>
    <button type="button">
      <FiMinus />
    </button>
    <input type="text" autoComplete="off" readOnly defaultValue={1} />
    <button type="button">
      <FiPlus />
    </button>
  </div>
);

export default QuantityAction;
