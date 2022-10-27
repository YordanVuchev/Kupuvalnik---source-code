import React, { useRef, useState } from 'react';
import { MIN_PASSWORD_LENGTH } from '../../../Common/constans';
import classes from './UpdatePassElement.module.css';

interface IUpdatePassElementProps {
  updatePassword: (
    email: string,
    password: string,
    newPassword: string
  ) => void;
}

const UpdatePassElement: React.FC<IUpdatePassElementProps> = (props) => {
  const [show, setShow] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidNewPass, setInvalidNewPass] = useState(false);
  const [invalidMatch, setInvalidMatch] = useState(false);

  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const oldPassInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const newPassInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const ConfirmInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleEditHandler = () => {
    setShow(!show);
    setInvalidEmail(false);
    setInvalidPass(false);
    setInvalidNewPass(false);
    setInvalidMatch(false);
    if (emailInputRef.current?.value) emailInputRef.current.value = '';
    if (oldPassInputRef.current?.value) oldPassInputRef.current.value = '';
    if (newPassInputRef.current?.value) newPassInputRef.current.value = '';
    if (ConfirmInputRef.current?.value) ConfirmInputRef.current.value = '';
  };

  const updatePassword = () => {
    let invalidInput = false;
    if (emailInputRef.current.value.length === 0) {
      invalidInput = true;
      setInvalidEmail(true);
    }
    if (oldPassInputRef.current.value.length < MIN_PASSWORD_LENGTH) {
      invalidInput = true;
      setInvalidPass(true);
    }
    if (newPassInputRef.current.value.length < MIN_PASSWORD_LENGTH) {
      invalidInput = true;
      setInvalidNewPass(true);
    }
    if (newPassInputRef.current.value !== ConfirmInputRef.current.value) {
      invalidInput = true;
      setInvalidMatch(true);
    }
    if (invalidInput) return;

    setInvalidEmail(false);
    setInvalidPass(false);
    setInvalidNewPass(false);
    setInvalidMatch(false);

    props.updatePassword(
      emailInputRef.current.value,
      oldPassInputRef.current.value,
      newPassInputRef.current.value
    );
    toggleEditHandler();
  };

  return (
    <span className={classes.main}>
      <i
        className={show ? 'bi bi-x-lg' : 'bi bi-pencil-fill'}
        onClick={toggleEditHandler}
      ></i>
      {show ? (
        <form autoComplete='off' className={classes['password-container']}>
          <input
            onChange={() => setInvalidEmail(false)}
            autoComplete='off'
            placeholder='Email'
            ref={emailInputRef}
            type='email'
            required
          ></input>
          {invalidEmail && (
            <label className={classes.invalid}>Invalid Email!</label>
          )}
          <input
            onChange={() => setInvalidPass(false)}
            autoComplete='new-password'
            placeholder='Password'
            ref={oldPassInputRef}
            type='password'
          ></input>
          {invalidPass && (
            <label className={classes.invalid}>
              Password must be at least {MIN_PASSWORD_LENGTH} symbols long!
            </label>
          )}
          <input
            onChange={() => setInvalidNewPass(false)}
            autoComplete='new-password'
            placeholder='New Password'
            ref={newPassInputRef}
            type='password'
          ></input>
          {invalidNewPass && (
            <label className={classes.invalid}>
              Password must be at least {MIN_PASSWORD_LENGTH} symbols long!
            </label>
          )}
          <input
            onChange={() => setInvalidMatch(false)}
            autoComplete='new-password'
            placeholder='Confirm New Password'
            ref={ConfirmInputRef}
            type='password'
          ></input>
          {invalidMatch && (
            <label className={classes.invalid}>Passwords do NOT match!</label>
          )}
          <i onClick={updatePassword} className='bi bi-check-lg'></i>
        </form>
      ) : (
        'password'
      )}
    </span>
  );
};
export default UpdatePassElement;
