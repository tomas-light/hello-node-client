import React from 'react';
import loadable from "@loadable/component";

const MiewButton = loadable(() => import(/* webpackChunkName: "Miew" */ "../HeavyComponents/miew"));

export const rightButtons = [
  {
    component: <div>right 1</div>,
    onClick: event => console.log(event, 'right 1'),
    menu: [],
  },
  {
    component: <MiewButton />,
    onClick: event => console.log(event, 'right 2'),
  },
];
