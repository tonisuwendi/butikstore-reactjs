import { memo } from "react";
import classes from "./Button.module.css";

const Button = memo(({ title, size, type = "button" }) => {
  const buttonClasses = [
    classes.button,
    size === "sm" ? classes.button_sm : size === "lg" ? classes.button_lg : "",
  ];
  return (
    <button type={type} className={buttonClasses.join(" ")}>
      {title}
    </button>
  );
});

export default Button;
