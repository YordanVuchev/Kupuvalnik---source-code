import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './PageNotFound.module.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.main}>
      <h1>Page not found!</h1>
      <Button
        className={classes.button}
        type='button'
        onClick={() => navigate('/home')}
        variant='dark'
      >
        Go Home!
      </Button>
    </div>
  );
};
export default PageNotFound;
