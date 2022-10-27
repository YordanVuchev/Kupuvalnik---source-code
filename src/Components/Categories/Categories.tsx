import React, { BaseSyntheticEvent, useState } from 'react';
import Category from '../Category/Category';
import classes from './Categories.module.css';
// image import
import carImg from '../../Images/car.png';
import animatedPhoneImg from '../../Images/animatedPhone.png';
import clothesImg from '../../Images/clothes.png';
import dogAnimatedImg from '../../Images/dogAnimated.png';
import allItemsImg from '../../Images/all-category.png';

interface ICategoriesProps {
  setCategory: Function;
}

const Categories: React.FC<ICategoriesProps> = (props) => {
  const [currentCategory, setCurrentCategory] = useState('All');

  const categoryOnClickHandler =
    (chosenCategory: string) => (event: BaseSyntheticEvent) => {
      props.setCategory(chosenCategory);
      setCurrentCategory(chosenCategory);
    };

  return (
    <div>
      <h2 className={classes.title}>Main categories</h2>
      <div className={classes.categories}>
        <Category
          description='Image of random items'
          name='All'
          image={allItemsImg}
          onClick={categoryOnClickHandler('All')}
          active={currentCategory === 'All'}
        />
        <Category
          description='Image of a car'
          name='Cars'
          image={carImg}
          onClick={categoryOnClickHandler('Cars')}
          active={currentCategory === 'Cars'}
        />
        <Category
          description='Electronics'
          name='Electronics'
          image={animatedPhoneImg}
          onClick={categoryOnClickHandler('Electronics')}
          active={currentCategory === 'Electronics'}
        />
        <Category
          description='Image of clothes'
          name='Clothes'
          image={clothesImg}
          onClick={categoryOnClickHandler('Clothes')}
          active={currentCategory === 'Clothes'}
        />
        <Category
          description='Image of a dog'
          name='Animals'
          image={dogAnimatedImg}
          onClick={categoryOnClickHandler('Animals')}
          active={currentCategory === 'Animals'}
        />
      </div>
    </div>
  );
};

export default Categories;
