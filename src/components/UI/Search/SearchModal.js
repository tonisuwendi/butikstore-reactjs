import { useContext, useEffect, useRef, memo } from "react";
import ReactDOM from "react-dom";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import UIContext from "../../../store/UI/ui-context";

import classes from "./SearchModal.module.css";

const Container = memo(() => {
  const inputRef = useRef();
  const uiCtx = useContext(UIContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };

  return (
    <div className={classes.container}>
      <span>Type the keyword and hit enter</span>
      <form>
        <input
          type="text"
          placeholder="Start typing to search"
          ref={inputRef}
        />
        <span className={classes.searchIcon}>
          <IoSearchOutline />
        </span>
      </form>
      <button onClick={toggleSearchHandler}>
        <IoCloseCircle />
      </button>
    </div>
  );
});

const SearchModal = () => {
  return ReactDOM.createPortal(
    <Container />,
    document.getElementById("searchWrapper")
  );
};

export default SearchModal;
