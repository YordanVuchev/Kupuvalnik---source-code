import React, { BaseSyntheticEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './SearchBar.module.css';

interface ISearchBarProps {
  updateSearchInfo: Function;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const navigate = useNavigate();
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      props.updateSearchInfo(searchInputRef.current.value);
      navigate('/home?search=' + searchInputRef.current.value);
    }
  };

  const iconOnClickHandler = () => {
    props.updateSearchInfo(searchInputRef.current.value);
    navigate('/home?search=' + searchInputRef.current.value);
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    if (event.target.value === '') {
      props.updateSearchInfo(event.target.value);
      navigate('/home');
    }
  };

  const searchIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classes['search-icon']}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
  return (
    <div className={classes['search-bar']} onKeyPress={onKeyPressHandler}>
      <span onClick={iconOnClickHandler}>{searchIcon}</span>
      <input
        type='text'
        className={classes['text-field']}
        onChange={handleChange}
        placeholder='Search'
        ref={searchInputRef}
      />
    </div>
  );
};

export default SearchBar;
