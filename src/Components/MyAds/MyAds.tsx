import React, { useState } from 'react';
import Ad from '../Ad/Ad';
import DeleteAdModal from '../DeleteAdModal/DeleteAdModal';

import classes from './MyAds.module.css';

import { IAd } from '../../Types/ad.types';
import { deleteComment } from '../../Service/comment.service';
import { deleteAd } from '../../Service/ad.service';
import defaultPic from '../../Images/default.jpg';
import { deletePicturesFromStorage } from '../../Service/storage.service';
interface IMyAdsProps {
  ads: IAd[];
}

const MyAds: React.FC<IMyAdsProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [chosenAdToDelete, setChosenAdToDelete] = useState<IAd>();
  const deleteAdShowModalHandler =
    (currentAd: IAd) => (event: React.BaseSyntheticEvent) => {
      setShowModal(true);
      setChosenAdToDelete(currentAd);
    };

  const deleteAdHandler = () => {
    if (chosenAdToDelete!.comments) {
      chosenAdToDelete!.comments.forEach((comment) => deleteComment(comment));
    }
    deleteAd(chosenAdToDelete!.id);
    deletePicturesFromStorage(chosenAdToDelete?.id!);
    setShowModal(false);
  };

  const myAds = props.ads.map((ad) => (
    <div className={classes['ads-container']} key={ad.id}>
      <button
        onClick={deleteAdShowModalHandler(ad)}
        className={classes['delete-btn']}
      >
        <i key={ad.id} className='bi bi-trash3-fill'></i>
      </button>
      <Ad
        key={ad.id}
        currency={ad.currency}
        id={ad.id}
        image={ad.imagesURL ? ad.imagesURL[0] : defaultPic}
        description={ad.description}
        name={ad.title}
        price={ad.price}
      />
    </div>
  ));

  return (
    <div className={classes.main}>
      <DeleteAdModal
        message='Are you sure you want to delete the ad ?'
        show={showModal}
        handleClose={() => setShowModal(false)}
        deleteAdHandler={deleteAdHandler}
      />
      <h1 className={classes.title}>My Ads</h1>
      <div className={classes.container}>{myAds}</div>
    </div>
  );
};

export default MyAds;
