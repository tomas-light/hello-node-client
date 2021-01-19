import React from 'react';

import { ButtonGroup } from './ButtonGroup';

const horizontalAreas = ['left', 'right'];

const ButtonPanel = ({ area, groups }) => (
  <div
    style={{
      border: 'solid 1px black',
      gridArea: area,
      display: 'grid',
      gridAutoFlow: horizontalAreas.includes(area) ? 'row' : 'column',
    }}
  >
    {groups ? groups.map((buttons, index) =>
      <ButtonGroup
        key={`group-${index}`}
        buttons={buttons}
      />
    ) : null}
  </div>
);

export { ButtonPanel };
