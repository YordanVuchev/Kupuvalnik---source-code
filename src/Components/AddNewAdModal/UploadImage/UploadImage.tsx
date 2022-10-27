import Image from 'react-bootstrap/Image';

import { v4 as uniqueId } from 'uuid';
import defaultImg from '../../../Images/default.jpg';
import classes from './UploadImage.module.css';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
interface IUploadImage {
  adGallery: string[];
  removeImageHandler: (i: number) => (e: React.BaseSyntheticEvent) => void;
  addHandler: (e: React.BaseSyntheticEvent) => void;
}

const UploadImage: React.FC<IUploadImage> = (props) => {
  const avatarInputFormRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={classes.main}>
      {props.adGallery.length > 0 ? (
        props.adGallery.map((image, i) => (
          <div className={classes.images} key={uniqueId()}>
            <Image
              className={classes.image}
              height={'140px'}
              width={'140px'}
              src={image}
              style={{ objectFit: 'cover' }}
            />
            <div
              className={classes.button}
              onClick={props.removeImageHandler(i)}
            >
              <i className='bi bi-x-circle-fill'></i>
            </div>
          </div>
        ))
      ) : (
        <Image
          className={classes.image}
          height={'140px'}
          width={'140px'}
          src={defaultImg}
          style={{ objectFit: 'cover' }}
        />
      )}
      <div className={classes.input}>
        <Button
          className={classes['input-button']}
          onClick={() => avatarInputFormRef.current?.click()}
          variant='dark'
        >
          <i className='bi bi-box-arrow-up'></i>
          <i className='bi bi-images'></i>
        </Button>
        <input
          ref={avatarInputFormRef}
          className={classes['image-input']}
          accept='image/*'
          type='file'
          onChange={props.addHandler}
        />
      </div>
    </div>
  );
};
export default UploadImage;
