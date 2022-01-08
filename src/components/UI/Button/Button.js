import classes from "./Button.module.css";

const Button = ({ title, size, type = "button" }) => {
  const buttonClasses = [
    classes.button,
    size === "sm" ? classes.button_sm : "",
  ];
  return (
    <button type={type} className={buttonClasses.join(" ")}>
      {title}
    </button>
  );
};

export default Button;
