import { memo } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import classes from './Button.module.css';

const Button = memo(
  ({
    title,
    loadingText = 'LOADING',
    loading,
    size,
    outline,
    submit,
    onClick,
    disabled,
    className,
  }) => {
    const buttonClasses = [
      outline ? classes.button_outline : classes.button,
      size === 'sm'
        ? classes.button_sm : size === 'lg'
          ? classes.button_lg : size === 'smv2'
            ? classes.button_smv2 : '',
      loading ? classes.button_disabled : '', className || '',
    ];
    return (
      <button
        disabled={disabled || loading}
        type={submit ? 'submit' : 'button'}
        className={buttonClasses.join(' ')}
        onClick={onClick}
      >
        {loading && <AiOutlineLoading3Quarters />}
        {' '}
        {loading ? loadingText : title}
      </button>
    );
  },
);

export default Button;
