import React from 'react';

export const rightButtons = [
  [{
    Component: () => <div>right 1</div>,
  }],
  [{
    Component: () => {
      const { MiewButton } = require("../HeavyComponents/miew");
      return <MiewButton/>;
    },
  }],
];
