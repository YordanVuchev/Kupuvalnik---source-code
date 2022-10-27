import React, { useState } from 'react';
import classes from './AddNewAdModal.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UploadImage from './UploadImage/UploadImage';
import { Col, Row } from 'react-bootstrap';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_SIZE,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  PHONE_LENGTH,
} from '../../Common/constans';
interface IAdNewAdModal {
  handleClose: () => void;
  show: boolean;
  onAddHandler: Function;
}

const AdNewAdModal: React.FC<IAdNewAdModal> = (props) => {
  const [adImageFiles, setAdImageFiles] = useState<File[] | Blob[]>([]);
  const [adGallery, setAdGallery] = useState<string[]>([]);
  const [isBig, setIsBig] = useState(false);
  const [adInfo, setAdInfo] = useState({
    title: '',
    city: '',
    area: '',
    description: '',
    category: 'All',
    price: 0,
    phone: '',
    currency: '$',
  });

  const [validated, setValidated] = useState(false);

  const addHandler = (e: React.BaseSyntheticEvent) => {
    const newImageFile: Blob = e.target.files[0] || null;
    if (newImageFile.size > MAX_IMAGE_SIZE) {
      setIsBig(true);
      return;
    }
    setIsBig(false);
    const reader = new FileReader();
    reader.onload = () => {
      setAdGallery([...adGallery, reader.result as string]);
    };
    reader.readAsDataURL(newImageFile);
    setAdImageFiles([...adImageFiles, newImageFile]);
    e.target.value = '';
  };

  const changeHandler = (property: string) => (e: React.BaseSyntheticEvent) => {
    setAdInfo({
      ...adInfo,
      [property]: e.target.value,
    });
  };
  const closeHandler = () => {
    setAdGallery([]);
    setAdImageFiles([]);
    setValidated(false);
    setIsBig(false);
    props.handleClose();
  };

  const submitHandler = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
      return;
    }
    setValidated(false);

    props.onAddHandler(adImageFiles, adInfo);
    closeHandler();
  };

  const removeImageHandler = (i: number) => (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const newImageFiles = [...adImageFiles];
    const newGallery = [...adGallery];

    newImageFiles.splice(i, 1);
    newGallery.splice(i, 1);

    setAdGallery(newGallery);
    setAdImageFiles(newImageFiles);
  };

  return (
    <Modal
      className={classes.main}
      size='lg'
      show={props.show}
      onHide={closeHandler}
      centered
    >
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Modal.Header
          closeVariant='white'
          className={classes.header}
          closeButton
        >
          Add New Ad
        </Modal.Header>

        <Modal.Body className={classes.body}>
          <Form.Group className={classes.group}>
            <Form.Label>Ad Images:</Form.Label>
          </Form.Group>
          <Form.Group className={classes.group}>
            <UploadImage
              adGallery={adGallery}
              removeImageHandler={removeImageHandler}
              addHandler={addHandler}
            />
            {isBig && (
              <Form.Label className={classes.feedback}>
                This image is too large, Images must be smaller than{' '}
                {MAX_IMAGE_SIZE / 1000}kB!
              </Form.Label>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>Ad Title</Form.Label>
                <Form.Control
                  minLength={MIN_TITLE_LENGTH}
                  maxLength={MAX_TITLE_LENGTH}
                  onChange={changeHandler('title')}
                  required
                  className={classes.input}
                  type='text'
                  placeholder='Ad Title'
                  autoFocus
                />
                <Form.Control.Feedback
                  className={classes.feedback}
                  type='invalid'
                >
                  Title must be between {MIN_TITLE_LENGTH} and{' '}
                  {MAX_TITLE_LENGTH} symbols!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  onChange={changeHandler('phone')}
                  className={classes.input}
                  required
                  type='text'
                  pattern='[0-9]{10}'
                  maxLength={PHONE_LENGTH}
                  autoFocus
                />
                <Form.Control.Feedback
                  className={classes.feedback}
                  type='invalid'
                >
                  Please enter a valid phone number!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  onChange={changeHandler('city')}
                  className={classes.input}
                  type='text'
                  placeholder='City'
                  autoFocus
                />
                <Form.Control.Feedback
                  className={classes.feedback}
                  type='invalid'
                >
                  Please enter a city!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  required
                  onChange={changeHandler('area')}
                  className={classes.input}
                  type='text'
                  placeholder='Area'
                  autoFocus
                />
                <Form.Control.Feedback
                  className={classes.feedback}
                  type='invalid'
                >
                  Please enter an area!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={changeHandler('price')}
                  className={classes.input}
                  type='number'
                  placeholder='0'
                  autoFocus
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={classes.group}>
                <Form.Label>Currency:</Form.Label>
                <Form.Select onChange={changeHandler('currency')} size='lg'>
                  <option>$</option>
                  <option>lv</option>
                  <option>£</option>
                  <option>€</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className={classes.group}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={changeHandler('description')}
              className={classes.input}
              required
              as='textarea'
              rows={3}
              minLength={MIN_DESCRIPTION_LENGTH}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <Form.Control.Feedback className={classes.feedback} type='invalid'>
              Description must be between {MIN_DESCRIPTION_LENGTH} and{' '}
              {MAX_DESCRIPTION_LENGTH} symbols!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.group}>
            <Form.Label>Category:</Form.Label>
            <Form.Select onChange={changeHandler('category')} size='lg'>
              <option>All</option>
              <option>Cars</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Animals</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={classes.footer}>
          <button
            type='button'
            className={classes.button}
            onClick={closeHandler}
          >
            Close
          </button>
          <button className={classes.button} type='submit'>
            Add
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdNewAdModal;
