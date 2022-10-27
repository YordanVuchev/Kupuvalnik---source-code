import Image from 'react-bootstrap/Image';
import defaultAvatar from '../../../Images/avatar-100.png';
import classes from './UploadAvatar.module.css';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
interface IUploadAvatar {
  myAvatarUrl?: string;
  newAvatarUrl?: string;
  removeImageHandler: (e: React.BaseSyntheticEvent) => void;
  addHandler: (e: React.BaseSyntheticEvent) => void;
  updateHandler: () => void;
}

const UploadAvatar: React.FC<IUploadAvatar> = (props) => {
  const avatarInputFormRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={classes.main}>
      {props.newAvatarUrl ? (
        <div className={classes.images}>
          <Image
            className={classes.image}
            height={'125px'}
            width={'125px'}
            src={props.newAvatarUrl}
            style={{ objectFit: 'cover' }}
          />
          <div className={classes.button} onClick={props.removeImageHandler}>
            <i className='bi bi-x-circle-fill'></i>
          </div>
        </div>
      ) : (
        <Image
          className={classes.image}
          height={'125px'}
          width={'125px'}
          src={props.myAvatarUrl || defaultAvatar}
          style={{ objectFit: 'cover' }}
        />
      )}

      {props.newAvatarUrl ? (
        <div className={classes.input}>
          <div
            onClick={props.updateHandler}
            className={classes['input-button']}
          >
            <i className='bi bi-check-lg'></i>
          </div>
        </div>
      ) : (
        <div className={classes.input}>
          <div
            className={classes['input-button']}
            onClick={() => avatarInputFormRef.current?.click()}
          >
            <i className='bi bi-box-arrow-up'></i>
            <i className='bi bi-images'></i>
          </div>
          <input
            ref={avatarInputFormRef}
            className={classes['image-input']}
            accept='image/*'
            type='file'
            onChange={props.addHandler}
          />
        </div>
      )}
    </div>
  );
};
export default UploadAvatar;
