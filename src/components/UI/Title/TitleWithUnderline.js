import { memo } from "react";
import classes from "./TitleWithUnderline.module.css";

const TitleWithUnderline = memo(({ title, mt = 70, mb = 40 }) => {
  return (
    <div
      className={classes.title}
      style={{ marginTop: `${mt}px`, marginBottom: `${mb}px` }}
    >
      <h3>{title}</h3>
    </div>
  );
});

export default TitleWithUnderline;
