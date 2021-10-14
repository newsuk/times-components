import React, { FC } from 'react';
import {
  Container,
  Title,
  Description,
  IconContainer,
  ContentContainer
} from './styles';
import { InfoIcon } from './InfoIcon';

type MessageType = 'info' | 'warning' | 'error';

export const InlineMessage: FC<{
  title: string;
  type: MessageType;
}> = ({ title, type, children }) => (
  <Container className={type}>
    <IconContainer>
      <InfoIcon />
    </IconContainer>
    <ContentContainer>
      <Title>{title}</Title>
      <Description>{children}</Description>
    </ContentContainer>
  </Container>
);
