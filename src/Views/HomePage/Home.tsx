import React, { useState, useEffect } from 'react';
import Categories from '../../Components/Categories/Categories';
import SearchBar from '../../Components/SearchBar/SearchBar';
import TrendyDetails from '../../Components/TrendyDetails/TrendyDetail';
import { useAppSelector } from '../../store/hooks';
const HomePage: React.FC = () => {
  const [filterByCategory, setFilterByCategory] = useState('All');
  const [searchInfo, setSearchInfo] = useState('');

  const ads = useAppSelector((state) => state.ads.allAds);
  const filteredAds =
    filterByCategory !== 'All'
      ? ads.filter((ad) => ad.category === filterByCategory)
      : ads;

  const searchedAds = filteredAds.filter(
    (ad) =>
      ad.title.toLowerCase().startsWith(searchInfo.toLowerCase()) ||
      ad.title.toLowerCase().includes(searchInfo.toLowerCase())
  );
  return (
    <div>
      <SearchBar updateSearchInfo={setSearchInfo} />
      <Categories setCategory={setFilterByCategory} />
      <TrendyDetails ads={searchedAds} />
    </div>
  );
};

export default HomePage;
