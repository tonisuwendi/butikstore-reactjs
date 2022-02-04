import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/Auth/auth-context';

import classes from './Dashboard.module.css';

const Menu = ({ menu = 'dashboard' }) => {
  const authCtx = useContext(AuthContext);

  const underlineClasses = [classes.underline];
  if (menu === 'dashboard') {
    underlineClasses.push(classes.underlineFirst);
  } else if (menu === 'orders') {
    underlineClasses.push(classes.underlineSecond);
  }

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className={classes.menuWrapper}>
      <ul className={classes.menuList}>
        <li>
          <Link
            to="/dashboard"
            className={menu === 'dashboard' ? classes.menuActive : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/orders"
            className={menu === 'orders' ? classes.menuActive : ''}
          >
            Orders
          </Link>
        </li>
        <li>
          <span
            role="button"
            tabIndex="0"
            onKeyDown={logoutHandler}
            onClick={logoutHandler}
          >
            Logout
          </span>
        </li>
      </ul>
      <div className={underlineClasses.join(' ')} />
    </div>
  );
};

export default Menu;
