import { useContext, memo } from "react";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import UIContext from "../../store/UI/ui-context";
import Button from "../UI/Button/Button";

import classes from "./HeaderRight.module.css";

const HeaderRight = memo(() => {
  const uiCtx = useContext(UIContext);

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };

  return (
    <div className={classes.headerright}>
      <Button title="LOGIN / REGISTER" size="sm" />
      <span onClick={toggleSearchHandler}>
        <IoSearchOutline />
      </span>
      <span>
        <IoCartOutline />
      </span>
    </div>
  );
});

export default HeaderRight;
