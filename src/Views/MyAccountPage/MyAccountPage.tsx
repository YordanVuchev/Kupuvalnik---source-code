import React, { useState } from 'react';
import MyAccountData from '../../Components/MyAccountData/MyAccountData';
import MyAds from '../../Components/MyAds/MyAds';
import SearchBar from '../../Components/SearchBar/SearchBar';
import classes from './MyAccountPage.module.css';
import Button from 'react-bootstrap/Button';
import AddNewAdModal from '../../Components/AddNewAdModal/AddNewAdModal';
import { IAd } from '../../Types/ad.types';
import { updateAdImages, uploadAd, injectAdId } from '../../Service/ad.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  uploadAdImagesAndReturnURL,
  uploadAvatarAndReturnURL,
} from '../../Service/storage.service';
import MyAccountOffcanvas from '../../Components/MyAccountData/MyAccountOffcanvas/MyAccountOffcanvas';
import { IUser } from '../../Types/user.types';
import {
  updateUserAvatarUrl,
  updateUserProperty,
} from '../../Service/user.service';
import {
  updateUserEmailWithReAuthentication,
  updateUserPassWordWithReAuthentication,
} from '../../Service/auth.service';
import { usersActions } from '../../store/users-slice';
import ErrorModal from '../../Components/ErrorModal/ErrorModal';
import { ERR_DEFAULT } from '../../Common/constans';

const MyAccountPage: React.FC = () => {
  const userInfo: IUser | null = useAppSelector((state) => state.auth.userData);

  const myAds = useAppSelector((state) => {
    return state.ads.allAds.filter((ad) => ad.author === userInfo?.username);
  });
  const usersAvatars = useAppSelector((state) => state.users.usersAvatars);
  const dispatch = useAppDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseOffcanva = () => setShowOffcanvas(false);
  const handleShowOffcanva = () => setShowOffcanvas(true);

  const [errorMsg, setErrorMsg] = useState('');

  const addNewAdHandler = async (adImages: File[], adInfo: IAd) => {
    try {
      const ad = await uploadAd(adInfo, userInfo!.username);
      injectAdId(ad.key!);
      if (adImages.length === 0) return;

      const imagesUrls = await uploadAdImagesAndReturnURL(ad.key!, adImages);
      const resolvedImages = await Promise.all(imagesUrls);
      updateAdImages(ad.key!, resolvedImages);
    } catch (error) {
      setErrorMsg(ERR_DEFAULT);
      setShowError(true);
    }
  };

  const updateAvatarHandler = async (file: File) => {
    try {
      const avatarUrl = await uploadAvatarAndReturnURL(userInfo!.id!, file!);
      updateUserAvatarUrl(userInfo!.id!, avatarUrl);

      dispatch(
        usersActions.updateUserAvatar({
          username: userInfo!.username,
          Url: avatarUrl,
        })
      );
      console.log(avatarUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNameHandler = (property: string, name: string) => {
    try {
      updateUserProperty(userInfo!.id!, property, name);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmailHandler = async (
    email: string,
    password: string,
    newEmail: string
  ) => {
    try {
      await updateUserEmailWithReAuthentication(email, password, newEmail);
      updateUserProperty(userInfo?.id!, 'email', newEmail);
      setShowError(false);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message.includes('invalid-email')) {
          setErrorMsg('Invalid email');
          setShowError(true);
        }
        if (error.message.includes('wrong-password')) {
          setErrorMsg('Wrong password');
          setShowError(true);
        }
        if (error.message.includes('email-already-in-use')) {
          setErrorMsg('Email already exists');
          setShowError(true);
        }
        if (error.message.includes('weak-password')) {
          setErrorMsg('Weak password');
          setShowError(true);
        }
      }
    }
  };

  const updatePasswordHandler = async (
    email: string,
    password: string,
    newPassword: string
  ) => {
    try {
      await updateUserPassWordWithReAuthentication(
        email,
        password,
        newPassword
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message.includes('invalid-email')) {
          setErrorMsg('Invalid email');
          setShowError(true);
        }
        if (error.message.includes('weak-password')) {
          setErrorMsg('Weak password');
          setShowError(true);
        }
        if (error.message.includes('wrong-password')) {
          setErrorMsg('Wrong password');
          setShowError(true);
        }
      }
    }
  };

  return (
    <div className={classes.main}>
      <ErrorModal
        show={showError}
        message={errorMsg}
        handleClose={() => setShowError(false)}
      />
      <AddNewAdModal
        show={showAdd}
        handleClose={handleCloseAdd}
        onAddHandler={addNewAdHandler}
      />
      <div className={classes.left}>
        <div className={classes['left-header']}>
          {/* <SearchBar /> */}
          <Button
            onClick={() => setShowAdd(true)}
            className={classes.ad}
            size='lg'
            variant='dark'
          >
            <i className='bi bi-file-plus'></i> New Ad
          </Button>
          <div className={classes.offcanvas}>
            <MyAccountOffcanvas
              handleClose={handleCloseOffcanva}
              handleShow={handleShowOffcanva}
              show={showOffcanvas}
              avatar={userInfo?.avatarUrl}
            >
              <MyAccountData
                updateNameHandler={updateNameHandler}
                updateAvatarHandler={updateAvatarHandler}
                updateEmailHandler={updateEmailHandler}
                updatePasswordHandler={updatePasswordHandler}
                userData={userInfo!}
              />
            </MyAccountOffcanvas>
          </div>
        </div>
        <MyAds ads={myAds} />
      </div>
      <div className={classes.right}>
        <p>{userInfo?.username}</p>
        <MyAccountData
          updateNameHandler={updateNameHandler}
          updateAvatarHandler={updateAvatarHandler}
          updateEmailHandler={updateEmailHandler}
          updatePasswordHandler={updatePasswordHandler}
          userData={userInfo!}
        />
      </div>
    </div>
  );
};

export default MyAccountPage;
