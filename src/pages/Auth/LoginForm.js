import { useEffect, useState } from 'react';

import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button/Button';
import useInput from '../../hooks/use-input';

import classes from './Auth.module.css';

const LoginForm = ({
  isLoading, onLogin,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: username,
    changeInput: changeUsername,
    blurInput: blurUsername,
    error: errorUsername,
    isValid: usernameIsValid,
  } = useInput();
  const {
    value: password,
    changeInput: changePassword,
    blurInput: blurPassword,
    error: errorPassword,
    isValid: passwordIsValid,
  } = useInput();

  useEffect(() => {
    if (usernameIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [usernameIsValid, passwordIsValid]);

  const loginHandler = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    onLogin(data);
  };

  const buttonClasses = [classes.button, formIsValid && !isLoading ? '' : classes.buttonInActive];

  return (
    <form onSubmit={loginHandler}>
      <Input
        id="username"
        label="Username *"
        value={username}
        onChange={changeUsername}
        onBlur={blurUsername}
        error={errorUsername}
      />
      <Input
        id="password"
        label="Password *"
        value={password}
        onChange={changePassword}
        onBlur={blurPassword}
        error={errorPassword}
      />
      <Button
        submit
        title="Login"
        size="lg"
        className={buttonClasses.join(' ')}
      />
    </form>
  );
};

export default LoginForm;
