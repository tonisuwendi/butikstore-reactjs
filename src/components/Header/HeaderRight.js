import { useContext, memo } from 'react';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import UIContext from '../../store/UI/ui-context';
import Button from '../UI/Button/Button';

import classes from './HeaderRight.module.css';

const HeaderRight = memo(() => {
  const uiCtx = useContext(UIContext);

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };

  return (
    <div className={classes.headerright}>
      <Button title="LOGIN / REGISTER" size="sm" />
      <button className={classes.iconMenu} type="button" onClick={toggleSearchHandler}>
        <IoSearchOutline />
      </button>
      <span className={classes.iconMenu} type="button">
        <IoCartOutline />
      </span>
    </div>
  );
});

export default HeaderRight;
