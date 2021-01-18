import React from 'react';

export const leftButtons = [
  {
    component: <div>left 1</div>,
    onClick: event => console.log(event, 'left 1'),
    menu: [
      {
        component: <div>inner left 1</div>,
        onClick: event => console.log(event, 'inner left 1'),
      },
      {
        component: <div>inner left 2</div>,
        onClick: event => console.log(event, 'inner left 2'),
      },
    ],
  },
  {
    component: <div>left 2</div>,
    onClick: event => console.log(event, 'left 2'),
  },
];
