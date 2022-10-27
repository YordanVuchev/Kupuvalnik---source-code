import React, { useState } from 'react';
import classes from './MyAccountData.module.css';
import { IUser } from '../../Types/user.types';
import UploadAvatar from './UploadAvatar/UploadAvatar';
import UpdateNameElement from './UpdateNameElement/UpdateNameElement';
import UpdateEmailElement from './UpdateEmail/UpdateEmailElement';
import UpdatePassElement from './UpdatePassword/UpdatePassElement';
import { MAX_IMAGE_SIZE } from '../../Common/constans';

interface IMyAccountDataProps {
  userData: IUser;
  updateNameHandler: (property: string, name: string) => void;
  updateAvatarHandler: (file: File) => Promise<void>;
  updateEmailHandler: (
    email: string,
    password: string,
    newEmail: string
  ) => void;
  updatePasswordHandler: (
    email: string,
    password: string,
    newPassword: string
  ) => void;
}
const MyAccountData: React.FC<IMyAccountDataProps> = (props) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isBig, setIsBig] = useState(false);
  const removeAvatarHandler = () => {
    setAvatarUrl('');
    setAvatarFile(null);
  };

  const updateAvatar = () => {
    props.updateAvatarHandler(avatarFile!);
    removeAvatarHandler();
  };

  const addAvatarHandler = (e: React.BaseSyntheticEvent) => {
    const newImageFile: File = e.target.files[0] || null;
    if (newImageFile.size > MAX_IMAGE_SIZE) {
      setIsBig(true);
      e.target.value = '';
      setTimeout(() => {
        setIsBig(false);
      }, 5000);
      return;
    }
    setIsBig(false);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(newImageFile);
    setAvatarFile(newImageFile);
    e.target.value = '';
  };

  return (
    <div className={classes.main}>
      <div className={classes['image-container']}>
        <UploadAvatar
          myAvatarUrl={props.userData?.avatarUrl || ''}
          newAvatarUrl={avatarUrl}
          removeImageHandler={removeAvatarHandler}
          addHandler={addAvatarHandler}
          updateHandler={updateAvatar}
        />
        {isBig && (
          <label className={classes.feedback}>
            This image is too large, Images must be smaller than{' '}
            {MAX_IMAGE_SIZE / 1000}kB!
          </label>
        )}
      </div>
      <UpdateNameElement
        updateName={props.updateNameHandler}
        myName={props.userData?.firstName}
        toUpdate={'firstName'}
      />
      <UpdateNameElement
        updateName={props.updateNameHandler}
        myName={props.userData?.lastName}
        toUpdate={'lastName'}
      />
      <UpdateEmailElement
        updateEmail={props.updateEmailHandler}
        myEmail={props.userData?.email}
      />
      <UpdatePassElement updatePassword={props.updatePasswordHandler} />
    </div>
  );
};
export default MyAccountData;
