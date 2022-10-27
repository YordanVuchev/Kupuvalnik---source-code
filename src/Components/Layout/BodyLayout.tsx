import React from 'react';

import classes from './BodyLayout.module.css';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[] | null;
}

const BodyLayout: React.FC<ILayoutProps> = (props) => {
  return <div className={classes.layout}>{props.children}</div>;
};

export default BodyLayout;
