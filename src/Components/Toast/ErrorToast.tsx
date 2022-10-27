import React from 'react';
import Toast from 'react-bootstrap/Toast';
import classes from './ErrorToast.module.css';
interface IErrorToastProps {
  message: string;
  show: boolean;
  toggleShow: () => void;
}

const ErrorToast: React.FC<IErrorToastProps> = (props) => {
  const exclamationIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classes['exclamation-icon']}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
      />
    </svg>
  );

  return (
    <Toast show={props.show} onClose={props.toggleShow}>
      <Toast.Header>
        {exclamationIcon}
        <strong className='me-auto'>KUPUVALNIK</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
};

export default ErrorToast;
