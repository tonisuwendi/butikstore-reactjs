import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import Button from "../UI/Button/Button";

import classes from "./HeaderRight.module.css";

const HeaderRight = () => {
  return (
    <div className={classes.headerright}>
      <Button title="LOGIN / REGISTER" size="sm" />
      <span>
        <IoSearchOutline />
      </span>
      <span>
        <IoCartOutline />
      </span>
    </div>
  );
};

export default HeaderRight;
