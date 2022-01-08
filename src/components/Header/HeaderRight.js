import Button from "../UI/Button/Button";

import classes from "./HeaderRight.module.css";

const HeaderRight = () => {
  return (
    <div className={classes.headerright}>
      <Button title="LOGIN / REGISTER" size="sm" />
    </div>
  );
};

export default HeaderRight;
