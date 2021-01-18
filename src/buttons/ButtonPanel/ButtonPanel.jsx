import React from 'react';

import { Button } from './Button';

const ButtonPanel = ({ area, buttons }) => (
  <div
    style={{
      display: 'grid',
      gridArea: area,
      border: 'solid 1px black',
    }}
  >
    {buttons ? buttons.map((button, index) =>
      <Button
        key={`button-${index}`}
        component={button.component}
        onClick={button.onClick}
        menu={button.menu}
      />
    ) : null}
  </div>
);

export { ButtonPanel };
