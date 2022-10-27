import React, { useRef, useState } from 'react';
import { registerUser } from '../../Service/auth.service';
import { createUser } from '../../Service/user.service';
import { IRegisterCredentials } from '../../Types/user.types';
import { UserExists } from '../../Utils/UserExists';
import classes from './RegisterForm.module.css';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal';
const RegisterForm: React.FC = () => {
  const [credentials, setCredentials] = useState<IRegisterCredentials>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  });

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [emailInputHasError, setEmailInputHasError] = useState(false);
  const [usernameInputHasError, setUsernameInputHasError] = useState(false);
  const [passwordInputHasError, setPasswordInputHasError] = useState(false);

  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);
  const [firstNameInputIsTouched, setFirstNameInputIsTouched] = useState(false);
  const [lastNameInputIsTouched, setLastNameInputIsTouched] = useState(false);
  const [usernameInputIsTouched, setUsernameInputIsTouched] = useState(false);
  const [passwordInputIsTouched, setPasswordInputIsTouched] = useState(false);

  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const firstNameInputRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastNameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const usernameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const navigate = useNavigate();

  const credentialHandler =
    (property: string) => (event: React.BaseSyntheticEvent) => {
      setCredentials({ ...credentials, [property]: event.target.value });
    };

  const inputOnBlurHandler =
    (isTouchedFunc: Function) => (event: React.BaseSyntheticEvent) => {
      if (!event.target.value) {
        isTouchedFunc(true);
        return;
      }
      isTouchedFunc(false);
    };

  const submitHandler = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const handleAuth = async () => {
      try {
        if (await UserExists(credentials.username)) {
          throw new Error('user-already-exists');
        }
        setEmailInputHasError(false);
        setUsernameInputHasError(false);
        setPasswordInputHasError(false);

        if (
          !emailInputRef.current.value ||
          !firstNameInputRef.current.value ||
          !lastNameInputRef.current.value ||
          !usernameInputRef.current.value ||
          !passwordInputRef.current.value
        ) {
          setToastMsg('Please fill all the inputs');
          setShowToast(true);
          return;
        }

        const res = await registerUser(credentials);
        await createUser(credentials, res.user.uid);
        navigate('/home', { replace: true });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('email-already-in-use')) {
            setEmailInputHasError(true);
            setEmailErrorMsg('Email already exists');
          }
          if (error.message.includes('invalid-email')) {
            setEmailInputHasError(true);
            setEmailErrorMsg('Invalid email');
          }
          if (error.message.includes('weak-password')) {
            setEmailErrorMsg('Password is too weak');
            setPasswordInputHasError(true);
          }
          if (error.message.includes('user-already-exists')) {
            setEmailErrorMsg('Username already exists');
            setUsernameInputHasError(true);
            return;
          }
        }
        console.log(error);
      }
    };
    handleAuth();
  };

  return (
    <div className={classes.container}>
      <ErrorModal
        message={toastMsg}
        show={showToast}
        handleClose={() => {
          setShowToast(false);
        }}
      />
      <form
        className={classes.form}
        onSubmit={submitHandler}
        autoComplete='off'
      >
        <div className={classes.title}>REGISTER</div>
        <div
          className={`${classes.password} ${
            emailInputHasError || emailInputIsTouched ? classes.invalid : ''
          } `}
        >
          <label htmlFor='registerEmail'>E-mail:</label>
          <input
            id='registerEmail'
            type='text'
            onChange={credentialHandler('email')}
            onBlur={inputOnBlurHandler(setEmailInputIsTouched)}
            ref={emailInputRef}
          ></input>
        </div>
        {emailInputHasError && (
          <p className={classes['input-has-error']}>{emailErrorMsg}</p>
        )}
        <div
          className={`${classes['first-name']} ${
            firstNameInputIsTouched ? classes.invalid : ''
          }`}
        >
          <label htmlFor='firstName'>First Name:</label>
          <input
            id='firstName'
            type='text'
            onChange={credentialHandler('firstName')}
            onBlur={inputOnBlurHandler(setFirstNameInputIsTouched)}
            ref={firstNameInputRef}
          ></input>
        </div>
        <div
          className={`${classes['last-name']} ${
            lastNameInputIsTouched ? classes.invalid : ''
          }`}
        >
          <label htmlFor='lastName'>Last Name:</label>
          <input
            id='lastName'
            type='text'
            onChange={credentialHandler('lastName')}
            onBlur={inputOnBlurHandler(setLastNameInputIsTouched)}
            ref={lastNameInputRef}
          ></input>
        </div>
        <div
          className={`${classes.username} ${
            usernameInputHasError || usernameInputIsTouched
              ? classes.invalid
              : ''
          }`}
        >
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            onChange={credentialHandler('username')}
            onBlur={inputOnBlurHandler(setUsernameInputIsTouched)}
            ref={usernameInputRef}
          ></input>
        </div>
        {usernameInputHasError && (
          <p className={classes['input-has-error']}>Username is taken</p>
        )}
        <div
          className={`${classes.password} ${
            passwordInputHasError || passwordInputIsTouched
              ? classes.invalid
              : ''
          }`}
        >
          <label htmlFor='registerPassword'>Password:</label>
          <input
            id='registerPassword'
            type='password'
            onChange={credentialHandler('password')}
            onBlur={inputOnBlurHandler(setPasswordInputIsTouched)}
            ref={passwordInputRef}
          ></input>
        </div>
        {passwordInputHasError && (
          <p className={classes['input-has-error']}>
            Password must contain at least 6 characters
          </p>
        )}
        <div className={classes['form-actions']}>
          <button className={classes.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
