import {
  useContext, useEffect, useRef, memo,
} from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { IoSearchOutline, IoCloseCircle } from 'react-icons/io5';
import UIContext from '../../../store/UI/ui-context';

import classes from './SearchModal.module.css';

const Container = memo(() => {
  const inputRef = useRef();
  const history = useHistory();
  const uiCtx = useContext(UIContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const keyword = inputRef.current.value;
    history.push(`/search/${keyword}`);
    uiCtx.toggleSearch();
  };

  return (
    <div className={classes.container}>
      <span>Type the keyword and hit enter</span>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Start typing to search"
          ref={inputRef}
        />
        <button type="submit">
          <span className={classes.searchIcon}>
            <IoSearchOutline />
          </span>
        </button>
      </form>
      <button
        type="button"
        className={classes.closeButton}
        onClick={toggleSearchHandler}
      >
        <IoCloseCircle />
      </button>
    </div>
  );
});

const SearchModal = () => ReactDOM.createPortal(
  <Container />,
  document.getElementById('searchWrapper'),
);

export default SearchModal;
