import React from 'react';

import classes from './Layout.module.css';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[] | null;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  return <div className={classes.layout}>{props.children}</div>;
};

export default Layout;
