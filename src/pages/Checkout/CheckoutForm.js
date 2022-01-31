import { useEffect } from 'react';

import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import useInput from '../../hooks/use-input';

import classes from './Checkout.module.css';

const CheckoutForm = ({ onFormIsValid, onFormData }) => {
  const {
    value: name,
    changeInput: changeName,
    blurInput: blurName,
    error: errorName,
    isValid: nameIsValid,
  } = useInput();
  const {
    value: phone,
    changeInput: changePhone,
    blurInput: blurPhone,
    error: errorPhone,
    isValid: phoneIsValid,
  } = useInput();
  const {
    value: postalCode,
    changeInput: changePostalCode,
    blurInput: blurPostalCode,
    error: errorPostalCode,
    isValid: postalCodeIsValid,
  } = useInput();
  const {
    value: address,
    changeInput: changeAddress,
    blurInput: blurAddress,
    error: errorAddress,
    isValid: addressIsValid,
  } = useInput();
  const {
    value: notes,
    changeInput: changeNotes,
  } = useInput();

  useEffect(() => {
    if (nameIsValid
      && phoneIsValid
      && postalCodeIsValid
      && addressIsValid) {
      onFormIsValid(true);
    } else {
      onFormIsValid(false);
    }
  }, [nameIsValid, phoneIsValid, postalCodeIsValid, addressIsValid]);

  useEffect(() => {
    const data = {
      name, phone, postalCode, address, notes,
    };
    onFormData(data);
  }, [name, phone, postalCode, address, notes]);

  return (
    <>
      <div className={classes.item}>
        <h2 className={classes.title}>Billing &amp; Shipping</h2>
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
          onBlur={blurPhone}
          error={errorPhone}
        />
        <Input
          id="postalcode"
          label="Postal code *"
          value={postalCode}
          onChange={changePostalCode}
          onBlur={blurPostalCode}
          error={errorPostalCode}
        />
        <Textarea
          id="address"
          label="Full address *"
          value={address}
          onChange={changeAddress}
          onBlur={blurAddress}
          error={errorAddress}
        />
      </div>
      <div className={classes.item}>
        <h2 className={classes.title}>Additional Information</h2>
        <Textarea
          id="notes"
          label="Order notes (optional)"
          value={notes}
          onChange={changeNotes}
        />
      </div>
    </>
  );
};

export default CheckoutForm;
