import { Link } from 'react-router-dom';

import headerMenu from '../../data/header-menu';

import classes from './MainNavigation.module.css';

const MainNavigation = () => (
  <nav className={classes.nav}>
    <ul>
      {headerMenu.map((menu) => (
        <Link to={`/${menu.url}`} key={menu.id}>
          <li>{menu.text}</li>
        </Link>
      ))}
    </ul>
  </nav>
);

export default MainNavigation;
