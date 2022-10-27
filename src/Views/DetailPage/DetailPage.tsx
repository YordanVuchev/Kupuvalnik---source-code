import React, { useEffect, useState } from 'react';

import DetailInfo from '../../Components/DetailInfo/DetailInfo';
import Comments from '../../Components/Comments/Comments';
import defaultPic from '../../Images/default.jpg';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getComments } from '../../Service/comment.service';
import { IComment } from '../../Types/comment.types';
import { ref, onValue } from 'firebase/database';
import { db } from '../../Config/firebase-config';
import PageNotFound from '../PageNotFound/PageNotFound';
const DetailPage: React.FC = () => {
  const params = useParams();
  const id = params.detailId;
  const currentAd = useAppSelector((state) => {
    return state.ads.allAds.find((object) => object.id === id);
  });

  const [comments, setComments] = useState<IComment[]>([]);
  const contactAvatar = useAppSelector((state) => {
    const contact = state.users.users.find(
      (user) => user.username === currentAd?.author
    );
    return contact?.avatarUrl;
  });

  useEffect(() => {
    const commentsRef = ref(db, `ads/${id}/comments`);
    onValue(commentsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const adsSnapshot = await getComments(id!);
        setComments(Object.values(adsSnapshot.val()));
      }
    });
  }, []);

  return (
    <div>
      {currentAd ? (
        <>
          <DetailInfo
            author={currentAd?.author!}
            currency={currentAd?.currency!}
            phone={currentAd?.phone!}
            images={currentAd?.imagesURL!}
            title={currentAd?.title!}
            description={currentAd?.description!}
            price={currentAd?.price!}
            area={currentAd?.area!}
            city={currentAd?.city!}
            contactAvatarUrl={
              contactAvatar === '' ? defaultPic : contactAvatar!
            }
          />
          <Comments adComments={comments} />
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default DetailPage;
