import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

import UIContext from '../../store/UI/ui-context';
import classes from './Modal.module.css';

const Wrapper = ({ children }) => {
  const uiCtx = useContext(UIContext);
  const closeHandler = () => {
    uiCtx.toggleModal();
  };
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <button aria-label="close button" onClick={closeHandler} type="button">
          <FaTimes />
        </button>
        <div className={classes.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ children }) => (
  ReactDOM.createPortal(
    <Wrapper>{children}</Wrapper>,
    document.getElementById('modalWrapper'),
  )
);

export default Modal;
