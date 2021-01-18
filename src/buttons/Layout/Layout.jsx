import React from 'react';

const Layout = ({ children }) => (
  <div
    style={{
      height: '100%',
      display: 'grid',
      gridTemplateAreas: `". top ." "left . right" ". bottom ."`,
    }}
  >
    {children}
  </div>
);

export { Layout };
