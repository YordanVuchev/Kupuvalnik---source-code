import { push, ref, update, get } from 'firebase/database';
import { db } from '../Config/firebase-config';
import { IAd } from '../Types/ad.types';

export const uploadAd = (adInfo: IAd, user: string) => {
  return push(ref(db, `ads`), {
    ...adInfo,
    author: user,
    imagesURL: [],
    views: 0,
    comments: [],
    likes: [],
    createdOn: new Date().toLocaleString('en-US'),
  });
};

export const updateAdImages = async (adId: string, images: string[]) => {
  const uploadedImages = await get(ref(db, `ads/${adId}/imagesURL`));

  return uploadedImages.val()
    ? update(ref(db), {
        [`ads/${adId}/imagesURL`]: [...uploadedImages.val(), ...images],
      })
    : update(ref(db), {
        [`ads/${adId}/imagesURL`]: [...images],
      });
};

export const uploadAdWithImages = async (
  adInfo: IAd,
  user: string,
  images: string[]
) => {
  const result = await uploadAd(adInfo, user);
  updateAdImages(result.key!, images);
};

export const getAds = async () => {
  return await get(ref(db, `ads`));
};

export const injectAdId = async (adId: string) => {
  update(ref(db), {
    [`ads/${adId}/id`]: adId,
  });
};

export const addCommentToAd = async (adId: string, commentId: string) => {
  const comments = await get(ref(db, `ads/${adId}/comments`));

  return comments.val()
    ? update(ref(db), {
        [`ads/${adId}/comments`]: [...comments.val(), commentId],
      })
    : update(ref(db), {
        [`ads/${adId}/comments`]: [commentId],
      });
};

export const deleteAd = (adId: string) => {
  update(ref(db), {
    [`ads/${adId}`]: null,
  });
};
