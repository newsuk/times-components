import React, { FC } from 'react';
import { Row, Title } from './styles';
import { TitleScrollerProps } from './types';

export const TitleScroller: FC<TitleScrollerProps> = ({ title }) => {
  return (
    <Row>
      <Title>
        <div>{title}</div>
      </Title>
    </Row>
  );
};
