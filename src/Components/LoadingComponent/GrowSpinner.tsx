import Spinner from 'react-bootstrap/Spinner';
import classes from './GrowSpinner.module.css';
function GrowSpinner() {
  return (
    <div className={classes.container}>
      <Spinner className={classes.spinner} animation='grow' />
      <Spinner className={classes.spinner} animation='grow' />
      <Spinner className={classes.spinner} animation='grow' />
      <Spinner className={classes.spinner} animation='grow' />
      <Spinner className={classes.spinner} animation='grow' />
    </div>
  );
}

export default GrowSpinner;
