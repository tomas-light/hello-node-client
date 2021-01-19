import React from 'react';
import { Button } from '../Button';

const ButtonGroup = ({ buttons }) => (
  <div
    style={{
      display: 'grid',
      border: 'dashed 1px black',
    }}
  >
    {buttons ? buttons.map((button, index) =>
      <Button
        key={`button-${index}`}
        Component={button.Component}
        menu={button.menu}
      />
    ) : null}
  </div>
);

export { ButtonGroup };
