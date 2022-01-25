import { useContext, useState, useEffect } from 'react';
import UIContext from '../../../store/UI/ui-context';

import classes from './Toaster.module.css';

const Toaster = ({
  text, button = 'OK', error = false, timeout = 5000,
}) => {
  const [toasterHide, setToasterHide] = useState(false);
  const uiCtx = useContext(UIContext);
  const { toaster } = uiCtx;
  const hideToaster = () => {
    setToasterHide(true);
    setTimeout(() => {
      uiCtx.toggleToaster(null);
    }, 500);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      hideToaster();
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [toaster]);
  const toasterClasses = [
    classes.toaster,
    error ? classes.error : classes.default,
    toasterHide ? classes.hide : classes.show,
  ];
  return (
    <div className={toasterClasses.join(' ')}>
      <span>{text}</span>
      <span>
        <button type="button" onClick={hideToaster}>{button}</button>
      </span>
    </div>
  );
};

export default Toaster;
