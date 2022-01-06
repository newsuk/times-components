import React, { FC } from 'react';
import { Container, Title, Description, Button } from './styles';

export const InlineDialog: FC<{
  title: string;
  buttonText: string;
  href?: string;
  onClick: () => void;
}> = ({ title, href = '#', onClick, buttonText, children }) => (
  <Container>
    <Title>{title}</Title>
    <Description>{children}</Description>
    <Button href={href} onClick={onClick}>
      {buttonText}
    </Button>
  </Container>
);
