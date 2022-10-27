import classes from './Comment.module.css';
import defaultPic from '../../Images/default.jpg';
import React from 'react';

interface ICommentProps {
  username: string;
  content: string;
  createdOn: string;
  avatar: string;
}

const Comment: React.FC<ICommentProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes['comment-title-box']}>
        <div className={classes.user}>
          <img
            src={props.avatar ? props.avatar : defaultPic}
            alt='User profile picture'
          />
          <h2>{props.username}</h2>
        </div>
        <p className={classes.date}>From: {props.createdOn}</p>
      </div>
      <p className={classes.content}>{props.content}</p>
    </div>
  );
};

export default Comment;
