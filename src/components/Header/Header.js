import classes from "./Header.module.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__top}>
        <p>Free Shipping to All Over Indonesia*</p>
      </div>
      <div className={classes.header__main}>
        <div className={classes.header__main_core}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};

export default Header;
