import classes from './Menu.module.css';
import footerClasses from './Footer.module.css';

const Menu = ({ title, menus }) => (
  <div className={classes.menus}>
    <p className={footerClasses.title}>{title}</p>
    <ul>
      {menus.map((menu) => (
        <li key={menu.id}>
          <a href={menu.url}>{menu.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Menu;
