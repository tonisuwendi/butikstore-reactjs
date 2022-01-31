import classes from './Form.module.css';

const Input = ({
  id, label, placeholder, value = '', onChange, onBlur, error,
}) => (
  <div className={`${classes['form-group']} ${error ? classes.formError : ''}`}>
    <label htmlFor={id}>{label}</label>
    <input
      type="text"
      id={id}
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={value.trim().length > 0 ? classes.inputActive : ''}
    />
    {error && <small>{error}</small>}
  </div>
);

export default Input;
