import React from 'react';

import { Layout } from './Layout';
import { ButtonPanel } from './ButtonPanel';
import {
  bottomButtons as bottomConfig,
  leftButtons as leftConfig,
  rightButtons as rightConfig,
  topButtons as topConfig,
} from './buttons';
import { useButtons } from './useButtons';

const App = props => {
  let {
    top,
    left,
    right,
    bottom,
    hide = {},
  } = props;

  const topButtons = useButtons(
    topConfig,
    'top',
    hide,
    top
  );
  const leftButtons = useButtons(
    leftConfig,
    'left',
    hide,
    left
  );
  const rightButtons = useButtons(
    rightConfig,
    'right',
    hide,
    right
  );
  const bottomButtons = useButtons(
    bottomConfig,
    'bottom',
    hide,
    bottom
  );

  return (
    <Layout>
      <ButtonPanel
        area="top"
        buttons={topButtons}
      />

      <ButtonPanel
        area="left"
        buttons={leftButtons}
      />

      <ButtonPanel
        area="right"
        buttons={rightButtons}
      />

      <ButtonPanel
        area="bottom"
        buttons={bottomButtons}
      />

    </Layout>
  );
}

export { App };
