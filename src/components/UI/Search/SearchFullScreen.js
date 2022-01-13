import ReactDOM from "react-dom";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";

import classes from "./SearchFullScreen.module.css";

const Container = () => {
  return (
    <div className={classes.container}>
      <span>Type the keyword and hit enter</span>
      <form>
        <input type="text" placeholder="Start typing to search" />
        <span className={classes.searchIcon}>
          <IoSearchOutline />
        </span>
      </form>
      <button>
        <IoCloseCircle />
      </button>
    </div>
  );
};

const SearchFullSreen = () => {
  return ReactDOM.createPortal(
    <Container />,
    document.getElementById("searchWrapper")
  );
};

export default SearchFullSreen;
