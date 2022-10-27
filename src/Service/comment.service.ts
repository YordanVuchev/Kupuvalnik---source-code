import {
  get,
  push,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
} from 'firebase/database';
import { db } from '../Config/firebase-config';
import { IComment } from '../Types/comment.types';

export const uploadComment = (commentInfo: IComment) => {
  return push(ref(db, 'comments'), {
    ...commentInfo,
  });
};

export const getComments = async (adId: string) => {
  return await get(
    query(ref(db, 'comments'), orderByChild('adId'), equalTo(adId))
  );
};

export const injectCommentId = async (commentId: string) => {
  update(ref(db), {
    [`comments/${commentId}/id`]: commentId,
  });
};

export const deleteComment = (commentId: string) => {
  update(ref(db), {
    [`comments/${commentId}`]: null,
  });
};
