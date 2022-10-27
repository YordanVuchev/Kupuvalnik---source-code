import Offcanvas from 'react-bootstrap/Offcanvas';
import classes from './MyAccountOffcanvas.module.css';
import avatar from '../../../Images/avatar-100.png';
interface IMyAccountOffcanvasProps {
  handleShow: () => void;
  handleClose: () => void;
  show: boolean;
  avatar?: string;
  children: JSX.Element | JSX.Element[] | null;
}

const MyAccountOffcanvas: React.FC<IMyAccountOffcanvasProps> = (props) => {
  return (
    <>
      <div className={classes['image-container']} onClick={props.handleShow}>
        My Properties
        <img className={classes.image} src={props.avatar || avatar} />
      </div>

      <Offcanvas placement='end' show={props.show} onHide={props.handleClose}>
        <Offcanvas.Header
          className={classes.header}
          closeButton
          closeVariant='white'
        >
          <Offcanvas.Title className={classes.header}>My Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={classes.body}>
          {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default MyAccountOffcanvas;
