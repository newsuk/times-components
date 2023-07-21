import React from 'react';

import { Container, Text, Title } from './styles';

export const WelcomeBanner: React.FC = () => {
  return (
    <Container>
      <Title>Welcome to The Times and The Sunday Times</Title>
      <Text>We hope you enjoy your free article</Text>
    </Container>
  )
}
