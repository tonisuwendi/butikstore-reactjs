import { VscLoading } from "react-icons/vsc";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.loading}>
      <span>
        <VscLoading />
      </span>
    </div>
  );
};

export default LoadingSpinner;
