import { useState } from 'react';

import { FiMinus, FiPlus } from 'react-icons/fi';

import classes from './QuantityAction.module.css';

const QuantityAction = ({
  stock = 10, quantity = 1, onQuantity, smallAction = false,
}) => {
  const qAClasses = [classes.quantity_action, smallAction ? classes.quantity_action_small : ''];
  const [enteredQuantity, setEnteredQuantity] = useState(quantity);
  const plusQuantityHandler = () => {
    if (enteredQuantity < stock) {
      setEnteredQuantity((prevState) => prevState + 1);
      onQuantity(enteredQuantity + 1);
    }
  };
  const minusQuantityHandler = () => {
    if (enteredQuantity > 1) {
      setEnteredQuantity((prevState) => prevState - 1);
      onQuantity(enteredQuantity - 1);
    }
  };
  return (
    <div className={qAClasses.join(' ')}>
      <button type="button" onClick={minusQuantityHandler}>
        <FiMinus />
      </button>
      <input type="text" autoComplete="off" readOnly value={enteredQuantity} />
      <button type="button" onClick={plusQuantityHandler}>
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantityAction;
