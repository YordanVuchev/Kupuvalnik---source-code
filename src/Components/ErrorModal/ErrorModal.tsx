import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import classes from './ErrorModal.module.css';

interface IErrorModalProps {
  message: string;
  show: boolean;
  handleClose: () => void;
}

const ErrorModal: React.FC<IErrorModalProps> = (props) => {
  return (
    <Modal
      className={classes.modal}
      centered
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header className={classes.header} closeButton>
        <Modal.Title className={classes.title}>
          <span>
            <i className='bi bi-coin'></i>
          </span>{' '}
          KUPUVALNIK
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.message}>{props.message}</Modal.Body>
      <Modal.Footer className={classes.footer}>
        <Button
          className={classes.button}
          variant='secondary'
          onClick={props.handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
