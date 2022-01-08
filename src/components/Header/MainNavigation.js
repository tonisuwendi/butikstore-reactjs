import headerMenu from "../../data/header-menu";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        {headerMenu.map((menu) => (
          <a href={menu.url} key={menu.id}>
            <li>{menu.text}</li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
