import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button/Button';
import useInput from '../../hooks/use-input';

const LoginForm = () => {
  const {
    value: username,
    changeInput: changeUsername,
    blurInput: blurUsername,
    error: errorUsername,
  } = useInput();
  const {
    value: password,
    changeInput: changePassword,
    blurInput: blurPassword,
    error: errorPassword,
  } = useInput();

  return (
    <form>
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
      />
    </form>
  );
};

export default LoginForm;
