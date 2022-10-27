import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { uploadComment } from '../../Service/comment.service';
import classes from './AddNewCommentModal.module.css';

interface IAddNewCommentModal {
  show: boolean;
  handleClose: () => void;
  uploadComment: (comment: string) => void;
}

const AddNewCommentModal: React.FC<IAddNewCommentModal> = (props) => {
  const textAreaRef = useRef() as
    | React.MutableRefObject<HTMLTextAreaElement>
    | undefined;

  const handleClick = () => {
    props.uploadComment(textAreaRef!.current.value);
  };

  return (
    <Modal
      className={classes.modal}
      centered
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header className={classes.header}>
        <Modal.Title className={classes.title}>New comment</Modal.Title>
      </Modal.Header>

      <Modal.Body className={classes.body}>
        <textarea rows={4} ref={textAreaRef} />
      </Modal.Body>

      <Modal.Footer className={classes.footer}>
        <button className={classes.button} onClick={props.handleClose}>
          Cancel
        </button>
        <button
          className={`${classes.button} ${classes['button-primary']}`}
          onClick={handleClick}
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewCommentModal;
