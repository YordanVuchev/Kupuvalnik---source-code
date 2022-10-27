import React from 'react';
import Ad from '../Ad/Ad';
import defaultPic from '../../Images/default.jpg';
import classes from './TrendyDetails.module.css';

import carTrendyImg from '../../Images/carTrendyImage.jpg';
import { IAd } from '../../Types/ad.types';

interface ITrendyDetailsProps {
  ads: IAd[];
}

const TrendyDetails: React.FC<ITrendyDetailsProps> = (props) => {
  const renderAds = props.ads.map((ad) => (
    <Ad
      currency={ad.currency}
      key={ad.id}
      id={ad.id}
      image={ad.imagesURL ? ad.imagesURL[0] : defaultPic}
      name={ad.title}
      description={ad.description}
      price={ad.price}
    />
  ));

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Most popular items</h1>
      <div className={classes.container}>{renderAds}</div>
    </div>
  );
};

export default TrendyDetails;
