import React, { useRef, useState } from 'react';
import store, { RootState } from '../../store/index';
import classes from './LoginForm.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { authActions } from '../../store/auth-slice';
import { loginUser } from '../../Service/auth.service';
import { getUserData } from '../../Service/user.service';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal';
import { classicNameResolver } from 'typescript';
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const userInfo = useAppSelector((state) => state.auth.userData);
  // console.log(userInfo);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [loginHasError, setLoginHasError] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);
  const [passwordInputIsTouched, setPasswordInputIsTouched] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const onBlurHandler =
    (isTouched: Function) => (event: React.BaseSyntheticEvent) => {
      if (event.target.value === '') {
        isTouched(true);
        return;
      }
      isTouched(false);
    };

  const submitHandler = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      if (email === '' || password === '') {
        setShowModal(true);
        setModalMsg('Please fill all the inputs');
        return;
      }
      const res = await loginUser({ email, password });
      const data = await getUserData(res.user.uid);
      dispatch(authActions.login(data.val()));
      setLoginHasError(false);
      navigate('/home', { replace: true });
    } catch (err) {
      setLoginHasError(true);
      if (err instanceof Error) {
        {
          if (err.message.includes('user-not-found')) {
            setErrorMsg('Email does not exist');
          }
          if (err.message.includes('invalid-email')) {
            setErrorMsg('Invalid email');
          }
          if (err.message.includes('wrong-password')) {
            setErrorMsg('Wrong password');
          }
        }
      }
    }
  };

  const registerNowClickHandler = () => {
    navigate('/register');
  };

  return (
    <div className={classes.container}>
      <ErrorModal
        message={modalMsg}
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.title}>LOGIN</div>
        <div
          className={`${classes.email} ${
            emailInputIsTouched ? classes.invalid : ''
          }`}
        >
          <label htmlFor='loginEmail'>E-mail:</label>
          <input
            id='loginEmail'
            type='text'
            onBlur={onBlurHandler(setEmailInputIsTouched)}
            ref={emailRef}
          ></input>
        </div>
        <div
          className={`${classes.email} ${
            passwordInputIsTouched ? classes.invalid : ''
          }`}
        >
          <label htmlFor='loginPassword'>Password:</label>
          <input
            id='loginPassword'
            type='password'
            onBlur={onBlurHandler(setPasswordInputIsTouched)}
            ref={passwordRef}
          ></input>
        </div>
        {loginHasError && (
          <p className={classes['error-message']}>{errorMsg}</p>
        )}
        <div className={classes['form-actions']}>
          <button className={classes.button}>Submit</button>
        </div>
        <p className={classes['register-now']}>
          Don't have an account? Register{' '}
          <span onClick={registerNowClickHandler}>now</span>!
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
