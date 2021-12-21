import React, { FC } from 'react';
import { Container, Title, Description, Button } from './styles';

export const InlineDialog: FC<{
  title: string;
  buttonText: string;
  onClick: () => void;
}> = ({ title, onClick, buttonText, children }) => (
  <Container>
    <Title>{title}</Title>
    <Description>{children}</Description>
    <Button onClick={onClick}>{buttonText}</Button>
  </Container>
);
