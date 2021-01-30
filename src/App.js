import React from 'react';
import FrontPage from './component/FrontPage';
import Header from './component/Header';

export default function SimpleContainer() {
  return (
    <React.Fragment>
        <Header/>
        <FrontPage />
    </React.Fragment>
  );
}