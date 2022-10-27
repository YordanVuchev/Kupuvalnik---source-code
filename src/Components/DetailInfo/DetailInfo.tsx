import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './DetailInfo.module.css';
import { v4 as uniqueId } from 'uuid';
import defaultPic from '../../Images/default.jpg';
interface IDetailInfoProps {
  images: string[];
  title: string;
  description: string;
  price: number;
  area: string;
  city: string;
  contactAvatarUrl: string;
  phone: number;
  currency: string;
  author: string;
}

const DetailInfo: React.FC<IDetailInfoProps> = (props) => {
  const sellerIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classes['seller-icon']}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );

  const adImages = props.images?.map((image) => (
    <Carousel.Item key={uniqueId()}>
      <img
        className={classes['carousel-image']}
        src={image}
        alt='Image of the product'
      />
    </Carousel.Item>
  ));

  return (
    <section>
      <div className={classes['detail-info']}>
        <div className={classes['detail-image']}>
          <Carousel interval={null}>{adImages}</Carousel>
        </div>
        <div className={classes['detail-description']}>
          <h2 className={classes['detail-title']}>{props.title}</h2>
          <p className={classes['detail-information']}>{props.description}</p>
          <p className={classes['detail-price']}>
            Price: {`${props.price}${props.currency}`}
          </p>
        </div>
        <div className={classes['contact-container']}>
          <div className={classes['seller-contact']}>
            <img
              className={classes['contact-avatar']}
              src={props.contactAvatarUrl}
              alt='Contact avatar'
            />
            <p className={classes['seller-phone']}>{props.author}</p>
          </div>

          <div className={classes['seller-info']}>
            <p>
              <i className='bi bi-phone-vibrate'></i> {props.phone}
            </p>
            <p>Area: {props.area}</p>
            <p>City: {props.city}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailInfo;
