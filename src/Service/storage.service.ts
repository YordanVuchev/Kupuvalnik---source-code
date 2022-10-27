import { storage } from '../Config/firebase-config';
import { v4 as uniqueId } from 'uuid';
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
  deleteObject,
  listAll,
} from 'firebase/storage';

export const uploadAdImages = (adId: string, images: File[]) => {
  const imagesUrl = images.map((image) => {
    const picture = storageRef(storage, `adImages/${adId}/${uniqueId()}/`);
    return uploadBytes(picture, image);
  });
  return imagesUrl;
};

export const uploadAdImagesAndReturnURL = async (
  adId: string,
  images: File[]
) => {
  const imagesUrls = uploadAdImages(adId, images).map(async (promise) => {
    const result = await promise;
    const url = await getDownloadURL(result.ref);
    return url;
  });
  return imagesUrls;
};

export const uploadAvatar = (userId: string, avatar: File) => {
  const picture = storageRef(storage, `usersAvatars/${userId}/avatar/`);
  return uploadBytes(picture, avatar);
};

export const uploadAvatarAndReturnURL = async (
  userId: string,
  avatar: File
) => {
  const result = await uploadAvatar(userId, avatar);
  const avatarUrl = await getDownloadURL(result.ref);
  return avatarUrl;
};

export const removeUserAvatar = (userId: string) => {
  const picture = storageRef(storage, `usersAvatars/${userId}/avatar/`);

  return deleteObject(picture);
};

export const deletePicturesFromStorage = async (adId: string) => {
  const folderRef = storageRef(storage, `adImages/${adId}/`);
  const fileList = await listAll(folderRef);
  const promises = fileList.items.map((item) => {
    return deleteObject(item);
  });
  const result = await Promise.all(promises);
  return result;
};
