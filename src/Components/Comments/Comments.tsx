import React, { BaseSyntheticEvent, useState } from 'react';
import classes from './Comments.module.css';
import { Button } from 'react-bootstrap';
import AddNewCommentModal from '../AddNewCommentModal/AddNewCommentModal';
import { injectCommentId, uploadComment } from '../../Service/comment.service';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Comment from '../Comment/Comment';
import { IComment } from '../../Types/comment.types';
import { addCommentToAd } from '../../Service/ad.service';
interface ICommentsProps {
  adComments: IComment[];
}

const Comments: React.FC<ICommentsProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const username = useAppSelector((state) => state.auth.userData?.username);
  const usersAvatars = useAppSelector((state) => state.users.usersAvatars);
  const comments = props.adComments.map((comment) => (
    <Comment
      key={comment.id}
      content={comment.content}
      createdOn={comment.createdOn}
      username={comment.username}
      avatar={usersAvatars[comment.username]}
    />
  ));
  const addCommentOnClickHandler = (event: BaseSyntheticEvent) => {
    setShowModal(true);
  };

  const commentIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classes['comments-icon']}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
      />
    </svg>
  );

  const submitComment = async (comment: string) => {
    setShowModal(false);
    const commentId = await uploadComment({
      id: '',
      adId: params.detailId!,
      username: username!,
      content: comment,
      createdOn: new Date().toLocaleDateString('en-US'),
    });
    injectCommentId(commentId.key!);
    addCommentToAd(params.detailId!, commentId.key!);
  };

  return (
    <section className={classes['comments-section']}>
      <AddNewCommentModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        uploadComment={submitComment}
      />
      <div className={classes['header']}>
        <h2>{commentIcon} Comments</h2>
        <Button
          onClick={addCommentOnClickHandler}
          className={classes.ad}
          size='lg'
          variant='dark'
        >
          <i className='bi bi-file-plus'></i> Add comment
        </Button>
      </div>
      <div className={classes.comments}>{comments}</div>
    </section>
  );
};

export default Comments;
