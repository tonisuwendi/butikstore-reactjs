import { useState, useEffect } from 'react';

import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button/Button';
import useInput from '../../hooks/use-input';

import classes from './Auth.module.css';

const RegisterForm = ({
  isLoading, error, responseData, onRegister, onSuccess, onNotLoading,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: name,
    changeInput: changeName,
    blurInput: blurName,
    error: errorName,
    isValid: nameIsValid,
    setInputError: setInputNameError,
  } = useInput();
  const {
    value: phone,
    changeInput: changePhone,
    blurInput: blurphone,
    error: errorPhone,
    isValid: phoneIsValid,
    setInputError: setInputPhoneError,
  } = useInput();
  const {
    value: username,
    changeInput: changeUsername,
    blurInput: blurUsername,
    error: errorUsername,
    isValid: usernameIsValid,
    setInputError: setInputUsernameError,
  } = useInput();
  const {
    value: email,
    changeInput: changeEmail,
    blurInput: blurEmail,
    error: errorEmail,
    isValid: emailIsValid,
    setInputError: setInputEmailError,
  } = useInput();
  const {
    value: password,
    changeInput: changePassword,
    blurInput: blurPassword,
    error: errorPassword,
    isValid: passwordIsValid,
    setInputError: setInputPasswordError,
  } = useInput();

  useEffect(() => {
    if (nameIsValid
      && phoneIsValid
      && usernameIsValid
      && emailIsValid
      && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsValid, phoneIsValid, usernameIsValid, emailIsValid, passwordIsValid]);

  useEffect(() => {
    if (!isLoading) {
      onNotLoading();
    }
    if (!isLoading && error) {
      setInputNameError(error.name);
      setInputPhoneError(error.phone);
      setInputUsernameError(error.username);
      setInputEmailError(error.email);
      setInputPasswordError(error.password);
    }
    if (!isLoading && !error && responseData?.message) {
      onSuccess();
    }
  }, [isLoading, error, responseData]);

  const registerHandler = (event) => {
    event.preventDefault();
    const data = {
      name, phone, username, email, password,
    };
    onRegister(data);
  };

  const buttonClasses = [classes.button, formIsValid && !isLoading ? '' : classes.buttonInActive];

  return (
    <form onSubmit={registerHandler}>
      <Input
        id="name"
        label="Full name *"
        value={name}
        onChange={changeName}
        onBlur={blurName}
        error={errorName}
      />
      <Input
        id="phone"
        label="Phone *"
        value={phone}
        onChange={changePhone}
        onBlur={blurphone}
        error={errorPhone}
      />
      <Input
        id="username"
        label="Username *"
        value={username}
        onChange={changeUsername}
        onBlur={blurUsername}
        error={errorUsername}
      />
      <Input
        id="email"
        label="Email address *"
        value={email}
        onChange={changeEmail}
        onBlur={blurEmail}
        error={errorEmail}
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
        loading={isLoading}
        disabled={!formIsValid || isLoading}
        title="Register"
        size="lg"
        className={buttonClasses.join(' ')}
      />
    </form>
  );
};

export default RegisterForm;
