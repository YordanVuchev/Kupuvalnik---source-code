import React, { MouseEventHandler } from 'react';

import classes from './Category.module.css';

interface ICategoryProps {
  description: string;
  name: string;
  image: string;
  onClick: MouseEventHandler;
  active: boolean;
}

const Category: React.FC<ICategoryProps> = (props) => {
  return (
    <div className={classes.container} onClick={props.onClick}>
      <div
        className={`${classes.category} ${
          props.active ? classes['category--active'] : ''
        }`}
      >
        <img
          className={classes['category-img']}
          alt={props.description}
          src={props.image}
        />
      </div>
      <p className={classes['category-name']}>{props.name}</p>
    </div>
  );
};

export default Category;
