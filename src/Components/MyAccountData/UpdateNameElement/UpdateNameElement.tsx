import React, { useRef, useState } from 'react';
import classes from './UpdateNameElement.module.css';

interface IUpdateNameElementProps {
  updateName: Function;
  myName: string;
  toUpdate: string;
}

const UpdateNameElement: React.FC<IUpdateNameElementProps> = (props) => {
  const [show, setShow] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const NameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleEditHandler = () => {
    setShow(!show);
    if (NameInputRef.current?.value) NameInputRef.current.value = '';
  };

  const updateName = (property: string) => () => {
    if (NameInputRef.current.value.length === 0) return;
    props.updateName(property, NameInputRef.current.value);
    toggleEditHandler();
  };

  return (
    <span className={classes.main}>
      <i
        className={show ? 'bi bi-x-lg' : 'bi bi-pencil-fill'}
        onClick={toggleEditHandler}
      ></i>
      {show ? (
        <div className={classes['name-container']}>
          <input
            ref={NameInputRef}
            type='text'
            placeholder={props.myName}
          ></input>
          <i
            onClick={updateName(props.toUpdate)}
            className='bi bi-check-lg'
          ></i>
        </div>
      ) : (
        props.myName
      )}
    </span>
  );
};
export default UpdateNameElement;
