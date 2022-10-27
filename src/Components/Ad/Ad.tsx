import React from 'react';

import { useNavigate } from 'react-router-dom';

import classes from './Ad.module.css';

interface IDetailProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

const Ad: React.FC<IDetailProps> = (props) => {
  const navigate = useNavigate();

  const detailClickHandler = () => {
    navigate('/detail/' + props.id);
  };

  return (
    <div className={classes.container} onClick={detailClickHandler}>
      <div className={classes.detail}>
        <img
          className={classes.image}
          src={props.image}
          alt={props.description}
        />
      </div>
      <div className={classes['product-information']}>
        <p className={classes['product-name']}>{props.name}</p>
        <p
          className={classes['product-price']}
        >{`${props.price}${props.currency}`}</p>
      </div>
    </div>
  );
};

export default Ad;
