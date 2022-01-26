import {
  useState, useEffect, useContext, useCallback,
} from 'react';
import UIContext from '../store/UI/ui-context';

const useToaster = ({
  isSuccess, isFailed, textSuccess, textFailed, onSuccess, onFailed = false,
}) => {
  const [highlighted, setHighlighted] = useState(false);
  const uiCtx = useContext(UIContext);
  useEffect(() => {
    if (!highlighted) {
      return;
    }
    if (isFailed) {
      uiCtx.toggleToaster({
        text: textFailed,
        error: true,
      });
      setHighlighted(false);
      if (onFailed) onFailed();
    }
    if (isSuccess) {
      uiCtx.toggleToaster({
        text: textSuccess,
      });
      setHighlighted(false);
      onSuccess();
    }
  }, [isSuccess, isFailed, highlighted]);
  const highlightedHandler = useCallback((data) => {
    setHighlighted(data);
  }, []);
  return {
    highlightedHandler,
  };
};

export default useToaster;
