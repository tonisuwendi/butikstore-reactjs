import { useCallback, useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(null);
  const [inputIsValid, setInputIsValid] = useState(false);

  const changeInputHandler = useCallback((event) => {
    const { value } = event.target;
    setInputError(null);
    setInputValue(value);
    if (value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  }, []);

  const blurInputHandler = useCallback(() => {
    if (inputValue.trim() === '') {
      setInputError('Input cannot be empty.');
    }
  }, [inputValue]);

  const setInputErrorHandler = useCallback((data) => {
    setInputError(data || false);
    setInputIsValid(!data);
  }, []);

  return {
    value: inputValue,
    error: inputError,
    isValid: inputIsValid,
    changeInput: changeInputHandler,
    blurInput: blurInputHandler,
    setInputError: setInputErrorHandler,
  };
};

export default useInput;
