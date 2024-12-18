import React, { FC } from 'react';
import { Row, CollapseButton } from './styles';
import { PlayerModalIcon } from '@times-components/icons';
import { CollapseIconProps } from './types';

export const CollapseIcon: FC<CollapseIconProps> = ({
  isExpanded,
  toggleExpand,
  allowExpandCollapse
}) => {
  if (!allowExpandCollapse) {
    return null;
  }

  return (
    <Row>
      <CollapseButton
        onClick={toggleExpand}
        aria-label={isExpanded ? 'Collapse Player' : 'Expand Player'}
      >
        <PlayerModalIcon />
      </CollapseButton>
    </Row>
  );
};
