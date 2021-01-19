import React from 'react';

import { Layout } from './Layout';
import { ButtonPanel } from './ButtonPanel';
import {
  bottomButtons as _bottom,
  leftButtons as _left,
  rightButtons as _right,
  topButtons as _top,
} from './buttons';
import { useButtonGroups } from './useButtonGroups';

const App = props => {
  const {
    top,
    left,
    right,
    bottom,
  } = props;

  const topButtons = useButtonGroups(
    _top,
    top,
    process.env.HIDE_TOP
  );
  const leftButtons = useButtonGroups(
    _left,
    left,
    process.env.HIDE_LEFT
  );
  const rightButtons = useButtonGroups(
    _right,
    right,
    process.env.HIDE_RIGHT
  );
  const bottomButtons = useButtonGroups(
    _bottom,
    bottom,
    process.env.HIDE_BOTTOM
  );

  return (
    <Layout>
      <ButtonPanel
        area="top"
        groups={topButtons}
        // buttons={topButtons}
      />

      <ButtonPanel
        area="left"
        groups={leftButtons}
        // buttons={leftButtons}
      />

      <ButtonPanel
        area="right"
        groups={rightButtons}
        // buttons={rightButtons}
      />

      <ButtonPanel
        area="bottom"
        groups={bottomButtons}
        // buttons={bottomButtons}
      />

    </Layout>
  );
}

export { App };
