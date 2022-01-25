import { useState, useEffect } from 'react';

import { FiMinus, FiPlus } from 'react-icons/fi';

import classes from './QuantityAction.module.css';

const QuantityAction = ({
  stock = 10, quantity = 1, onQuantity, smallAction = false,
}) => {
  const qAClasses = [classes.quantity_action, smallAction ? classes.quantity_action_small : ''];
  const [enteredQuantity, setEnteredQuantity] = useState(quantity);
  useEffect(() => {
    onQuantity(enteredQuantity);
  }, [enteredQuantity]);
  const plusQuantityHandler = () => {
    setEnteredQuantity((prevState) => {
      if (prevState < stock) {
        return prevState + 1;
      }
      return prevState;
    });
  };
  const minusQuantityHandler = () => {
    setEnteredQuantity((prevState) => {
      if (prevState > 1) {
        return prevState - 1;
      }
      return prevState;
    });
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
