import React from 'react';
// import loadable from "@loadable/component";

// const ReduxButton = loadable(() => import(/* webpackChunkName: "Redux" */ "../HeavyComponents/redux"));

export const topButtons = [
  {
    component: <div>top 1</div>,
    onClick: event => console.log(event, 'top 1'),
    menu: [],
  },
  // {
  //   component: <ReduxButton/>,
  //   onClick: event => console.log(event, 'top 2'),
  // },
];

