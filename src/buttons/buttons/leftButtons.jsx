import React from 'react';

export const leftButtons = [
  [{
    Component: () => <div>left 1</div>,
    menu: [
      {
        Component: () => <div>inner left 1</div>,
      },
      {
        Component: () => <div>inner left 2</div>,
      },
    ],
  },
  {
    Component: () => <div>left 2</div>,
  }],
];
