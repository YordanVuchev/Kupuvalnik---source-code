import React from 'react';

import classes from './HeaderLayout.module.css';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[] | null;
}

const HeaderLayout: React.FC<ILayoutProps> = (props) => {
  return <div className={classes.layout}>{props.children}</div>;
};

export default HeaderLayout;
