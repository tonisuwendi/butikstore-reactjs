import classes from './Form.module.css';

const Input = ({
  id, label, placeholder, value = '', onChange, onBlur, error,
}) => (
  <div className={`${classes['form-group']} ${error ? classes.formError : ''}`}>
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={value.trim().length > 0 ? classes.inputActive : ''}
      value={value}
    />
    {error && <small>{error}</small>}
  </div>
);

export default Input;
