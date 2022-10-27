import React, { useRef, useState } from 'react';
import classes from './UpdateEmailElement.module.css';

interface IUpdateEmailElementProps {
  updateEmail: (email: string, password: string, newEmail: string) => void;
  myEmail: string;
}

const UpdateEmailElement: React.FC<IUpdateEmailElementProps> = (props) => {
  const [show, setShow] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const newEmailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleEditHandler = () => {
    setShow(!show);
    if (emailInputRef.current?.value) emailInputRef.current.value = '';
    if (passwordInputRef.current?.value) passwordInputRef.current.value = '';
    if (newEmailRef.current?.value) newEmailRef.current.value = '';
  };

  const updateEmail = () => {
    if (emailInputRef.current.value.length === 0) return;
    if (passwordInputRef.current.value.length < 6) return;
    if (emailInputRef.current.value.length === 0) return;
    props.updateEmail(
      emailInputRef.current.value,
      passwordInputRef.current.value,
      newEmailRef.current.value
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
        <form
          method='post'
          action='/form'
          autoComplete='off'
          className={classes['email-container']}
        >
          <input
            autoComplete='off'
            ref={emailInputRef}
            placeholder='Email'
            type='email'
          ></input>
          <input
            autoComplete='new-password'
            ref={passwordInputRef}
            type='password'
            placeholder='Password'
          ></input>
          <input
            autoComplete='new-password'
            ref={newEmailRef}
            type='email'
            placeholder='New Email'
          ></input>
          <i onClick={updateEmail} className='bi bi-check-lg'></i>
        </form>
      ) : (
        props.myEmail
      )}
    </span>
  );
};
export default UpdateEmailElement;
